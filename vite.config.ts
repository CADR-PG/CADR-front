import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import https from 'https'

const keyPath = path.resolve(__dirname, 'certs', 'localhost+2-key.pem')
const certPath = path.resolve(__dirname, 'certs', 'localhost+2.pem')

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  throw new Error('Brak plików certs/localhost+2-key.pem i localhost+2.pem (uruchom mkcert).')
}

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
    proxy: {
      '/api': {
        target: 'https://localhost:8081',
        changeOrigin: true,
        secure: false,
        agent: new https.Agent({ rejectUnauthorized: false }),
        rewrite: p => p.replace(/^\/api/, ''),
      }
    }
  }
})

