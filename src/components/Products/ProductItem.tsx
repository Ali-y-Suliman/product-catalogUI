import React, { useState } from 'react';
import { Category, Product, ProductCreate, ProductUpdate } from '../../types';
import { deleteProduct, updateProduct } from '../../services/productsService';
import { useAlert } from '../../contexts/AlertContext';
import { CreateModal } from '../Common/CreateModal';
import ProductForm from './ProductForm';

interface ProductItemProps {
  product: Product;
  categories: Category[];
  refreshProducts: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, categories, refreshProducts }) => {
  
  const [editingProduct, setEditingProduct] = useState<ProductUpdate | null>(null);
  const { setAlert } = useAlert();
  
  const productItem : ProductUpdate = {
        id: product.id,
        name: product.name,
        price: product.price,
        isbn: product.isbn,
        categoryIds: product.categories.map(c => c.id)
    };


  const handleUpdateProduct = async (id: number, product: ProductCreate) => {
    try {
      await updateProduct(id, product);
      refreshProducts();
      setEditingProduct(null);
      setAlert({ message: 'Product updated successfully', type: 'success' });
    } catch (error: any) {
      setAlert({ message: error.message || 'Failed to update product', type: 'error' });
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      refreshProducts();
      setAlert({ message: 'Product deleted successfully', type: 'success' });
    } catch (error: any) {
      setAlert({ message: error.message || 'Failed to delete product', type: 'error' });
    }
  };

   return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 ease-in-out hover:shadow-xl">
            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
                <div className="text-gray-600 mb-2">Price: ${product.price.toFixed(2)}</div>
                <div className="text-gray-600 mb-4">ISBN: {product.isbn}</div>
                <div className="text-sm text-gray-500 mb-4">
                    Categories: {product.categories.map(c => `${c.nameEn} (${c.nameAr})`).join(', ')}
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setEditingProduct(productItem)}
                        className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {editingProduct && (
                <CreateModal
                    editedObject={editingProduct}
                    originalObject={product}
                    categories={categories}
                    onUpdate={handleUpdateProduct}
                    cancel={() => setEditingProduct(null)}
                    FormComponent={ProductForm}
                    title="Edit Product"
                />
            )}
        </div>
    );
}

export default ProductItem;