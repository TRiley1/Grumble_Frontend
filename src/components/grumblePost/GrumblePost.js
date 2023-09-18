import React, { useState } from 'react';
import './GrumblePost.css';

const MessagePost = ({ onPost, username }) => {
  const [grumble, setGrumble] = useState('');

  const handlePostMessage = () => {
    // create a object identical to the grumble structure in home
    const newGrumble = {
      "username" : username,
      "content" : grumble
    };

    onPost(newGrumble);

    setGrumble('');
  };

  return (
    <div className="message-post">
      <textarea
        placeholder="What's on your mind?"
        value={grumble}
        onChange={(e) => setGrumble(e.target.value)}
      />
      <button onClick={handlePostMessage}>Post</button>
    </div>
  );
};

export default MessagePost;
