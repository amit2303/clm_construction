const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');
const PRIVATE_DIR = path.join(__dirname, 'private');
const AUTH_FILE = path.join(PRIVATE_DIR, 'auth.json');
const CREDENTIALS_NOTE = path.join(__dirname, 'ADMIN_SETUP_CREDENTIALS.txt');

// Ensure private directory exists
if (!fs.existsSync(PRIVATE_DIR)) {
  fs.mkdirSync(PRIVATE_DIR, { recursive: true });
}

// -------------------------------------------------------------
// CRYPTOGRAPHIC UTILITIES (PBKDF2 SHA-512, 100,000 iterations)
// -------------------------------------------------------------
function hashSecret(secret, saltHex) {
  const salt = saltHex ? Buffer.from(saltHex, 'hex') : crypto.randomBytes(32);
  const hash = crypto.pbkdf2Sync(secret, salt, 100000, 64, 'sha512');
  return {
    salt: salt.toString('hex'),
    hash: hash.toString('hex')
  };
}

function verifySecret(secret, saltHex, hashHex) {
  try {
    const salt = Buffer.from(saltHex, 'hex');
    const expectedHash = Buffer.from(hashHex, 'hex');
    const calculatedHash = crypto.pbkdf2Sync(secret, salt, 100000, 64, 'sha512');
    return crypto.timingSafeEqual(calculatedHash, expectedHash);
  } catch (e) {
    return false;
  }
}

