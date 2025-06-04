import { useEffect, useState } from 'react';
import { Product } from '../../types';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

const loadProducts = () => {
  if (window.electronAPI?.getProducts) {
    window.electronAPI.getProducts().then(setProducts);
  } else {
    console.warn("Electron API not available — running in Vite dev mode.");
    // Add mock data for UI testing in localhost (npm run vite)
    setProducts([
      { id: 1, name: 'Mock Item A', price: 9.99, stock: 10 },
      { id: 2, name: 'Mock Item B', price: 19.99, stock: 5 }
    ]);
  }
};

  const deleteProduct = async (id: number) => {
    await window.electronAPI.deleteProduct(id);
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - ${p.price} ({p.stock} left)
            <button onClick={() => deleteProduct(p.id!)}> Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
