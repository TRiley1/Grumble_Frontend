import Login from "../components/Login";
import Register from "../components/Register";
import React, { useState } from 'react';


const GrumbleContainer = () => {
    const [authToken, setAuthToken] = useState('');
    console.log(authToken);

    const onLogin = (token) => {
        setAuthToken(token);
    }

    return (
        <>
            <h1>Hello Grumble</h1>
            <Register />
            <Login onLogin={onLogin} /> {/* Use 'onLogin' prop here */}
        </>
    );
}

export default GrumbleContainer;
