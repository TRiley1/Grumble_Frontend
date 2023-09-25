import React, { useState } from "react";
import ProfilePic from "../../icons/ProfilePic";
import './EditProfile.css'
import Navbar from "../navbar/Navbar";

const EditProfile = () => {
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

  const [formData, setFormData] = useState({
    skinColor: "Tanned",
    avatarStyle: "Circle",
    clotheColor: "Black",
    clothes: "Overall",
    accessories: "Blank",
    hair: "ShortHairShortCurly",
    accessoriesType: "Kurt",
    hairColor: "Black",
    facialHairColor: "Black",
    facialHair: "MoustacheFancy",
    eyeType: "Default",
    eyebrowType: "Default",
    mouthType: "Default",
  });
  
  

  const handleChange = (e) => {
    console.log("handleChange called");
    const { name, value } = e.target;
    console.log(name,value)
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
    <Navbar/>
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

      <h2>Edit Profile</h2>
      <div className="form-grid">
        <form className="form" onSubmit={handleSubmit}>
            {Object.keys(options).map((optionKey) =>
            renderSelectInput(
                optionKey,
                optionKey,
                options[optionKey]
            )
            )}
            <button type="submit">Save</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default EditProfile;
