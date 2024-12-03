import React from 'react';
import '../styles/PrimaryButton.css';

const PrimaryButton = ({ label, onClick, className }) => {
    return (
        <button className={`primary-button ${className}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default PrimaryButton;
