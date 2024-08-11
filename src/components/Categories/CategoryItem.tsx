import React, { useState } from 'react';
import { Category } from '../../types';
import { deleteCategory, updateCategory } from '../../services/categoriesService';
import { CreateModal } from '../Common/CreateModal';
import { useAlert } from '../../contexts/AlertContext';
import CategoryForm from './CategoryForm';

interface CategoryItemProps {
  category: Category;
  refreshCategories: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, refreshCategories }) => {

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { setAlert } = useAlert();
  
  const handleUpdateCategory = async (id: number, category: Omit<Category, 'id'>) => {
    try {
      await updateCategory(id, category);
      refreshCategories();
      setEditingCategory(null);
      setAlert({ message: 'Category updated successfully', type: 'success' });
    } catch (error: any) {
      setAlert({ message: error.message || 'Failed to update category', type: 'error' });
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory(id);
      refreshCategories();
      setAlert({ message: 'Category deleted successfully', type: 'success' });
    } catch (error: any) {
      setAlert({ message: error.message || 'Failed to delete category', type: 'error' });
    }
  };
   return (
        <div className="bg-white shadow-md rounded-lg p-6 transition duration-300 ease-in-out hover:shadow-lg">
            <div className="flex flex-col items-center justify-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">{category.nameEn}</h2>
                <div className="text-md text-gray-600 text-center">{category.nameAr}</div>
            </div>
            <div className="mt-6 flex justify-between space-x-4">
                <button
                    onClick={() => setEditingCategory(category)}
                    className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    Delete
                </button>
            </div>

            {editingCategory && (
                <CreateModal
                editedObject={editingCategory}
                onUpdate={handleUpdateCategory}
                cancel={() => setEditingCategory(null)}
                FormComponent={CategoryForm}
                title="Edit Category"
                />
            )}
        </div>
);
}

export default CategoryItem;