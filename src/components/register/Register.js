import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';


const Register = () => {

    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });

    const navigate = useNavigate();
  
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
        const response = await fetch('http://localhost:8080/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          navigate("/")
          console.log('Registration successful');
        } else {
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div className='container'>
        <div class = "login-card">
          <div class = "login-card-header"></div>
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
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
 
export default Register;