import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './GrumbleContainer.css';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import Home from '../components/home/Home';
import EditProfile from '../components/editProfile/EditProfile';

const GrumbleContainer = () => {
  const [authToken, setAuthToken] = useState('');
  const [username, setUsername] = useState('');
  

  const onLogin = (token,username) => {
    setAuthToken(token);
    setUsername(username);
  }

  return (
    <Router>
      <>
        <Routes>
          <Route 
            path="/register" 
            element = {<Register/>} 
            />
          <Route
            path="/"
            element = {<Login onLogin={onLogin}/>}
          />
          <Route
            path='/home'
            element={<Home username = {username} authToken = {authToken}/>}
           /> 
          <Route
            path='/edit'
            element={<EditProfile username = {username} authToken = {authToken}/>}
           /> 
        </Routes>
      </>
    </Router>
  );
}

export default GrumbleContainer;

