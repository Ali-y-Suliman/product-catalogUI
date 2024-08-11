import React, { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../hooks/useApi';
import { usePagination } from '../../hooks/usePagination';
import { ProductCreate } from '../../types';
import ProductForm from './ProductForm';
import ProductItem from './ProductItem';
import Pagination from '../Common/Pagination';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import { useAlert } from '../../contexts/AlertContext';
import { createProduct, getProducts } from '../../services/productsService';
import { getCategories } from '../../services/categoriesService';

const ProductList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [startSearch, setStartSearch] = useState('');
  const { page, setPage, pageSize, setTotalPages } = usePagination();
  const { setAlert } = useAlert();
  const [validationError, setValidationError] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [serchSelectedCategory, setSerchSelectedCategory] = useState<number | undefined>();

  const { 
    data: productsData, 
    loading: productsLoading, 
    error: productsError, 
    execute: fetchProducts 
  } = useApi(getProducts);

  const { 
    data: categoriesData, 
    loading: categoriesLoading, 
    error: categoriesError, 
    execute: fetchCategories 
  } = useApi(getCategories);

  const fetchProductsCallback = useCallback(() => {
    fetchProducts(page, pageSize, selectedCategory, search);
    fetchCategories();
  }, [fetchProducts, page, pageSize, serchSelectedCategory, startSearch]);

  useEffect(() => {
    fetchProductsCallback();
  }, [fetchProductsCallback]);

  useEffect(() => {
    if (productsData) {
      setTotalPages(productsData.totalPages);
    }
  }, [productsData, setTotalPages]);

  const handleCreateProduct = async (product: ProductCreate) => {
    try {
      await createProduct(product);
      setPage(1);
      setValidationError(undefined);
      setAlert({ message: 'Product created successfully', type: 'success' });
    } catch (error: any) {
      setAlert({ message: error.message || 'Failed to create product', type: 'error' });
      console.log(error)
      setValidationError(error.message || 'An error occurred while creating the product');
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value ? Number(event.target.value) : undefined;
    setSelectedCategory(categoryId);
    setPage(1);
  };

  if (productsLoading || categoriesLoading) return <LoadingSpinner />;
  if (productsError) return <ErrorMessage message={productsError.message} />;
  if (categoriesError) return <ErrorMessage message={categoriesError.message} />;

  return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Products</h1>
        
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Product</h2>
                <ProductForm
                    onSubmit={handleCreateProduct}
                    categories={categoriesData?.items || []}
                    error={validationError}
                />
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                    <div className="flex-grow">
                    <input
                        type="text"
                        placeholder="Search by name | ISBN"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    </div>
                    <div className="sm:w-1/4">
                        <select
                            value={selectedCategory || ''}
                            onChange={handleCategoryChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">All Categories</option>
                                {(categoriesData?.items || []).map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.nameEn}
                            </option>
                            ))}
                        </select>
                    </div>
                    <button 
                        onClick={(e) => {
                            setStartSearch(search);
                            setSerchSelectedCategory(selectedCategory);
                            }}
                        className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                        Search
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productsData && productsData.items.map(product => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            categories={categoriesData?.items || []}
                            refreshProducts={() => fetchProductsCallback()}
                        />
                    ))}
                </div>

                {productsData && productsData.items.length === 0 && (
                    <p className="text-gray-500 text-center py-8 text-lg">No products found.</p>
                )}

                <div className="mt-8">
                    <Pagination
                    currentPage={page}
                    totalPages={productsData ? Math.ceil(productsData.totalCount / pageSize) : 1}
                    onPageChange={setPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductList;