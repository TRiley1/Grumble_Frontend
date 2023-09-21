import React, { useState, useEffect } from "react";
import "./Grumble.css";

const Grumble = ({ grumble, authToken, username }) => {
  const [approval, setApproval] = useState("Pending Approval");
  const [likesCount, setLikesCount] = useState(grumble.likingUsers.length);
  const [dislikesCount, setDislikesCount] = useState(grumble.dislikingUsers.length);

  useEffect(() => {
    // Check if the total votes reach the threshold
    if (likesCount + dislikesCount === 3) {
      if (likesCount > dislikesCount) {
        setApproval("Valid");
      } else {
        setApproval("Invalid");
      }
    }
  }, [likesCount, dislikesCount]);

  const renderMessage = (users, messagePrefix, verb) => {
    if (!users || users.length === 0) {
      return null;
    }

    const firstUser = users[0]?.username;

    if (users.length === 1) {
      return <h3>{`${firstUser} ${verb} this`}</h3>;
    } else if (users.length === 2) {
      const secondUser = users[1]?.username;
      return <h3>{`${firstUser} & ${secondUser} ${messagePrefix}`}</h3>;
    } else {
      return (
        <h3>{`${firstUser} & ${users.length - 1} others ${messagePrefix}`}</h3>
      );
    }
  };

  const handleLikeDislikeClick = (likeType) => {
    // Check if the grumble is still in "Pending Approval" status
    if (approval === "Pending Approval") {
      const body = {
        id: grumble.id,
        username: username,
      };

      const apiUrl =
        likeType === "like"
          ? "http://localhost:8080/grumbles/like"
          : "http://localhost:8080/grumbles/dislike";

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(
            `${
              likeType.charAt(0).toUpperCase() + likeType.slice(1)
            }d successfully:`,
            data
          );

          // Update likes and dislikes count based on the backend response
          if (likeType === "like") {
            setLikesCount(prev => prev + 1);
          } else {
            setDislikesCount(prev => prev + 1);
          }
        })
        .catch((error) => {
          console.error(`Error ${likeType}ing grumble:`, error);
        });
    }
  };

  return (
    <div className={`grumble-container ${approval.toLowerCase()}`}>
      <div className="grumble-header">
        <h2 className="grumble-username">{grumble.user.username}</h2>
        <h2>{approval}</h2>
      </div>
      <p className="grumble-text">{grumble.grumble}</p>
      {renderMessage(grumble.likingUsers, "agree", "likes")}
      {renderMessage(grumble.dislikingUsers, "disagree", "dislikes")}
      {approval === "Pending Approval" ? (
        <div className="button-container">
          <button
            className="like-button"
            onClick={() => handleLikeDislikeClick("like")}
          >
            Like
          </button>
          <button
            className="dislike-button"
            onClick={() => handleLikeDislikeClick("dislike")}
          >
            Dislike
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Grumble;
