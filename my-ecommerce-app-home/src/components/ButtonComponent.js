import React from 'react';
import '../styles/ButtonComponent.css';

const Button = ({ label, onClick }) => {  
  return (
    <div className="view-more-button-container">
      <button className="view-more-button" onClick={onClick}>  
        {label}
      </button>
    </div>
  );
};

export default Button;


