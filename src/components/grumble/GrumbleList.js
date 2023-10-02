import Grumble from "./Grumble";
import "./GrumbleList.css";
import React, { useState, useEffect } from "react";

const GrumbleList = ({ grumbles, authToken, username, userProfile }) => {

  // console.log(`The card number is ${cardNumber}`)


  // Need to filter out your own grumbles and grumbles you've liked or disliked already.

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
        userProfile={userProfile}
        authToken={authToken}
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
