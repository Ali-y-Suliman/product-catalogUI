import React, { useEffect, useMemo } from 'react';
import { useApi } from '../../hooks/useApi';
import CategoryChart from './CategoryChart';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import { getCategoriesWithProductCount } from '../../services/categoriesService';

const CategoriesDashboard: React.FC = () => {
  const { 
    data: categories, 
    loading, 
    error, 
    execute: fetchCategories 
  } = useApi(getCategoriesWithProductCount);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const totalProductCount = useMemo(() => {
    if (!categories) return 0;
    return categories.reduce((total, category) => total + category.productCount, 0);
  }, [categories]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Categories Dashboard</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">System Overview</h2>
        <p className="text-lg text-gray-600">Total Products: {totalProductCount}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories && categories.map(category => (
          <CategoryChart 
            key={category.id} 
            category={category} 
            totalProductCount={totalProductCount} 
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesDashboard;