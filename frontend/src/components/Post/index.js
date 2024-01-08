import React from 'react';
import { connect } from 'react-redux';
import { likePost } from '../../redux/actions/likePost';
import { FaArrowUp, FaComments } from 'react-icons/fa';
import './Post.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const Post = ({ refetch, post, likePost }) => {
  const navigate = useNavigate();
  const {user_id} = useParams();
  const handleLikeClick = async(e) => {
    e.stopPropagation(); 
    await likePost(post.id);
    refetch();
  };

  const handlePostClick = () => {
    navigate(`/user_id/${user_id}/post/${post.id}`);
  };
  console.log(post);

  return (
    <div className="post-container" onClick={handlePostClick}>
      <p className="post-created-at">@{post.user_name}</p>
      <p className="post-title">{post.title}</p>
      <p className="post-text">{post.content}</p>
      <div className='post-actions'>
        <FaArrowUp onClick={handleLikeClick} className="upvote-icon" />
        <p className="upvotes-count">{post.likes_count} upvotes</p>
        <FaComments className="upvote-icon" />
        <p className="upvotes-count">view comments</p>
      </div>
      <p className="post-created-at">created at {post.created_at}</p>
    </div>
  );
};

export default connect(null, { likePost })(Post);

