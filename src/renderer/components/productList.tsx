// components/ProductTable.tsx
import { useEffect, useState } from 'react';
import { Product } from '../../types';
import DataTable from '../components/table';
import { Column } from '../components/table';

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = () => {
    if (window.electronAPI?.getProducts) {
      window.electronAPI.getProducts().then(setProducts);
    } else {
      console.warn("Electron API not available — using mock data");
      setProducts([
        { id: 1, name: 'Mock Item A', price: 9.99, stock: 10 },
        { id: 2, name: 'Mock Item B', price: 19.99, stock: 5 }
      ]);
    }
  };

  const deleteProduct = async (product: Product) => {
  if (!product.id) {
    console.warn("Cannot delete product without an ID.");
    return;
  }

  if (window.electronAPI?.deleteProduct) {
    await window.electronAPI.deleteProduct(product.id);
    loadProducts();
  }
};

  useEffect(() => {
    loadProducts();
  }, []);

  const columns: Column<Product>[] = [
    { header: 'Name', accessor: 'name' },
    { header: 'Price', accessor: 'price', render: (value: any) => `$${value.toFixed(2)}` },
    { header: 'Stock', accessor: 'stock' },
  ];

  return (
    <section className='List'>
      <h2 className="text-xl font-semibold mb-4">Product List</h2>
      <DataTable columns={columns} data={products} onDelete={deleteProduct} />
    </section>
  );
};

export default ProductTable;
