import Grumble from "./Grumble";
import "./GrumbleList.css";
import React, { useState, useEffect } from "react";

const GrumbleList = ({ grumbles, authToken, userProfile, setGrumbles }) => {

  const username = userProfile?.username
  // removes voted grumble
  const removeGrumble = (id) => {
    const updatedGrumbles = grumbleComponents.filter((el) => el.id !== id);
    setGrumbles(updatedGrumbles);
  };


  // filters voting grumble cards - filters pending approval and removes user interacted cards.
  const grumbleCards = (grumbles) => {
    if (!userProfile || !userProfile.username) {
      return []; 
    }
  
    const votingGrumbles = grumbles.filter(
      (el) =>
        el.approval === "Pending Approval" &&
        el.user.username !== userProfile.username &&
        !el.likingUsers.some((user) => user.username === userProfile.username) &&
        !el.dislikingUsers.some((user) => user.username === userProfile.username)
    );
  
    return votingGrumbles.map((el, index) => (
      <Grumble
        key={index}
        grumble={el}
        username={userProfile.username}
        authToken={authToken}
        removeGrumble={removeGrumble}
      />
    ));
  };
  


  const grumbleComponents = grumbleCards(grumbles);
 
  return (
    
      <div>
        {grumbleComponents.length > 0
          ? grumbleComponents[0]
          : "No more grumbles to judge"}
      </div>

    
  );
};


export default GrumbleList;
