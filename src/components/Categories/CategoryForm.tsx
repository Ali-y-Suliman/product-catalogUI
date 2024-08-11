import React, { useState } from 'react';
import { Category } from '../../types';

interface CategoryFormProps {
  onSubmit: (category: Omit<Category, 'id'>) => void;
  FormComponent?: Omit<Category, 'id'>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, FormComponent }) => {
  const [category, setCategory] = useState<Omit<Category, 'id'>>(FormComponent || {
    nameEn: '',
    nameAr: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(category);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="nameEn" className="block text-sm font-medium text-gray-700 mb-1">English Name</label>
            <input
                id="nameEn"
                type="text"
                placeholder="Enter English name"
                value={category.nameEn}
                onChange={(e) => setCategory({ ...category, nameEn: e.target.value })}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
            />
        </div>
        <div>
            <label htmlFor="nameAr" className="block text-sm font-medium text-gray-700 mb-1">Arabic Name</label>
            <input
                id="nameAr"
                type="text"
                placeholder="Enter Arabic name"
                value={category.nameAr}
                onChange={(e) => setCategory({ ...category, nameAr: e.target.value })}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
            />
        </div>
      <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            {FormComponent ? 'Update Category' : 'Create Category'}
        </button>
    </form>
  );
};

export default CategoryForm;