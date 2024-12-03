import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadCart, removeItem, modifyQuantity } from '../redux/cartAction';
import "../styles/CartPage.css";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem('email');

  // Move fetchCartFromServer outside of useEffect
  useEffect(() => {
    const fetchCartFromServer = async () => {
      if (token) {
        try {
          const response = await fetch('http://localhost:3001/api/cart', {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          const data = await response.json();
          if (data.cart) {
            dispatch(loadCart(data.cart)); 
            localStorage.setItem(`cart-${userEmail}`, JSON.stringify(data.cart)); 
          }
        } catch (error) {
          console.error('Error fetching cart from server:', error);
        }
      }
    };
  
    if (userEmail) {
      const storedCart = localStorage.getItem(`cart-${userEmail}`);
      if (storedCart) {
        dispatch(loadCart(JSON.parse(storedCart))); 
      } else {
        fetchCartFromServer();
      }
    }
  }, [dispatch, userEmail, token]);

  const handleRemoveItem = (id, selectedOption) => {
    dispatch(removeItem({ id, selectedOption }));

    const updatedCart = cart.filter(
      (item) => item.id !== id || item.selectedOption !== selectedOption
    );

    if (updatedCart.length === 0) {
      localStorage.removeItem(`cart-${userEmail}`);
    } else {
      localStorage.setItem(`cart-${userEmail}`, JSON.stringify(updatedCart));
    }
  };

  const handleQuantityChange = (id, selectedOption, quantity) => {
    const item = cart.find(
      (item) => item.id === id && item.selectedOption === selectedOption
    );

    if (item) {
      const maxQuantity = item.selectableOptions?.find(
        (opt) => opt.value === selectedOption
      )?.quantity || Infinity;

      if (quantity > maxQuantity) {
        alert(`Only ${maxQuantity} items available for ${item.name} (${selectedOption}).`);
        return;
      }
    }

    if (quantity > 0) {
      dispatch(modifyQuantity(id, selectedOption, quantity));
      saveCartToLocalStorage(); 
    } else {
      alert("Quantity must be at least 1.");
    }
  };

  const saveCartToLocalStorage = () => {
    if (userEmail) {
      localStorage.setItem(`cart-${userEmail}`, JSON.stringify(cart));
    }
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (!token) {
    return (
      <div className="cart-page not-logged-in">
        <h2>Your Cart</h2>
        <p>You are not logged in. Want to <span className="link" onClick={() => navigate("/login")}>Log In</span> or <span className="link" onClick={() => navigate("/signup")}>Sign Up</span>?</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart-message">
          <span className="sad-face">😔</span>
          <p>Your cart is empty!</p>
          <button
            className="empty-cart-back-btn"
            onClick={() => navigate('/catalog')}
          >
            Back to Catalog
          </button>
        </div>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id + item.selectedOption} className="cart-item">
              <img src={item.image_url || '/default-image.jpg'} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3 className="item-title">{item.name}</h3>
                <p className="item-cost">Cost: ${item.price}</p>
                <p className="item-type">Category: {item.category}</p>
                {item.selectedOption && (
                  <p className="item-option">Option: <strong>{item.selectedOption}</strong></p>
                )}

                <div className="quantity-container">
                  <span>Amount:</span>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item.id, item.selectedOption, item.quantity - 1)}>-</button>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(item.id, item.selectedOption, parseInt(e.target.value))}
                    />
                    <button onClick={() => handleQuantityChange(item.id, item.selectedOption, item.quantity + 1)}>+</button>
                  </div>
                </div>
              </div>
              <button className="remove-button" onClick={() => handleRemoveItem(item.id, item.selectedOption)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <p>Total amount: <strong>${calculateTotalAmount()}</strong></p>
        <button className="checkout-button" onClick={() => navigate('/checkout')}>Continue</button>
      </div>
    </div>
  );
};

export default CartPage;
