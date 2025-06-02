import { Product } from "../types";

export {};

export interface ElectronAPI {
  getProducts(): Promise<Product[]>;
  addProduct(product: Product): Promise<{ id: number }>;
  deleteProduct: (id: number) => Promise<void>;
  minimize(): void;
  maximize(): void;
  close(): void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}