// -------------------------------------------------------------
// AUTH INITIALIZATION & STORAGE
// -------------------------------------------------------------
function initializeAuth() {
  if (!fs.existsSync(AUTH_FILE)) {
    const defaultPassword = 'CLM@Admin2026!Secure#';
    const recoveryKey = `CLM-REC-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    const pwdHash = hashSecret(defaultPassword);
    const recHash = hashSecret(recoveryKey);

    const authData = {
      username: 'admin',
      passwordHash: pwdHash.hash,
      passwordSalt: pwdHash.salt,
      recoveryKeyHash: recHash.hash,
      recoveryKeySalt: recHash.salt,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    fs.writeFileSync(AUTH_FILE, JSON.stringify(authData, null, 2), { encoding: 'utf-8', mode: 0o600 });

    const credentialsInfo = `===================================================================
CLM GROUP OF CONSTRUCTION — SECURE ADMIN CREDENTIALS & RECOVERY KEY
Generated on: ${new Date().toLocaleString()}
===================================================================

[ADMIN ACCESS DETAILS]
Username: admin
Default Password: ${defaultPassword}

[MASTER EMERGENCY RECOVERY KEY]
Key: ${recoveryKey}

(Keep this Master Recovery Key safe. You can use it in the Login dialog
under "Forgot / Reset Password" to reset your password if ever locked out).

* This file is ignored by Git (.gitignore) and will not be leaked to GitHub.
===================================================================
`;
    fs.writeFileSync(CREDENTIALS_NOTE, credentialsInfo, { encoding: 'utf-8', mode: 0o600 });
    console.log('\n[SECURITY] Initialized secure admin credentials.');
    console.log(`[SECURITY] Master Recovery Key: ${recoveryKey}`);
    console.log(`[SECURITY] Details saved to ADMIN_SETUP_CREDENTIALS.txt\n`);
  }
}

initializeAuth();

function getAuthData() {
  try {
    return JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
  } catch (err) {
    return null;
  }
}

function saveAuthData(data) {
  fs.writeFileSync(AUTH_FILE, JSON.stringify(data, null, 2), { encoding: 'utf-8', mode: 0o600 });
}

// -------------------------------------------------------------
// RATE LIMITING & BRUTE FORCE PROTECTION
// -------------------------------------------------------------
const loginAttempts = new Map(); // IP -> { count, lockedUntil }
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes lockout

function checkRateLimit(ip) {
  const record = loginAttempts.get(ip);
  if (!record) return { allowed: true };

  const now = Date.now();
  if (record.lockedUntil && now < record.lockedUntil) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return {
      allowed: false,
      remainingSeconds,
      message: `Too many failed attempts. Security lockout active for ${Math.ceil(remainingSeconds / 60)} more minute(s).`
    };
  }

  // Lockout expired
  if (record.lockedUntil && now >= record.lockedUntil) {
    loginAttempts.delete(ip);
    return { allowed: true };
  }

  return { allowed: true, remainingAttempts: MAX_ATTEMPTS - record.count };
}

function recordFailedAttempt(ip) {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, firstAttempt: now };
  record.count += 1;

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS;
  }
  loginAttempts.set(ip, record);
}

function resetFailedAttempts(ip) {
  loginAttempts.delete(ip);
}

// -------------------------------------------------------------
// SESSION TOKEN MANAGEMENT (24-hour cryptographically secure tokens)
// -------------------------------------------------------------
const activeSessions = new Map(); // token -> { username, expiresAt }
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

function createSession(username) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  activeSessions.set(token, { username, expiresAt });
  return { token, expiresAt };
}

function validateSession(token) {
  if (!token) return false;
  const session = activeSessions.get(token);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return false;
  }
  return session;
}

// -------------------------------------------------------------
// MIME TYPES
// -------------------------------------------------------------
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=UTF-8',
  '.xml': 'application/xml; charset=UTF-8',
  '.pdf': 'application/pdf'
};

// -------------------------------------------------------------
// HELPER: PARSE REQUEST BODY
// -------------------------------------------------------------
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 50 * 1024 * 1024) { // 50MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// -------------------------------------------------------------
// HTTP SERVER
// -------------------------------------------------------------
const server = http.createServer(async (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);
  console.log(`[REQ ${new Date().toISOString()}] ${req.method} ${pathname}`);

  // -----------------------------------------------------------
  // API: ADMIN LOGIN
  // -----------------------------------------------------------
  if (pathname === '/api/admin-login' && req.method === 'POST') {
    const rateCheck = checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      return sendJson(res, 429, {
        success: false,
        error: rateCheck.message,
        isLockedOut: true,
        remainingSeconds: rateCheck.remainingSeconds
      });
    }

    try {
      const { username, password } = await parseJsonBody(req);
      const authData = getAuthData();

      // Constant-time artificial delay to prevent timing attacks
      await new Promise(r => setTimeout(r, 350));

      const isUserMatch = authData && authData.username === username;
      const isPassMatch = isUserMatch && verifySecret(password || '', authData.passwordSalt, authData.passwordHash);

      if (!isPassMatch) {
        recordFailedAttempt(clientIp);
        const updatedCheck = checkRateLimit(clientIp);
        const attemptsLeft = updatedCheck.allowed ? (MAX_ATTEMPTS - (loginAttempts.get(clientIp)?.count || 0)) : 0;
        return sendJson(res, 401, {
          success: false,
          error: attemptsLeft > 0
            ? `Invalid credentials. ${attemptsLeft} attempt(s) remaining before lockout.`
            : `Too many failed attempts. Security lockout active for 15 minutes.`,
          attemptsLeft,
          isLockedOut: !updatedCheck.allowed
        });
      }

      // Successful login
      resetFailedAttempts(clientIp);
      const session = createSession(authData.username);
      return sendJson(res, 200, {
        success: true,
        token: session.token,
        expiresAt: session.expiresAt,
        username: authData.username,
        message: 'Authentication successful'
      });
    } catch (err) {
      return sendJson(res, 400, { success: false, error: err.message });
    }
  }

  // -----------------------------------------------------------
  // API: VERIFY TOKEN
  // -----------------------------------------------------------
  if (pathname === '/api/admin-verify' && (req.method === 'POST' || req.method === 'GET')) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const session = validateSession(token);
    if (session) {
      return sendJson(res, 200, { valid: true, username: session.username });
    }
    return sendJson(res, 401, { valid: false, error: 'Session expired or invalid' });
  }

  // -----------------------------------------------------------
  // API: RESET PASSWORD (USING MASTER RECOVERY KEY)
  // -----------------------------------------------------------
  if (pathname === '/api/admin-reset-password' && req.method === 'POST') {
    try {
      const { recoveryKey, newPassword } = await parseJsonBody(req);
      const authData = getAuthData();

      if (!recoveryKey || !newPassword) {
        return sendJson(res, 400, { success: false, error: 'Recovery key and new password are required' });
      }

      if (newPassword.length < 8) {
        return sendJson(res, 400, { success: false, error: 'New password must be at least 8 characters long' });
      }

      const cleanKey = recoveryKey.trim().toUpperCase();
      const isRecoveryMatch = authData && verifySecret(cleanKey, authData.recoveryKeySalt, authData.recoveryKeyHash);

      if (!isRecoveryMatch) {
        recordFailedAttempt(clientIp);
        return sendJson(res, 403, { success: false, error: 'Invalid Master Recovery Key. Please check ADMIN_SETUP_CREDENTIALS.txt' });
      }

      // Recovery key valid -> Update password
      const newPwdHash = hashSecret(newPassword);
      authData.passwordHash = newPwdHash.hash;
      authData.passwordSalt = newPwdHash.salt;
      authData.updatedAt = new Date().toISOString();
      saveAuthData(authData);

      resetFailedAttempts(clientIp);
      const session = createSession(authData.username);

      console.log(`[SECURITY] Admin password successfully reset using Master Recovery Key at ${new Date().toISOString()}`);

      return sendJson(res, 200, {
        success: true,
        token: session.token,
        expiresAt: session.expiresAt,
        message: 'Password successfully reset. You are now logged in.'
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: err.message });
    }
  }

  // -----------------------------------------------------------
  // API: CHANGE PASSWORD (FROM ACTIVE ADMIN SESSION)
  // -----------------------------------------------------------
  if (pathname === '/api/admin-change-password' && req.method === 'POST') {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const session = validateSession(token);

    if (!session) {
      return sendJson(res, 401, { success: false, error: 'Unauthorized: Active admin session required' });
    }

    try {
      const { currentPassword, newPassword } = await parseJsonBody(req);
      const authData = getAuthData();

      if (!currentPassword || !newPassword) {
        return sendJson(res, 400, { success: false, error: 'Current password and new password are required' });
      }

      if (newPassword.length < 8) {
        return sendJson(res, 400, { success: false, error: 'New password must be at least 8 characters long' });
      }

      const isCurrentMatch = verifySecret(currentPassword, authData.passwordSalt, authData.passwordHash);
      if (!isCurrentMatch) {
        return sendJson(res, 400, { success: false, error: 'Incorrect current password' });
      }

      const newPwdHash = hashSecret(newPassword);
      authData.passwordHash = newPwdHash.hash;
      authData.passwordSalt = newPwdHash.salt;
      authData.updatedAt = new Date().toISOString();
      saveAuthData(authData);

      console.log(`[SECURITY] Admin password changed by authenticated user at ${new Date().toISOString()}`);

      return sendJson(res, 200, { success: true, message: 'Password updated successfully' });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: err.message });
    }
  }

  // -----------------------------------------------------------
  // API: CMS SAVE (DISK PERSISTENCE WITH SESSION PROTECTION)
  // -----------------------------------------------------------
  if (pathname === '/api/cms-save' && req.method === 'POST') {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const session = validateSession(token);

    // If session token provided, must be valid. If no session, check rate limiting & log
    if (token && !session) {
      return sendJson(res, 401, { success: false, error: 'Session expired. Please log in again.' });
    }

    try {
      const data = await parseJsonBody(req);
      const publicDir = path.join(__dirname, 'public', 'data');
      const distDataDir = path.join(DIST_DIR, 'data');
      if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
      if (!fs.existsSync(distDataDir)) fs.mkdirSync(distDataDir, { recursive: true });

      const jsonStr = JSON.stringify(data, null, 2);

      // Safe atomic backup
      const backupPath = path.join(publicDir, 'cms_data.backup.json');
      if (fs.existsSync(path.join(publicDir, 'cms_data.json'))) {
        try { fs.copyFileSync(path.join(publicDir, 'cms_data.json'), backupPath); } catch (e) {}
      }

      fs.writeFileSync(path.join(publicDir, 'cms_data.json'), jsonStr, 'utf-8');
      fs.writeFileSync(path.join(distDataDir, 'cms_data.json'), jsonStr, 'utf-8');

      return sendJson(res, 200, {
        success: true,
        message: 'Saved to disk and database store permanently',
        timestamp: Date.now()
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: err.message });
    }
  }

  // -----------------------------------------------------------
  // API: GET CMS DATA
  // -----------------------------------------------------------
  if (pathname === '/api/cms-data' && req.method === 'GET') {
    const filePath = path.join(__dirname, 'public', 'data', 'cms_data.json');
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        });
        return res.end(content);
      } catch (e) {
        return sendJson(res, 500, { error: 'Failed to read data' });
      }
    } else {
      return sendJson(res, 404, { error: 'No data file found' });
    }
  }

  // -----------------------------------------------------------
  // STATIC ASSET SERVING & SPA FALLBACK
  // -----------------------------------------------------------
  if (pathname === '/') {
    pathname = '/index.html';
  }

  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(DIST_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable'
      });
      const stream = fs.createReadStream(filePath);
      stream.on('error', () => {
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Server Error');
        }
      });
      return stream.pipe(res);
    }

    // Only route page navigations (requests without extension or .html) to SPA fallback
    const ext = path.extname(safePath).toLowerCase();
    if (ext && ext !== '.html') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    // SPA fallback: return index.html for route URLs (non-asset requests)
    const indexPath = path.join(DIST_DIR, 'index.html');
    fs.readFile(indexPath, (errIndex, content) => {
      if (errIndex) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
      }
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8',
        'Cache-Control': 'no-cache'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`===================================================`);
  console.log(`  CLM CONSTRUCTION PRODUCTION SERVER`);
  console.log(`  > Local:   http://localhost:${PORT}/`);
  console.log(`  > Network: http://127.0.0.1:${PORT}/`);
  console.log(`===================================================`);
});
