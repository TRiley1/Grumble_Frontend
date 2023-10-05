import React, { useState } from 'react';
import './GrumblePost.css';

const MessagePost = ({ onPost, username }) => {
  const [grumble, setGrumble] = useState({
    "subject" : "",
    "content" : ""
  });


  const handlePostMessage = () => {
    // create a object identical to the grumble structure in home
    const newGrumble = {
      "username" : username,
      "content" : grumble.content,
      "subject" : grumble.subject
    };

    onPost(newGrumble);

    setGrumble('');
  };

  return (
    <div className="message-post">
      <textarea placeholder = "Grumble Subject"
      value = {grumble.subject}
      onChange={(e) => setGrumble({...grumble, subject : e.target.value})}
      >
      
      </textarea>
      <textarea
        placeholder="What's on your mind?"
        value={grumble.content}
        onChange={(e) => setGrumble({...grumble, content : e.target.value})}
      />
      <button onClick={handlePostMessage}>Grumble</button>
    </div>
  );
};

export default MessagePost;
