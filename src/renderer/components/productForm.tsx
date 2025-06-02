import { useState } from 'react';
import { Product } from '../../types';

const ProductForm = ({ onAdd }: { onAdd: () => void }) => {
  const [product, setProduct] = useState<Product>({ name: '', price: 0, stock: 0 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await window.electronAPI.addProduct(product);
    setProduct({ name: '', price: 0, stock: 0 });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input placeholder="Name" value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })} />
      <input type="number" placeholder="Price" value={product.price}
        onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })} />
      <input type="number" placeholder="Stock" value={product.stock}
        onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) })} />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
