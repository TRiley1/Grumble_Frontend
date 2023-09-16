import React, { useState, useEffect } from "react";
import GrumbleList from "../GrumbleList";
import './Home.css'

const Home = ({ username, authToken }) => {
  const [grumbles, setGrumbles] = useState([]);

  useEffect(() => {
    getGrumbles();
  }, []);

  const grumbleUrl = 'http://localhost:8080/grumbles';

  const getGrumbles = () => {
    fetch(grumbleUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + authToken,
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



  return (

    <>
    <div class = "home-container">
        <div class = "grumble-feed">
            <h1>Welcome {username}</h1>
            <GrumbleList grumbles = {grumbles}/>
        </div>
    </div>
  </>
  );
};

export default Home;
