import './Grumble.css'

import React from 'react';
import './Grumble.css'; // Import the CSS file

const Grumble = ({ grumble }) => {
  return (
    <div className="grumble-container">
      <h2 className="grumble-username">{grumble.user.username}</h2>
      <p className="grumble-text">{grumble.grumble}</p>
      <div className="button-container">
        <button className="like-button">Like</button>
        <button className="dislike-button">Dislike</button>
      </div>
    </div>
  );
};

export default Grumble;
