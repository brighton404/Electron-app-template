# Electron Desktop App Template
## RoadMap
This is the final structure i will complete this template. The current state is too basic.
<br/>
```bash
my-electron-app/
│
├── packages/
│   ├── main/                 # Electron main process (Node.js)
│   │   ├── src/
│   │   │   ├── main.ts       # Entry point for Electron
│   │   │   ├── preload.ts    # Preload script (IPC bridge)
│   │   │   ├── plugins.ts    # Plugin loader/manager
│   │   │   └── ipc/          # IPC handlers
│   │   └── vite.config.ts    # Vite config for main (if bundled)
│
│   ├── renderer/             # Frontend app (Vite)
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   ├── main.tsx
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── plugins/      # Frontend plugin integration
│   │   └── vite.config.ts
│
│   └── shared/               # Shared types/constants between main and renderer
│       └── types.ts
│
├── plugins/                 # External plugin directory (optional, dynamic load)
│   ├── sample-plugin/
│   │   ├── main.js          # Plugin main logic (Node)
│   │   └── manifest.json    # Plugin metadata
│
├── electron-builder.json
├── package.json
└── tsconfig.json
```

---

### Components

- Button	Consistent button styles (<Button variant="primary" />)
- Input / TextField	Form inputs with validation
- Modal	For plugin UIs or confirmations
- Tooltip	For explaining actions (used by plugin icons, etc.)
- Tabs	Used for plugin views or settings pages
- Dropdown	Used in plugin launchers, settings
- Switch	Toggle options in preferences
- Toast	Global notification handler
- Loader	Spinner/loading state
- ErrorBoundary	To catch frontend plugin failures safely

---

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
npm run preview
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