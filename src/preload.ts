import { contextBridge, ipcRenderer } from 'electron';
import type { Product } from './types'

contextBridge.exposeInMainWorld('electronAPI', {
  getProducts: (): Promise<Product[]> => ipcRenderer.invoke('products:list'),
  addProduct: (product: Product): Promise<{ id: number }> => ipcRenderer.invoke('products:add', product),
  deleteProduct: (id: number): Promise<void> => ipcRenderer.invoke('products:delete', id),
  minimize: () => ipcRenderer.send('minimize'),
  maximize: () => ipcRenderer.send('maximize'),
  close: () => ipcRenderer.send('close')
});