import React, { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent in the POST request
    const data = {
      username: formData.username,
      password: formData.password,
    };

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Login successful
        const responseBody = await response.json();
        console.log(responseBody)
        const { accessToken } = responseBody;

        // Call the onLogin function with the accessToken
        onLogin(accessToken, formData.username);
        navigate('/home')
        
        // You can now use this accessToken in your app's state or context
        console.log('Login successful. access Token:', accessToken);
      } else {
        // Login failed
        const errorResponse = await response.json();
        setError(errorResponse.message);
        console.error('Login failed:', errorResponse.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div class = 'login-card'>
    <div class = 'login-card-header'></div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
      <a href="/register">Register</a>
    </div>
  );
};

export default Login;
