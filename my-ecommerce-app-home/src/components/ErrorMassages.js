// src/components/ErrorMessages.js
import React from 'react';
// import '../styles/ErrorMessages.css';

const ErrorMessages = ({ message }) => {
    if (!message) return null; // Не показувати нічого, якщо повідомлення порожнє

    return (
        <div className="error-message">
            {message}
        </div>
    );
};

export default ErrorMessages;
