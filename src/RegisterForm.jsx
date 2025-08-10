import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

function RegisterForm() {
  const [user, setUser] = useState({
    username: '',
    gmail: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // --- CHANGE IS HERE ---
    // 1. Create a new object with all the user data from the form
    // 2. Add the 'role' property with a hardcoded value of 'customer'
    const userDataWithRole = {
      ...user, // This includes username, gmail, and password
      role: 'customer'
    };
    // --- END OF CHANGE ---

    const response = await fetch('http://localhost:8081/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Send the new object (with the role) to the backend
      body: JSON.stringify(userDataWithRole)
    });

    if (response.ok) {
      alert("Registration successful! Please log in.");
      navigate("/login");
    } else {
      alert("Registration failed");
    }
  };

  // Your JSX form does not need any changes
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="gmail"
          placeholder="Gmail"
          value={user.gmail}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;