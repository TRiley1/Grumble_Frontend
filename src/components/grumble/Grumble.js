import './Grumble.css'

import React from 'react';
import './Grumble.css'; // Import the CSS file

const Grumble = ({ grumble }) => {


  const renderAgreementMessage = (grumble) => {
    const likingUsers = grumble.likingUsers;
  
    if (likingUsers.length === 0) {
      return null;
    } else if (likingUsers.length === 1) {
      return <h3>{`${likingUsers[0].username} likes this`}</h3>;
    } else if (likingUsers.length === 2) {
      return (
        <h3>{`${likingUsers[0].username} & ${likingUsers[1].username} agree`}</h3>
      );
    } else {
      return <h3>{`${likingUsers[0].username} & ${likingUsers.length - 1} others agree`}</h3>;
    }
  };
  

  return (
    <div className="grumble-container">
      <h2 className="grumble-username">{grumble.user.username}</h2>
      <p className="grumble-text">{grumble.grumble}</p>
      {renderAgreementMessage(grumble)}
      <div className="button-container">
        <button className="like-button">Like</button>
        <button className="dislike-button">Dislike</button>
      </div>
    </div>
  );
};

export default Grumble;
