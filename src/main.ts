import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

import Database from 'better-sqlite3';

// Store database in userData folder
const dbPath = path.join(app.getPath('userData'), 'store.db');
const db = new Database(dbPath);

// Run once to initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    quantity INTEGER,
    total REAL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

ipcMain.handle('products:list', () => {
  return db.prepare('SELECT * FROM products').all();
});

ipcMain.handle('products:add', (_, product) => {
  const stmt = db.prepare('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)');
  const result = stmt.run(product.name, product.price, product.stock);
  return { id: result.lastInsertRowid };
});

ipcMain.handle('products:delete', (_, id: number) => {
  db.prepare('DELETE FROM products WHERE id = ?').run(id);
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // ✅ This is the correct way to load the Vite-built HTML
  win.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);

  ipcMain.on('minimize', () => win.minimize());
  ipcMain.on('maximize', () => win.isMaximized() ? win.unmaximize() : win.maximize());
  ipcMain.on('close', () => win.close());
}

app.whenReady().then(createWindow);
