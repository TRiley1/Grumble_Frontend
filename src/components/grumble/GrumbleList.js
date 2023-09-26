import Grumble from "./Grumble"
import './GrumbleList.css'
import React, { useState, useEffect } from 'react';
import ProfilePic from "../../icons/ProfilePic";

const GrumbleList = ({grumbles, authToken, username, userProfile}) => {

    const [noOfMessages, setNoOfMessages] = useState(5);
    const [isActive, setisActive] = useState('all');

    

    useEffect(()=>{
        setNoOfMessages(5);
        grumbleNodes(grumbles, noOfMessages, isActive);
    }, [isActive])

    const grumbleFilter = (arr, isActive) => {
        if (isActive === 'all'){
            return arr;
        }
        else{
            const result = arr.filter(el => el.approval === isActive)
            return result;
        } 
    }



    const grumbleNodes = (arr, num, isActive) => {
        const grumbles = [];
        const filterGrumbles = grumbleFilter(arr, isActive)
        for(let grumble of filterGrumbles){
            const item = <Grumble grumble = {grumble} authToken = {authToken} username = {username} key = {grumble.id} userProfile = {userProfile} />
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
            <div className = "grumble-filter-tabs">
                <button onClick={()=> setisActive("Pending Approval")}>Pending</button>
                <button onClick={()=> setisActive("Valid")}>Valid</button>
                <button onClick={()=> setisActive("Invalid")}>Invalid</button>
            </div>   
            <div className = "grumble-list-container">
                {grumbleNodes(grumbles, noOfMessages, isActive)}
            </div>
            <div className="show-more-button">
                <button onClick={handleClick}>Show More!</button>
            </div>
        </>
     );
}
 
export default GrumbleList;