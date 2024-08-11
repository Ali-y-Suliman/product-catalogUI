import React, { useState, useCallback, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Category } from '../../types';

interface MultiSelectDropdownProps {
  categories: Category[];
  onSelectionChange: (selectedIds: number[]) => void;
  productCategories?: Category[];
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  categories,
  onSelectionChange,
  productCategories = []
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(productCategories);

  useEffect(() => {
    const selectedIds = selectedCategories.map(c => c.id);
    onSelectionChange(selectedIds);
  }, [selectedCategories, onSelectionChange]);

  const toggleCategory = useCallback((category: Category) => {
    setSelectedCategories(prev => {
      const isSelected = prev.some(c => c.id === category.id);
      if (isSelected) {
        return prev.filter(c => c.id !== category.id);
      } else {
        return [...prev, category];
      }
    });
    setIsOpen(false);
  }, []);

  return (
    <div className="relative w-full">
        <div
            className="flex items-center justify-between p-2 border rounded-md cursor-pointer bg-white hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex flex-wrap gap-1">
                {selectedCategories.length === 0 ? (
                    <span className="text-gray-400">Select categories</span>
                    ) : (
                    selectedCategories.map(category => (
                    <span
                        key={category.id}
                        className="flex items-center bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
                    >
                        {category.nameEn}({category.nameAr})
                        <X
                            size={14}
                            className="ml-1 cursor-pointer hover:text-indigo-600"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleCategory(category);
                            }}
                        />
                    </span>
                    ))
                )}
            </div>
            <ChevronDown size={20} className={`transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
        {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {categories.map(category => (
                    <div
                    key={category.id}
                    className={`p-2 cursor-pointer hover:bg-indigo-50 ${
                        selectedCategories.some(c => c.id === category.id) ? 'bg-indigo-100' : ''
                    }`}
                    onClick={() => toggleCategory(category)}
                    >
                    {category.nameEn}({category.nameAr})
                    </div>
            ))}
            </div>
        )}
    </div>
  );
};

export default MultiSelectDropdown;