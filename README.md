# 🧩 3D Graphics Editor – Frontend

This is the **frontend application** for a web-based **3D graphics editor**. It uses **React** and **Vite** to deliver a fast and interactive user interface for creating, editing, and exporting 3D scenes in real time.

## 🚀 Technologies

- **React** – for building the user interface
- **Vite** – fast development and build tool
- **Three.js** – for 3D rendering
- **React Three Fiber** – React renderer for Three.js
- **SASS** – for styling 

## ✨ Features

- 🌀 Camera orbit, zoom, and pan
- ✋ Object transformations: move, scale, rotate
- 🎨 Material and color editor
- 💾 Scene export and import

## 🧑‍💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/CADR-PG/CADR-front.git
cd CADR-front
```

### 2. Install mkcert for HTTPS support

This project requires HTTPS for local development. Install mkcert:

```bash
# macOS
brew install mkcert nss

# Linux
sudo apt install mkcert libnss3-tools

# Windows (with Chocolatey)
choco install mkcert
```

### 3. Generate SSL certificates

```bash
# Register local CA (mkcert will ask for permissions)
mkcert -install

# Generate certificates for localhost
mkdir -p certs
mkcert -key-file certs/localhost+2-key.pem -cert-file certs/localhost+2.pem localhost 127.0.0.1 ::1
```

### 4. Install dependencies

```bash
pnpm install
```

### 5. Run dev server

```bash
pnpm run dev
```

The application will be available at `https://localhost:5173/`

### 6. Verify (optional)

```bash
curl -vk https://localhost:5173/ | head -n 20
```
