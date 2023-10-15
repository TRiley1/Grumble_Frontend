import GrumbleInteractionCard from "../grumble/GrumbleInteractionCard"

const LikedGrumbles = ({userProfile, type}) => {

    let likedGrumbles = ""

    if (type === "like") {
        likedGrumbles = userProfile?.likedGrumbles
    }
    else if (type === "your") {
        likedGrumbles = userProfile?.grumbles
    }
    else {
        likedGrumbles = userProfile?.dislikedGrumbles
    }


    // render a list of the users liked grumbles. 
    const renderLikedGrumbles = (arrGrumbles) => {
    return arrGrumbles? 
      arrGrumbles.map((grumble, index) => {
        return <GrumbleInteractionCard key = {index} grumble = {grumble}/> 
      }) :
      "You have not agreed with any Grumbles"
    }

    return ( 
        <div>
            {renderLikedGrumbles(likedGrumbles)}
        </div>
     );
}
 
export default LikedGrumbles;