import React, { useState } from 'react';
import './JudgementBar.css'; 

const JudgementBar = ({ grumble, grumbleThreshold}) => {
    const likes = grumble.likingUsers.length;
    const dislikes = grumble.dislikingUsers.length;
    const total = likes + dislikes;
    const percentageLike = total === 0 ? 0 : (likes / total) * 100;

    const backgroundBarColour = () => {
        if (total === 0 ){
            return 'gray' 
        }
        else {
            return 'red'
        }
    }

    const barStyle = {
        backgroundImage: `linear-gradient(to right, green ${percentageLike}%, rgba(0, 0, 0, 0) 0%)`,
        height: '20px',
        width: '100%',
        borderRadius: '50px',
        backgroundColor: backgroundBarColour(),
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', // Add shadow
        // border: '1px solid black' // Add black outline
    };

    const [tooltip, setTooltip] = useState(false);

    const handleMouseEnter = () => {
        setTooltip(true);
    };

    const handleMouseLeave = () => {
        setTooltip(false);
    };

    const renderMessage = () => {
        if (total < grumbleThreshold){
            if (grumbleThreshold - total === 1){
                return <h3>{grumbleThreshold - total} vote till judgement</h3>
            }
            else {
               return <h3>{grumbleThreshold - total} votes till judgement</h3>
            }
        }
        else {
            if (grumble.approval === 'Pending Approval') {
                return(
                    <div>
                        <h3>Judgement Threshold has been met...</h3>
                        <h3>Awaiting a majority vote...</h3>
                    </div>
                    )
            }
            else{
                return(
                    <div>
                        <h3>Judgement Threshold has been met...</h3>
                        <h3>GRUMBLE IS {grumble.approval.toUpperCase()}</h3>
                    </div>
                    )
            }
        }
    }

    return (
        <div>
            <div className="bar-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="bar" style={barStyle}></div>
                {tooltip && <div className="tooltip">{percentageLike.toFixed(2)}%</div>}
            </div>
            <div>
                {renderMessage()}
            </div>
        </div>
    );
};

export default JudgementBar;

