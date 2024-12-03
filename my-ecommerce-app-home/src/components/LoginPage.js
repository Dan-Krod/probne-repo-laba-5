import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Логування перед логіном
    console.log('Before login:', localStorage);
  
    if (!email || !password) {
      alert("Please fill in all fields!");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (data.token) {
        // Зберігаємо токен під унікальним email
        localStorage.setItem(`token-${email}`, data.token);
        localStorage.setItem('userEmail', email);
  
        // Зберігаємо кошик для цього користувача
        localStorage.setItem(`cart-${email}`, JSON.stringify([]));

        // Логування після успішного логіну
        console.log('After login:', localStorage);
  
        navigate("/"); // Перенаправляємо на головну
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <h2>Sign In</h2>
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
        <button type="submit">Log In</button>
        <p>
          Not a member? <span onClick={() => navigate("/signup")} className="link">Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
