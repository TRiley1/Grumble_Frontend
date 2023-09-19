import React, { useState, useEffect } from "react";
import GrumbleList from "../grumble/GrumbleList";
import './Home.css'
import GrumblePost from "../grumblePost/GrumblePost";

const Home = ({ username, authToken }) => {
  const [grumbles, setGrumbles] = useState([]);

  useEffect(() => {
    getGrumbles();
  }, []);


  useEffect(() => {
    getGrumbles();
  }, [grumbles]);

  const grumbleUrl = 'http://localhost:8080/grumbles';
  const addGrumbleUrl = 'http://localhost:8080/grumbles/add';
  const accessToken = `Bearer ${authToken}`

  const getGrumbles = () => {
    fetch(grumbleUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGrumbles(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onPost = (grumble) => {
    fetch(addGrumbleUrl, {
      method: "POST",
      headers: {
        Authorization: accessToken, 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(grumble),
    })
    .then((response) => {
      if (response.ok) {
        console.log('Grumble successfully posted');
      } else {
        response.text().then((errorText) => {
          console.error('Failed to post grumble. Error:', errorText);
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };



  return (

    <>
    <div class = "home-container">
        <div class = "grumble-feed">
            <h1>Welcome {username}</h1>
            <GrumblePost onPost = {onPost} username = {username}/>
            <GrumbleList grumbles = {grumbles}/>
        </div>
    </div>
  </>
  );
};

export default Home;
