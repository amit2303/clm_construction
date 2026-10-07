import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';

function cmsPersistencePlugin() {
  return {
    name: 'cms-persistence-plugin',
    configureServer(server) {
      server.middlewares.use('/api/cms-save', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const publicDataDir = path.resolve(process.cwd(), 'public', 'data');
              if (!fs.existsSync(publicDataDir)) {
                fs.mkdirSync(publicDataDir, { recursive: true });
              }
              const filePath = path.join(publicDataDir, 'cms_data.json');
              fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Saved to disk', timestamp: Date.now() }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }
        res.statusCode = 405;
        res.end();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    cmsPersistencePlugin(),
  ],
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
  }
});
