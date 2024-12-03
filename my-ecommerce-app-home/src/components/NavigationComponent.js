import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../styles/NavigationComponent.css';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Перевіряємо, чи користувач залогінений
  const isLoggedIn = !!localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <nav className="navigation">
      <NavLink to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
        Home
      </NavLink>
      <NavLink 
        to="/catalog" 
        className={`nav-link ${(location.pathname === '/catalog' || location.pathname.startsWith('/item')) ? 'active' : ''}`}
      >
        Catalog
      </NavLink>
      <NavLink to="/cart" className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`}>
        Cart
      </NavLink>
      
      {/* Відображаємо Login та Sign Up, якщо користувач не залогінений */}
      {!isLoggedIn && (
        <>
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
          <NavLink to="/signup" className="nav-link">
            Sign Up
          </NavLink>
        </>
      )}

      {/* Відображаємо кнопку Log Out, якщо користувач залогінений */}
      {isLoggedIn && (
        <button onClick={handleLogout} className="nav-link logout-button">
          Sign Out
        </button>
      )}
    </nav>
  );
};

export default Navigation;
