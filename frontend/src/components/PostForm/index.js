// components/PostForm.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../redux/actions/addPost';
import './PostForm.css';

const PostForm = ({ refetch,addPost, handleCloseModal, user_id }) => {
  const [postText, setPostText] = useState('');
  const [postTitle, setPostTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTime = new Date().toLocaleString();
    addPost(postTitle, postText, currentTime, user_id);
    refetch();
    setPostText('');
    setPostTitle('');
    handleCloseModal();
  };

  return (
    <div className="centered_rectangle">
      <div className="form-container">
        <div className="heading">Create a Post</div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input-field"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            label="title"
            placeholder="Title"
          />
          <textarea
            className="textarea-field"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Create Post"
          />
          <button className="submit-button" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { addPost })(PostForm);
