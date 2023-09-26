import React, { useEffect, useState } from "react";
import ProfilePic from "../../icons/ProfilePic";
import "./EditProfile.css";
import Navbar from "../navbar/Navbar";
import { Location, useLocation } from "react-router-dom";

const EditProfile = ({username, authToken}) => {

  const location = useLocation();
  const userProfile = location.state.userProfile;
  
  const options = {
    skinColor: {
      Tanned: "Tanned",
      Yellow: "Yellow",
      Pale: "Pale",
      "Light Brown": "Light Brown",
      Brown: "Brown",
      "Dark Brown": "Dark Brown",
      Black: "Black",
    },
    avatarStyle: { Circle: "circle" },
    clotheColor: {
      Black: "Black",
      Blue01: "Blue01",
      Blue02: "Blue02",
      Blue03: "Blue03",
      Gray01: "Gray01",
      Gray02: "Gray02",
      Heather: "Heather",
      PastelBlue: "PastelBlue",
      PastelGreen: "PastelGreen",
      PastelOrange: "PastelOrange",
      PastelYellow: "PastelYellow",
      Pink: "Pink",
    },
    accessories: {
      Blank: "Blank",
      Kurt: "Kurt",
      Prescription01: "Prescription01",
      Prescription02: "Prescription02",
      Round: "Round",
      Sunglasses: "Sunglasses",
    },
    clothes: {
      BlazerShirt: "BlazerShirt",
      BlazerSweater: "BlazerSweater",
      CollarSweater: "CollarSweater",
      GraphicShirt: "GraphicShirt",
      Hoodie: "Hoodie",
      Overall: "Overall",
      ShirtCrewNeck: "ShirtCrewNeck",
    },
    eyeType: {
      Cry: "Cry",
      EyeRoll: "EyeRoll",
      Side: "Side",
      Squint: "Squint",
      Surprised: "Surprised",
    },
    eyebrowType: {
      Angry: "Angry",
      AngryNatural: "AngryNatural",
      Default: "Default",
    },
    facialHair: {
      Blank: "Blank",
      BeardMedium: "BeardMedium",
      BeardLight: "BeardLight",
      BeardMajestic: "BeardMajestic",
      Moustache: "MoustacheFancy",
    },
    facialHairColor: {
      Auburn: "Auburn",
      Black: "Black",
      Blonde: "Blonde",
    },
    hair: {
      Bald: "NoHair",
      Eyepatch: "Eyepatch",
      LongHairBigHair: "LongHairBigHair",
      LongHairBob: "LongHairBob",
      LongHairBun: "LongHairBun",
      LongHairShavedSides: "LongHairShavedSides",
      LongHairMiaWallace: "LongHairMiaWallace",
      ShortHairMullet: "ShortHairShaggyMullet",
      ShortHairCurly: "ShortHairCurly",
      ShortHairShortFlat: "ShortHairShortFlat",
      ShortHairSides: "ShortHairSides",
      ShortHairShortCurly: "ShortHairShortCurly",
    },
    hairColor: {
      Auburn: "Auburn",
      Black: "Black",
      Blonde: "Blonde",
      Brown: "Brown",
    },
    mouthType: {
      Disbelief: "Disbelief",
      Grimace: "Grimace",
      Serious: "Serious",
      Vomit: "Vomit",
      ScreamOpen: "ScreamOpen",
    },
  };

  const user = userProfile?.userProfile?.avatarConfig;
  

  const [formData, setFormData] = useState({
    skinColor: user?.skinColor,
    avatarStyle: user?.avatarStyle,
    clotheColor: user?.clotheColor,
    clothes: user?.clotheType,
    hair: user?.topType,
    accessories: user?.accessoriesType,
    hairColor: user?.hairColor,
    facialHairColor: user?.facialHairColor,
    facialHair: user?.facialHairType,
    eyeType: user?.eyeType,
    eyebrowType: user?.eyebrowType,
    mouthType: user?.mouthType,
  });

  const handleChange = (e) => {
    console.log("handleChange called");
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
    console.log(formData)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      accesscoriesType: formData.accessories, 
      avatarStyle: formData.avatarStyle,
      clotheColour: formData.clotheColor,
      clotheType: formData.clothes,
      eyeType: formData.eyeType,
      eyebrowType: formData.eyebrowType,
      facialHairColour: formData.facialHairColor,
      facialHairType: formData.facialHair,
      hairColour: formData.hairColor,
      mouthType: formData.mouthType,
      skinColour: formData.skinColor,
      hair: formData.hair,
    };

    const url = `http://localhost:8080/users/${username}`

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    .then((response) => {
      if (response.ok) {
        console.log("Profile successfully edited");
      } else {
        response.text().then((errorText) => {
          console.error("Failed to edit. Error:", errorText);
        });
      }
    })
  };

  const renderSelectInput = (label, name, options) => {
    return (
      <div key={name}>
        <label htmlFor={name}>{label}:</label>
        <select name={name} value={formData[name]} onChange={handleChange}>
          {Object.keys(options).map((key) => (
            <option key={key} value={key}>
              {options[key]}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="edit-container">
        <ProfilePic
          avatarStyle={formData.avatarStyle}
          topType={formData.hair}
          accessoriesType={formData.accessories}
          hairColor={formData.hairColor}
          facialHairType={formData.facialHair}
          facialHairColor={formData.facialHairColor}
          clotheType={formData.clothes}
          clotheColor={formData.clotheColor}
          eyeType={formData.eyeType}
          eyebrowType={formData.eyebrowType}
          mouthType={formData.mouthType}
          skinColor={formData.skinColor}
          className="profile-pic"
        />
        <div className="form-grid">
          <form className="form" onSubmit={handleSubmit}>
            {Object.keys(options).map((optionKey) =>
              renderSelectInput(optionKey, optionKey, options[optionKey])
            )}
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
