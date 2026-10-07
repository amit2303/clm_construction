# CLM Group of Construction — Production Website & Secure Inline CMS

High-performance engineering website for **CLM Group of Construction** ([https://www.clmconstruction.in/](https://www.clmconstruction.in/)) built with **React 19**, **Vite**, and an **Inline-Editing CMS** backed by **PBKDF2 SHA-512 Server Authentication** and instant persistence.

---

## 🔒 Enterprise-Grade Security Architecture

### 1. Cryptographic Authentication & Password Storage
- **PBKDF2 SHA-512 Encryption**: Passwords are never stored in plaintext. Passwords use **100,000 hashing rounds** with unique 32-byte cryptographically random salts via Node.js native `crypto`.
- **Timing Attack Defense**: Comparisons use `crypto.timingSafeEqual` with artificial delays to eliminate timing side-channel attacks.
- **Brute-Force & Rate Limiting**: If 5 failed attempts occur within 15 minutes, access is locked for 15 minutes.
- **Session Tokens**: 24-hour cryptographically random session tokens protect the CMS and all disk-save API routes.

### 2. Emergency Password Recovery & Reset Flow
- **Master Emergency Recovery Key**:
  When the server boots, it generates a unique master recovery key:
  `CLM-REC-XXXX-XXXX`
  (Stored securely in the gitignored `ADMIN_SETUP_CREDENTIALS.txt` on the server).
- **Forgot Password?**:
  In the Admin dialog, click **"Reset Password"** (or **"Forgot Password?"**), enter your Master Recovery Key, and choose a new strong password. Your password updates immediately and logs you in.
- **Changing Password While Logged In**:
  Click the **"Password"** button in the Admin Toolbar at the top to change your password anytime.

---

## 🔑 Admin Access Triggers
1. **Hidden Footer Trigger**: Triple-click the copyright notice in the footer:
   `© 2026 CLM Group of Construction. All rights reserved. Quality is Our Blueprint.`
2. **Keyboard Shortcut**: Press `Ctrl` + `Shift` + `A` (or `Cmd` + `Shift` + `A` on Mac).
3. **Admin Footer Button**: Click the subtle **"Admin"** link next to the scroll-to-top button in the footer.

---

## 🚀 Running & Deploying to Live Server

### 1. Production Build & Local Serve
```bash
# Build the optimized production bundle
npm run build

# Start production server (default port 3000)
npm start
```

### 2. Making It Live on a Cloud VPS / Server (Ubuntu / Debian / EC2 / DigitalOcean)
```bash
# 1. Clone repository on your server
git clone git@github.com:amit2303/clm_construction.git
cd clm_construction

# 2. Install dependencies & build
npm install
npm run build

# 3. Start persistently using PM2 (or systemd)
npm install -g pm2
PORT=80 pm2 start server.cjs --name "clm-production"
pm2 save
pm2 startup
```

### 3. CMS Database & Persistence
- All website modifications are committed automatically to `public/data/cms_data.json` and `dist/data/cms_data.json`.
- Automatic safety backups are created in `cms_data.backup.json` on each change.

---

## 💻 Development Commands

```bash
# Start Vite development server (HMR)
npm run dev

# Run production build
npm run build

# Start live server
npm run serve
```
