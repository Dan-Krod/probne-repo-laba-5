import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/SignUpPage.css';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== retypePassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Зберігаємо email для користувача
        localStorage.setItem('userEmail', email);
        
        // Зберігаємо кошик для нового користувача
        localStorage.setItem(`cart-${email}`, JSON.stringify([]));

        // Якщо є токен, зберігаємо його
        if (data.token) {
          localStorage.setItem(`token-${email}`, data.token);
        }

        navigate('/login');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred during registration.');
    }
  };

  return (
    <div className="signup-page">
      <form onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Re-type Password"
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up</button>
        <p>
          Already a member? <span onClick={() => navigate("/login")} className="link">Log In</span>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
