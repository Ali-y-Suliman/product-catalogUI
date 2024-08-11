import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ProductList from './components/Products/ProductList';
import { Layout } from './components/Layout/Layout';
import { AlertProvider } from './contexts/AlertContext';
import CategoriesDashboard from './components/Categories/CategoriesDashboard';
import { CategoriesList } from './components/Categories/CategoriesList';

const App: React.FC = () => {
  return (
    <AlertProvider>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CategoriesDashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/categories" element={<CategoriesList />} />
        </Routes>
      </Layout>
    </Router>
  </AlertProvider>
  );
};

export default App;
