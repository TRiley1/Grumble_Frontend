import Grumble from "./Grumble"
import './GrumbleList.css'
import React, { useState } from 'react';


const GrumbleList = ({grumbles, authToken, username}) => {

    const [noOfMessages, setNoOfMessages] = useState(5);

    const grumbleNodes = (arr, num) => {
        const grumbles = [];
        for(let grumble of arr){
            const item = <Grumble grumble = {grumble} authToken = {authToken} username = {username} key = {grumble.id} />
            grumbles.unshift(item);
        }
        const feed = grumbles.slice(0,num)
        return feed
    }

    const handleClick = () => {
        setNoOfMessages(prev => prev + 5)
    }


    return ( 
        <>
            <div className = "grumble-list-container">
                {grumbleNodes(grumbles, noOfMessages)}
            </div>
            <div className="show-more-button">
                <button onClick={handleClick}>Show More!</button>
            </div>
        </>
     );
}
 
export default GrumbleList;