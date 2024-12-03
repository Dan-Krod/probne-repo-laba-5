import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartAction';
import { fetchProductById } from '../api';
import "../styles/ItemPage.css";

const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 

  const isLoggedIn = !!localStorage.getItem("userEmail"); // Перевірка авторизації

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data); 
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };
    loadProduct();
  }, [id]);

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleQuantityChange = (e) => {
    const value = Math.min(e.target.value, product.selectableOptions.find(option => option.value === selectedOption)?.quantity);
    setQuantity(value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value) {
      setError(""); // Очищення повідомлення про помилку при виборі опції
    }
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("You need to log in to add items to the cart!");
      navigate("/login");
      return;
    }

    if (product.selectableOptions?.length > 0 && !selectedOption) {
      setError("Please select an option before adding to cart!");
      return;
    }

    const selectedOptionDetails = product.selectableOptions.find(option => option.value === selectedOption);
    if (selectedOptionDetails && quantity > selectedOptionDetails.quantity) {
      setError(`Only ${selectedOptionDetails.quantity} items available.`);
      return;
    }

    const itemToAdd = {
      ...product,
      quantity,
      selectedOption,
      maxQuantity: selectedOptionDetails?.quantity, 
    };
    dispatch(addItem(itemToAdd));

    setSuccessMessage(`"${product.name}" added to cart!`);
    setError(""); // Очищення помилок після успішного додавання до кошика

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const selectedOptionDetails = product.selectableOptions?.find(option => option.value === selectedOption);

  return (
    <div className="item-page">
      <div className="product-image-container">
        <img src={product.image_url ? `/${product.image_url}` : '/default.jpg'}  alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="description">{product.description}</p>
        <p className="category">Category: {product.category}</p>

        <div className="fields">
          <div className="field">
            <label>Amount</label>
            <input 
              type="number" 
              value={quantity} 
              onChange={handleQuantityChange} 
              min="1" 
              max={selectedOptionDetails?.quantity}  
              placeholder="1" 
            />
          </div>

          {product.selectableOptions?.length > 0 && (
            <div className="field">
              <label>Your choice?</label>
              <select value={selectedOption} onChange={handleOptionChange}>
                <option value="">Select</option>
                {product.selectableOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} - {option.quantity} available
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}

        {selectedOptionDetails && (
          <p className="availability-message">
            Available for selected option: {selectedOptionDetails.quantity} items
          </p>
        )}

        <div className="price-and-buttons">
          <p className="product-price">Price: ${product.price}</p>
          <div className="buttons">
            <button className="buy-button" onClick={handleAddToCart}>Add to Cart</button>
            <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
          </div>
        </div>
        
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
    </div>
  );
};

export default ItemPage;
