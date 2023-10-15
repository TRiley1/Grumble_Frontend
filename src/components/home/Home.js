import React, { useState, useEffect } from "react";
import GrumbleList from "../grumble/GrumbleList";
import "./Home.css";
import GrumblePost from "../grumblePost/GrumblePost";
import Navbar from "../navbar/Navbar";
import ProfilePic from "../../icons/ProfilePic";
import Edit from "../../icons/Edit";
import { Link } from "react-router-dom";
import LikedGrumbles from "../likeGrumbles/LikedGrumbles";

const Home = ({ username, authToken }) => {
  const [grumbles, setGrumbles] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    getUserProfile();
    getGrumbles();
  }, []);


  const grumbleUrl = "http://localhost:8080/grumbles";
  const addGrumbleUrl = "http://localhost:8080/grumbles/add";
  const userUrl = `http://localhost:8080/users/${username}`;

  const accessToken = `Bearer ${authToken}`;


  // fetchs user profile from db and sets it to username. 
  const getUserProfile = () => {
    fetch(userUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUserProfile(data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  const renderUserProfile = () => {
    if (userProfile) {
      const avatarConfig = userProfile.userProfile.avatarConfig;
      return (
        <ProfilePic
          avatarStyle={avatarConfig?.avatarStyle}
          topType={avatarConfig?.topType}
          accessoriesType={avatarConfig?.accessoriesType}
          hairColor={avatarConfig?.hairColor}
          facialHairType={avatarConfig?.facialHairType}
          facialHairColor={avatarConfig?.facialHairColor}
          clotheType={avatarConfig?.clotheType}
          clotheColor={avatarConfig?.clotheColor}
          eyeType={avatarConfig?.eyeType}
          eyebrowType={avatarConfig?.eyebrowType}
          mouthType={avatarConfig?.mouthType}
          skinColor={avatarConfig?.skinColor}
          size = '150px'
        />
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  // fetchs all grumbles from the db
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

  // onPost adds grumble to db and adds grumble plus res id to state
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
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log("Grumble successfully posted with ID:", data);
          setGrumbles([...grumbles, { ...grumble, id: data }]);
        } else {
          console.error("Response data does not contain ID.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  

  return (
    <>
      <div className="home-container">
        <Navbar />
        <div className="grumble-pic">
          <div className="profile-image">
          {renderUserProfile()}
          </div>
          <div className="grumble-user-edit">
            <Link to="/edit" state={{ userProfile }}>
            <button>
              <Edit/>
            </button>
            </Link>
          </div>
          <GrumblePost onPost={onPost} username={username} />
        </div>
        <div className="grumble-feed">
          <GrumbleList
            grumbles={grumbles}
            authToken={authToken}
            userProfile = {userProfile}
            setGrumbles = {setGrumbles}
          />
        </div>
        <h1>Liked Grumbles</h1>
        <div className="grumble-liked">
          <LikedGrumbles userProfile={userProfile} type = "like"/>
        </div>
        <h1>Disliked Grumbles</h1>
        <div className="grumble-disliked">
          <LikedGrumbles userProfile={userProfile} type = "dislike"/>
        </div>
        <h1>Your Grumbles</h1>
        <div className="grumble-disliked">
          <LikedGrumbles userProfile={userProfile} type = "your"/>
        </div>
      </div>
    </>
  );
};

export default Home;
