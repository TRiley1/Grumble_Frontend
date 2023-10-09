import Grumble from "./Grumble";
import "./GrumbleList.css";
import React, { useState, useEffect } from "react";

const GrumbleList = ({ grumbles, authToken, username, setGrumbles }) => {

  // removes voted grumble
  const removeGrumble = (id) => {
    const updatedGrumbles = grumbleComponents.filter((el) => el.id !== id);
    setGrumbles(updatedGrumbles);
  };


  // filters voting grumble cards - filters pending approval and removes user interacted cards.
  const grumbleCards = (grumbles) => {
    const votingGrumbles = grumbles.filter(
      (el) =>
        el.approval === "Pending Approval" &&
        el.user.username !== username &&
        !el.likingUsers.some((user) => user.username === username) &&
        !el.dislikingUsers.some((user) => user.username === username)
    );
    return votingGrumbles.map((el, index) => (
      <Grumble
        key={index}
        grumble={el}
        username={username}
        authToken={authToken}
        removeGrumble = {removeGrumble}
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
