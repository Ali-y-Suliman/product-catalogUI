import React from 'react';
import { useCallback, useEffect } from "react";
import { useAlert } from "../../contexts/AlertContext";
import { useApi } from "../../hooks/useApi";
import { usePagination } from "../../hooks/usePagination";
import { createCategory, getCategories } from "../../services/categoriesService";
import CategoryForm from "./CategoryForm";
import LoadingSpinner from "../Common/LoadingSpinner";
import ErrorMessage from "../Common/ErrorMessage";
import Pagination from "../Common/Pagination";
import { Category } from "../../types";
import CategoryItem from "./CategoryItem";

export const CategoriesList: React.FC = () => {

  const { page, setPage, pageSize, setTotalPages } = usePagination();
  const { setAlert } = useAlert();

  const { 
    data: categoriesData, 
    loading, 
    error, 
    execute: fetchCategories 
  } = useApi(getCategories);

  const fetchCategoriesCallback = useCallback(() => {
    fetchCategories(page, pageSize);
  }, [fetchCategories, page, pageSize]);

  useEffect(() => {
    fetchCategoriesCallback();
  }, [fetchCategoriesCallback]);

  useEffect(() => {
    if (categoriesData) {
      setTotalPages(categoriesData.totalPages);
    }
  }, [categoriesData, setTotalPages]);


  const handleCreateCategory = async (category: Omit<Category, 'id'>) => {
    try {
      await createCategory(category);
      fetchCategories();
      setAlert({ message: 'Category created successfully', type: 'success' });
    } catch (error: any) {
      setAlert({ message: error.message || 'Failed to create category', type: 'error' });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Categories</h1>
      
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Category</h2>
                <CategoryForm onSubmit={handleCreateCategory} />
            </div>

            <div className="bg-gray-50 shadow-lg rounded-lg p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoriesData && categoriesData.items.map(category => (
                        <CategoryItem
                        key={category.id}
                        category={category}
                        refreshCategories={fetchCategoriesCallback}
                        />
                    ))}
                </div>

                {categoriesData && categoriesData.items.length === 0 && (
                    <p className="text-gray-500 text-center py-8 text-lg">No categories found.</p>
                )}

                <div className="mt-8">
                    <Pagination
                        currentPage={page}
                        totalPages={categoriesData ? Math.ceil(categoriesData.totalCount / pageSize) : 1}
                        onPageChange={setPage}
                    />
                </div>
            </div>
        </div>
    );
}