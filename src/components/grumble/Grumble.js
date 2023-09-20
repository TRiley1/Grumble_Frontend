import React from 'react';
import './Grumble.css';

const Grumble = ({ grumble, authToken, username }) => {
  
  const renderMessage = (users, messagePrefix, verb) => {

    if (!users || users.length === 0) {
      return null;
    }

    const firstUser = users[0]?.username;

    if (users.length === 0) {
      return null;
    } else if (users.length === 1) {
      return <h3>{`${firstUser} ${verb} this`}</h3>;
    } else if (users.length === 2) {
      const secondUser = users[1]?.username;
      return <h3>{`${firstUser} & ${secondUser} ${messagePrefix}`}</h3>;
    } else {
      return <h3>{`${firstUser} & ${users.length - 1} others ${messagePrefix}`}</h3>;
    }
  };

  const handleClick = (grumble, authToken, username, likeType) => {
    const body = {
      id: grumble.id,
      username: username,
    };

    const apiUrl = likeType === 'like' ? 'http://localhost:8080/grumbles/like' : 'http://localhost:8080/grumbles/dislike';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(`${likeType.charAt(0).toUpperCase() + likeType.slice(1)}d successfully:`, data);
      })
      .catch((error) => {
        console.error(`Error ${likeType}ing grumble:`, error);
      });
  };

  return (
    <div className="grumble-container">
      <div className='grumble-header'>
        <h2 className="grumble-username">{grumble.user.username}</h2>
        <h2>Pending Approval...</h2>
      </div>
      <p className="grumble-text">{grumble.grumble}</p>
      {renderMessage(grumble.likingUsers, 'agree', 'likes')}
      {renderMessage(grumble.dislikingUsers, 'disagree', 'dislikes')}
      <div className="button-container">
        <button className="like-button" onClick={() => handleClick(grumble, authToken, username, 'like')}>Like</button>
        <button className="dislike-button" onClick={() => handleClick(grumble, authToken, username, 'dislike')}>Dislike</button>
      </div>
    </div>
  );
};

export default Grumble;


