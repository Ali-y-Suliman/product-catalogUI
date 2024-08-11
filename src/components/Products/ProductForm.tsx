import React, { useState, useCallback } from 'react';
import { Category, Product, ProductCreate } from '../../types';
import MultiSelectDropdown from '../Common/dropDownList';

interface ProductFormProps {
  onSubmit: (product: ProductCreate) => void;
  categories: Category[];
  FormComponent?: ProductCreate;
  originalObject?: Product;
  error?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, categories, FormComponent, originalObject, error }) => {
  const [product, setProduct] = useState<ProductCreate>(FormComponent || {
    name: '',
    price: 0,
    isbn: '',
    categoryIds: [],
  });

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!product.name.trim()) newErrors.name = "Name is required";
    if (product.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!product.isbn.trim()) newErrors.isbn = "ISBN is required";
    if (!/^[0-9]+$/.test(product.isbn)) newErrors.isbn = "ISBN format is invalid (Number is required)";
    if (product.categoryIds.length === 0) newErrors.categories = "At least one category is required";
    setValidationErrors(newErrors);
    console.log(validationErrors)
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectionChange = useCallback((categories: number[]) => {
    setProduct(prev => ({ ...prev, categoryIds: categories }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
        onSubmit(product);
    }
  };

  return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Enter product name"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                />
                {validationErrors.name && <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>}
            </div>
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                    id="price"
                    type="number"
                    placeholder="Enter price"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                />
                {validationErrors.price && <p className="mt-1 text-sm text-red-600">{validationErrors.price}</p>}
            </div>
            <div>
                <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                <input
                    id="isbn"
                    type="text"
                    placeholder="Enter ISBN"
                    value={product.isbn}
                    onChange={(e) => setProduct({ ...product, isbn: e.target.value })}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                />
                {validationErrors.isbn && <p className="mt-1 text-sm text-red-600">{validationErrors.isbn}</p>}
            </div>
            <div>
                <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
                <MultiSelectDropdown 
                    categories={categories} 
                    onSelectionChange={handleSelectionChange} 
                    productCategories={originalObject?.categories}
                />
                {validationErrors.categories && <p className="mt-1 text-sm text-red-600">{validationErrors.categories}</p>}
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {FormComponent ? 'Update Product' : 'Create Product'}
            </button>
        </form>
    );
};

export default ProductForm;