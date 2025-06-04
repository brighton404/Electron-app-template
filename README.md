# Electron Desktop App Template

## 📦 Tech Stack

- **Electron** (with `contextBridge` security)
- **Vite** for blazing-fast frontend bundling
- **React + TypeScript**
- **SQLite (better-sqlite3)** as the embedded DB
- IPC communication between frontend and main process
<br/>

## Getting started

Install dependancies
```bash
npm install
```

Start a vite server
```bash
npm run vite
```

if you ran into better-sqllite3 errors when building for production, try:
`Rebuild for Electron`
```bash
npx electron-rebuild
```

<br />

---

## Run in Development (Electron with Vite)

```bash
npm run start  # This also starts the electron app immediately after dist is generated
```

start electron app (only after generating dist)
```bash
npm run electron
```

This will:

* Build the frontend with Vite in development mode
* Launch the Electron app loading the dev server

---

## Build for Production

```bash
npm run build
```

* Vite builds your React app to `dist/`
* Electron loads the static files from `dist/` using `file://` protocol

---

## Project Structure

```bash
src/
│
├── main.ts           # Electron main process (Node)
├── preload.ts        # Secure contextBridge API
├── renderer/         # React frontend
│   ├── App.tsx
│   ├── components/
│   ├── pages/
│   └── types.d.ts
```

## Prebuilt Components
<ul>
    <li>Sidebar</li>
    <li>Tooltip</li>
</ul>

## Security Notes

* Uses `contextBridge` to expose a limited `electronAPI` to the renderer
* All DB access and filesystem logic happens in the main process

---

## Credits

Inspired by tools like Obsidian and VS Code.