import ProfilePic from "../../icons/ProfilePic"
import "./GrumbleInteractionCard.css"

const GrumbleInteractionCard = ({grumble}) => {
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
          size = "30px"
            />
          </div>
        )
    }

    return ( 
        <>
        <div className="grumble-interaction-card">
             {grumbleProfilePic()}
             {grumble.subject}
        </div>
        </>
     );
}
 
export default GrumbleInteractionCard;