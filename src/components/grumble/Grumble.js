import React, { useState, useEffect } from "react";
import "./Grumble.css";
import ProfilePic from "../../icons/ProfilePic";


const Grumble = ({ grumble, authToken, username, userProfile }) => {

  console.log(grumble.id)

  const [likesCount, setLikesCount] = useState(grumble.likingUsers.length);
  const [dislikesCount, setDislikesCount] = useState(grumble.dislikingUsers.length);
  
  // console.log(grumble)
  useEffect(() => {
    const totalVotes = likesCount + dislikesCount;
    const likesPercentage = totalVotes > 0 ? (likesCount / totalVotes) * 100 : 0;
    const dislikesPercentage = totalVotes > 0 ? (dislikesCount / totalVotes) * 100 : 0;

    if (totalVotes >= 3 && grumble.approval === "Pending Approval") {
      if (likesPercentage >= 65) {
        handleVerdict("Valid", grumble);
      } else if (dislikesPercentage >= 65) {
        handleVerdict("Invalid", grumble);
      }
    }
  }, [likesCount, dislikesCount, grumble]);

  

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

  const grumbleUser = grumble.user.userProfile.avatarConfig
  

  const grumbleProfilePic = () => {
    return (
      <div className="profile-pic-container">
        <ProfilePic
      avatarStyle={grumbleUser.avatarStyle}
      topType={grumbleUser.topType}
      accessoriesType={grumbleUser.accessoriesType}
      hairColor={grumbleUser.hairColor}
      facialHairType={grumbleUser.facialHairType}
      facialHairColor={grumbleUser.facialHairColor}
      clotheType={grumbleUser.clotheType}
      clotheColor={grumbleUser.clotheColor}
      eyeType={grumbleUser.eyeType}
      eyebrowType={grumbleUser.eyebrowType}
      mouthType={grumbleUser.mouthType}
      skinColor={grumbleUser.skinColor}
      size = "50px"
        />
      </div>
    )
}

  const handleVerdict = (approvalStatus, grumble) => {
    const verdictAPI = "http://localhost:8080/grumbles/verdict";
    const verdictBody = { grumbleID: grumble.id, verdict: approvalStatus };
    
    console.log(verdictBody)
    fetch(verdictAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(verdictBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Verdict submitted successfully:", data);
      })
      .catch((error) => {
        console.error("Error submitting verdict:", error);
      });
  };

  const handleLikeDislikeClick = (likeType) => {
    if (grumble.approval === "Pending Approval") {
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

  const approvalImageRenderer = (grumble) => {
    if(grumble.approval === "Pending Approval"){
      // return <h2>Pending Approval</h2>
      return <img className = "stamp-image" src="/images/pending.png" alt="pending pass stamp" />
    }
    else if (grumble.approval === "Valid") {
      return <img className = "stamp-image" src="/images/Pass stamp 02.png" alt="green pass stamp" />
    }
    else {
      return <img className = "stamp-image" src="/images/Rejected stamp 03.png" alt="red pass stamp" />
    }
  }

  return (
    <div>
      {grumble ? (
        <div className={`grumble-container ${grumble?.approval?.toLowerCase()}`}>
          <div>
            <div className="grumble-header">
              {grumbleProfilePic()}
              <div class = "grumble-name" style={{ flex: 2 }}>
                <h2 className="grumble-username">{grumble.user.username}</h2>
                <h3>professional grumbler</h3>
              </div>
              {approvalImageRenderer(grumble)}
            </div>
            <p className="grumble-text">{grumble.grumble}</p>
            {renderMessage(grumble.likingUsers, "agree", "likes")}
            {renderMessage(grumble.dislikingUsers, "disagree", "dislikes")}
            {grumble.approval === "Pending Approval" ? (
              <div className="button-container">
                <button
                  className="like-button"
                  onClick={() => handleLikeDislikeClick("like")}
                >
                  Agree
                </button>
                <button
                  className="dislike-button"
                  onClick={() => handleLikeDislikeClick("dislike")}
                >
                  Disagree
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div>No grumble data available</div>
      )}
    </div>
  );
  

}
export default Grumble;
