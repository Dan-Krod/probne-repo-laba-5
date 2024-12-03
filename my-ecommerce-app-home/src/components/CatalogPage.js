import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CatalogFilters from './CatalogFilters';
import CatalogItem from './CatalogItem';
import ItemPage from './ItemPage';
import { fetchProducts } from '../api'; 
import Loader from './Loader'; 
import '../styles/Catalog.css';

const CatalogPage = ({ searchTerm, setSearchTerm }) => {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortCriteria, setSortCriteria] = useState(''); 
  const [sortOrder, setSortOrder] = useState('asc'); 
  const navigate = useNavigate();

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProducts(selectedCategory, searchTerm, sortCriteria, sortOrder);
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Помилка завантаження продуктів:', error);
      setLoading(false);
    }
  }, [selectedCategory, searchTerm, sortCriteria, sortOrder]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]); 

  const handleFilterChange = useCallback(() => {
    let updatedProducts = [...products];

    if (selectedCategory) {
      updatedProducts = updatedProducts.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      updatedProducts = updatedProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  }, [products, selectedCategory, searchTerm]);

  useEffect(() => {
    handleFilterChange();
  }, [selectedCategory, searchTerm, handleFilterChange]);

  const resetFilters = () => {
    setSelectedCategory('');
    setSearchTerm('');
    setSortCriteria('');
    setSortOrder('asc');
    setFilteredProducts(products);
  };

  const viewProductDetails = (product) => {
    navigate(`/item/${product.id}`, { state: { product } });
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <div className="catalog">
            {loading ? (
              <Loader /> 
            ) : (
              <>
                <CatalogFilters
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  sortCriteria={sortCriteria}
                  setSortCriteria={setSortCriteria}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  resetFilters={resetFilters} 
                />
                <div className="divider"></div>

                <div className="catalog-items">
                  {filteredProducts.map((product) => (
                    <CatalogItem key={product.id} product={product} onViewDetails={viewProductDetails} />
                  ))}
                </div>
              </>
            )}
          </div>
        } 
      />
      <Route path="/item/:id" element={<ItemPage products={products} />} />
    </Routes>
  );
};

export default CatalogPage;
