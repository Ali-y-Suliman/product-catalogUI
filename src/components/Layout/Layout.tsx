import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAlert } from '../../contexts/AlertContext';

export const Layout: React.FC<{children: ReactNode}> = ({ children }) => {
    const { alert } = useAlert();
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Product Catalog App</h1>
                </div>
            </header>
            <nav className="bg-indigo-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                    <Link to="/" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                    <Link to="/products" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">Products</Link>
                    <Link to="/categories" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">Categories</Link>
                    </div>
                </div>
                </div>
            </nav>
            {alert && (
                <div className={`p-4 ${alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {alert.message}
                </div>
                </div>
            )}
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
  };