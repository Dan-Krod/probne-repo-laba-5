import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import MainContent from './components/MainContent'; 
import CategoriesContainer from './components/CategoriesContainer';
import CatalogPage from './components/CatalogPage'; 
import ItemPage from './components/ItemPage'; 
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import SuccessPage from './components/SuccessPage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'; 

function App() {
  const location = useLocation(); 
  const [searchTerm, setSearchTerm] = useState(''); 

  const isCatalogPage = location.pathname === "/catalog"; 

  return (
    <div className="App">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} isCatalogPage={isCatalogPage} />
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            <>
              <MainContent />
              <CategoriesContainer />
            </>
          } 
        />

        <Route 
          path="/catalog" 
          element={<CatalogPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} 
        />

        {/* Public ItemPage */}
        <Route path="/item/:id" element={<ItemPage />} />

        {/* Public Cart Page */}
        <Route path="/cart" element={<CartPage />} />

        {/* Authentication Pages */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/success" 
          element={
            <ProtectedRoute>
              <SuccessPage />
            </ProtectedRoute>
          } 
        />

        {/* Redirect to Home */}
        <Route path="/home" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

const RootApp = () => (
    <Router>
      <App />
    </Router>
);

export default RootApp;
