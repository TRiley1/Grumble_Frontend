import Grumble from "./Grumble"
import './GrumbleList.css'

const GrumbleList = ({grumbles}) => {

    const grumbleNodes = (arr) => {
        const feed = [];
        for(let grumble of arr){
            const item = <Grumble grumble = {grumble} />
            feed.unshift(item);
        }
        return feed
    }


    return ( 
        <div className = "grumble-list-container">
            {grumbleNodes(grumbles)}
        </div>
        
     );
}
 
export default GrumbleList;