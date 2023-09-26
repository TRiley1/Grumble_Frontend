import Avatar from "avataaars";

const ProfilePic = ({
  avatarStyle, 
  topType, 
  accessoriesType,
  hairColor,
  facialHairType,
  facialHairColor,
  clotheType,
  clotheColor,
  eyeType,
  eyebrowType,
  mouthType,
  skinColor,
  graphicType,
  size
}) => {
  // Define the size you want for the avatar
  const avatarSize = size; // Adjust the size as needed

  return ( 
    <Avatar
      avatarStyle={avatarStyle}
      topType={topType}
      accessoriesType={accessoriesType}
      hairColor={hairColor}
      facialHairType={facialHairType}
      facialHairColor={facialHairColor}
      clotheType={clotheType}
      clotheColor={clotheColor}
      graphicType={graphicType}
      eyeType={eyeType}
      eyebrowType={eyebrowType}
      mouthType={mouthType}
      skinColor={skinColor}
      // Apply inline styles to set the size
      style={{ width: avatarSize, height: avatarSize }}
    />
  );
}
 
export default ProfilePic;


