import Grumble from "./Grumble"

const GrumbleList = ({grumbles}) => {

    const grumbleNode = 
        grumbles.map((grumble, id) => {
            return <Grumble grumble = {grumble} key = {id}/>
        })

    return ( 
        <div>
            {grumbleNode}
        </div>
        
     );
}
 
export default GrumbleList;