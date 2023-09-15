import Login from "../components/login/Login";
import Register from "../components/Register";
import React, { useState } from 'react';
import './GrumbleContainer.css';

const GrumbleContainer = () => {
    const [authToken, setAuthToken] = useState('');
    console.log(authToken);

    const onLogin = (token) => {
        setAuthToken(token);
    }

    return (
        <>
            {/* <Register /> */}
            <Login onLogin={onLogin} /> {/* Use 'onLogin' prop here */}
        </>
    );
}

export default GrumbleContainer;
