import React, { useState, useEffect } from "react";
import GrumbleList from "../grumble/GrumbleList";
import "./Home.css";
import GrumblePost from "../grumblePost/GrumblePost";
import Navbar from "../navbar/Navbar";
import ProfilePic from "../../icons/ProfilePic";
import Edit from "../../icons/Edit";
import { Link } from "react-router-dom";

const Home = ({ username, authToken }) => {
  const [grumbles, setGrumbles] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    getUserProfile();
    getGrumbles();
  }, []);

  useEffect(() => {
    getGrumbles();
  }, [grumbles]);

  console.log(userProfile);

  const grumbleUrl = "http://localhost:8080/grumbles";
  const addGrumbleUrl = "http://localhost:8080/grumbles/add";
  const userUrl = `http://localhost:8080/users/${username}`;

  const accessToken = `Bearer ${authToken}`;

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
        />
      );
    } else {
      return <div>Loading...</div>;
    }
  };

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
          console.log("Grumble successfully posted");
        } else {
          response.text().then((errorText) => {
            console.error("Failed to post grumble. Error:", errorText);
          });
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
          {renderUserProfile()}
          <Link to="/edit" state={{ userProfile }}>
            <button>
              <Edit/>
            </button>
          </Link>
        </div>
        <div className="grumble-feed">
          <h1>Welcome {username}</h1>
          <GrumblePost onPost={onPost} username={username} />
          <GrumbleList
            grumbles={grumbles}
            authToken={authToken}
            username={username}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
