import Grumble from "./Grumble"
import './GrumbleList.css'

const GrumbleList = ({grumbles}) => {

    const grumbleNode = 
        grumbles.map((grumble, id) => {
            return <Grumble grumble = {grumble} key = {id}/>
        })

    return ( 
        <div className = "grumble-list-container">
            {grumbleNode}
        </div>
        
     );
}
 
export default GrumbleList;