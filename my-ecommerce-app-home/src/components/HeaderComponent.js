import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/HeaderComponent.css'; 
import Navigation from './NavigationComponent'; 

const Header = ({ searchTerm, setSearchTerm }) => {
  const location = useLocation();

  const isCatalogPage = location.pathname === '/catalog' || location.pathname.startsWith('/item');
  
  let pageTitle = 'Home Page';
  if (location.pathname === '/catalog') {
    pageTitle = 'Catalog Page';
  } else if (location.pathname.startsWith('/item')) {
    pageTitle = 'Item Page';
  } else if (location.pathname.startsWith('/cart')) {
    pageTitle = 'Cart Page'
  }

  return (
    <header className="header">
      <div className="page-title">
        <h2>{pageTitle}</h2>
        <hr className='header-divider' />
      </div>
      <div className="header-container">
        <div className="logo-container">
          <img src="/logo-3.png" alt="Logo" className="logo-img" />
          <h1 className="logo-text">World of books</h1> 
        </div>

        {isCatalogPage && (
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        )}
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
