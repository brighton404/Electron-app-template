# Electron Desktop App Template

## 📦 Tech Stack

- **Electron** (with `contextBridge` security)
- **Vite** for blazing-fast frontend bundling
- **React + TypeScript**
- **SQLite (better-sqlite3)** as the embedded DB
- IPC communication between frontend and main process
<br/>
---

## Getting started

Install dependancies
```
npm install
```
Start a vite server
```
npm run vite
```
start electron app
```
npm run electron
```
build and start app from dist folder
```
npm run start
```

if you ran into better-sqllite3 errors try
`Rebuild for Electron`
```
npx electron-rebuild
```

<br />

Routing method: Hashrouter

Prebuilt Components
<ul>
    <li>Sidebar</li>
    <li>Tooltip</li>
</ul>