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
  graphicType
}) => {
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
    />
  );
}
 
export default ProfilePic;

