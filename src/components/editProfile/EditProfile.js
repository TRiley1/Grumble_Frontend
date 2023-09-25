import React, { useState } from "react";
import ProfilePic from "../../icons/ProfilePic";

const EditProfile = () => {
    const options = {
        "skin colour": {
          Tanned: "Tanned",
          Yellow: "Yellow",
          Pale: "Pale",
          "Light Brown": "Light Brown",
          Brown: "Brown",
          "Dark Brown": "Dark Brown",
          Black: "Black",
        },
        "avatar style" : {"circle": "circle"},
        "clothe color" : {
            Black : "Black",
            Blue01 : "Blue01",
            Blue02 : "Blue02",
            Blue03 : "Blue03",
            Gray01 : "Gray01",
            Gray02 : "Gray02",
            Heather : "Heather", 
            PastelBlue : "PastelBlue",
            PastelGreen : "PastelGreen", 
            PastelOrange : "PastelOrange",
            PastelYellow : "PastelYellow",
            Pink : "Pink"
        },
        "accessories" : {
            Blank : "Blank",
            Kurt : "Kurt", 
            Prescription01 : "Prescription01",
            Prescription02 : "Prescription02",
            Round : "Round",
            Sunglasses : "Sunglasses"
        },
        "Clothes" : {
            BlazerShirt : "BlazerShirt",
            BlazerSweater : "BlazerSweater",
            CollarSweater : "CollarSweater",
            GraphicShirt : "GraphicShirt",
            Hoodie : "Hoodie",
            Overall : "Overall",
            ShirtCrewNeck : "ShirtCrewNeck"
        },
        "EyeType" : {
            Cry : "Cry",
            EyeRoll : "EyeRoll",
            Side : "Side",
            Squint : "Squint",
            Surprised : "Surprised"
        },
        "EyebrowType" : {
            Angry : "Angry",
            AngryNatural : "AngryNatural",
            Default : "Default"
        },
        "FacialHair" : {
            Blank : "Blank",
            BeardMedium : "BeardMedium",
            BeardLight : "BeardLight",
            BeardMajestic : "BeardMajestic",
            Moustache : "MoustacheFancy"
        },
        "FacialHairColour" : {
            Auburn : "Auburn",
            Black : "Black",
            Blonde : "Blonde"
        },
        "Hair" : {
            "Bald" : "NoHair",
            "Eyepatch" : "Eyepatch",
            "LongHairBigHair" : "LongHairBigHair",
            "LongHairBob" : "LongHairBob",
            "LongHairBun" : "LongHairBun",
            "LongHairShavedSides" : "LongHairShavedSides",
            "LongHairMiaWallace" : "LongHairMiaWallace",
            "ShortHairMullet" : "ShortHairShaggyMullet",
            "ShortHairCurly" : "ShortHairCurly",
            "ShortHairShortFlat" : "ShortHairShortFlat",
            "ShortHairSides" : "ShortHairSides",
            "ShortHairShortCurly" : "ShortHairShortCurly"
        },
        "HairColour" : {
            "Auburn" : "Auburn",
            "Black" : "Black",
            "Blonde" : "Blonde",
            "Brown" : "Brown"
        },
        "MouthType" : {
            "Disbelief" : "Disbelief",
            "Grimace" : "Grimace", 
            "Serious" : "Serious",
            "Vomit" : "Vomit",
            "ScreamOpen" : "ScreamOpen"
        },
      };

  const [formData, setFormData] = useState({
    skinColor: 'Tanned',
    avatarStyle: 'circle',
    clotheColor: 'Black',
    clotheType : 'CollarSweater',
    accessories: 'Blank',
    topType : 'ShortHairShortCurly',
    accessoriesType : 'Kurt',
    hairColor : "hairColor",
    facialHairColor : "Black",
    facialHairType : "MoustacheFancy",
    eyeType : "EyeType",
    eyebrowType: "Default",
    mouthType : "Default"

    // Add more attributes and set default values if needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can submit the formData to your backend or perform other actions here
    console.log(formData);
  };

  return (
    <div>
        <ProfilePic
          avatarStyle={formData.avatarStyle}
          topType={formData.topType}
          accessoriesType={formData.accessoriesType}
          hairColor={formData.hairColor}
          facialHairType={formData.facialHairType}
          facialHairColor={formData.facialHairColor}
          clotheType={formData.clotheColor}
          clotheColor={formData.clotheColor}
          eyeType={formData.eyeType}
          eyebrowType={formData.eyebrowType}
          mouthType={formData.mouthType}
          skinColor={formData.skinColor}
        />
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="skinColor">Skin Color:</label>
          <select name="skinColor" value={formData.skinColor} onChange={handleChange}>
            {Object.keys(options['skin colour']).map((key) => (
              <option key={key} value={key}>
                {options['skin colour'][key]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="avatarStyle">Avatar Style:</label>
          <select name="avatarStyle" value={formData.avatarStyle} onChange={handleChange}>
            <option value="circle">Circle</option>
          </select>
        </div>
        {/* Repeat the above pattern for other attributes */}
        {/* For example, for clotheColor: */}
        <div>
          <label htmlFor="clotheColor">Clothe Color:</label>
          <select name="clotheColor" value={formData.clotheColor} onChange={handleChange}>
            {Object.keys(options['clothe color']).map((key) => (
              <option key={key} value={key}>
                {options['clothe color'][key]}
              </option>
            ))}
          </select>
        </div>
        {/* Add more attribute sections as needed */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
