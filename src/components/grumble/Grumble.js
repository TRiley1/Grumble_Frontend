import './Grumble.css'

import React from 'react';
import './Grumble.css'; // Import the CSS file

const Grumble = ({ grumble, authToken, username}) => {

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

  const handleLikeClick = (grumble, authToken, username ) => {
    const body = {
      id: grumble.id,
      username: username,
    };
  
    const likeURL = 'http://localhost:8080/grumbles/like';
  
    fetch(likeURL, {
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
        console.log('Liked successfully:', data);
      })
      .catch((error) => {
        console.error('Error liking grumble:', error);
      });
  };

   const handleDislikeClick = () => {

   }
  
  

  return (
    <div className="grumble-container">
      <div className='grumble-header'>
        <h2 className="grumble-username">{grumble.user.username}</h2>
        <h2>Pending Approval...</h2>
      </div>
      <p className="grumble-text">{grumble.grumble}</p>
      {renderAgreementMessage(grumble)}
      <div className="button-container">
        <button className="like-button" onClick={() => handleLikeClick(grumble, authToken, username)}>Like</button>
        <button className="dislike-button" onClick={handleDislikeClick}>Dislike</button>
      </div>
    </div>
  );
};

export default Grumble;
