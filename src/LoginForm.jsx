import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './LoginForm.css'; 

function LoginForm() {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ gmail, password })
      });

      if (response.ok) {
        // Get user data from the response
        const userData = await response.json();

        // Store user info in local storage
        localStorage.setItem('userRole', userData.role);
        localStorage.setItem('username', userData.username);
        
        // Use navigate to redirect to the store page
        navigate("/store");

      } else {
        alert("Login Failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert("An error occurred. Could not connect to the server.");
    }
  };

  // This is the single, correct return statement for your component
  return (
    <div className="background">
      <div className="bubbles">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} style={{ '--i': i + 1 }}></span>
        ))}
      </div>

      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Log In</h2>
          <input
            type="email"
            placeholder="Gmail"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button type="submit">Log In</button>
        </form>
        <div className="signup-box">
          <p>Don't have an account? <a href="/register">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;