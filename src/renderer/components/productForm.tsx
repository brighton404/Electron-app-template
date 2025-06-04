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
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }} id='prdForm'>
      <h2>Add a product</h2>
      <label htmlFor="productName">Name</label>
      <input placeholder="Name" value={product.name} aria-label='productName'
        onChange={(e) => setProduct({ ...product, name: e.target.value })} />
      <label htmlFor="productPrice">Price</label>
      <input type="number" placeholder="Price" value={product.price} aria-label='productPrice'
        onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })} />
      <label htmlFor="productStock">Stock</label>
      <input type="number" placeholder="Stock" value={product.stock} aria-label='productStock'
        onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) })} />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
