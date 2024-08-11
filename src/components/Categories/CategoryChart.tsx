

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CategoryProductCount } from '../../types';

interface CategoryChartProps {
  category: CategoryProductCount;
  totalProductCount: number;
}

const COLORS = ['#4f46e5', '#818cf8'];

const CategoryChart: React.FC<CategoryChartProps> = ({ category, totalProductCount }) => {
  const percentage = ((category.productCount / totalProductCount) * 100).toFixed(2);
  const otherCategoriesCount = totalProductCount - category.productCount;

  const data = [
    { name: category.nameEn, value: category.productCount },
    { name: 'Other Categories', value: otherCategoriesCount },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p className="font-semibold">{payload[0].name}</p>
          <p>Count: {payload[0].value}</p>
          <p>Percentage: {((payload[0].value / totalProductCount) * 100).toFixed(2)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{category.nameEn} ({category.nameAr})</h2>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[{ name: category.nameEn, productCount: category.productCount }]}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="productCount" fill="#4f46e5" name="Product Count" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
            <p>Products in this category: {category.productCount.toLocaleString()}</p>
            <p>Percentage of total products: {percentage}%</p>
            <p>Total products: {totalProductCount.toLocaleString()}</p>
        </div>
    </div>
  );
};

export default CategoryChart;