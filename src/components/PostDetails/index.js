import React, { useState, useEffect } from 'react';
import './PostDetails.css';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaArrowUp } from 'react-icons/fa';
import { likePost } from '../../redux/actions/likePost';
import { addComment, addReply } from '../../redux/actions/commentActions';
import Comment from '../Comment';

const PostDetails = ({ likePost, addComment, addReply }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState('');
  const { user_id, postId } = useParams();

  const fetchPostDetails = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/get_post?post_id=${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "69420",
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch post details');
      }

      const data = await response.json();
      
      setPost(data.post); 
      setComments(data?.comments); 
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [postId]);

  const handleCommentSubmit = async (content, parentId = null) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/create_comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: post.id,
          parent_id: parentId,
          user_id: user_id, 
          content: content,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error creating comment/reply: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      const newItem = {
        id: data.id,
        text: data.content,
        replies: [],
        created_at: data.created_at,
      };
  
      if (parentId) {
        addReply(parentId, newItem);
      } else {
        addComment(newItem);
      }
      setNewComment('');
      fetchPostDetails();
    } catch (error) {
      console.error('Error creating comment/reply:', error);
    }
  };
  
  const handleLikeClick = async() => {
    await likePost(post.id);
    fetchPostDetails();
  };

  return (
    <div className="post-details-container">
      <div>@{post?.user_name}</div>
      <h1 className="post-details-title">{post?.title}</h1>
      <p className="post-details-text">{post?.content}</p>
      <div className="post-actions">
        <FaArrowUp onClick={handleLikeClick} className="upvote-icon" />
        <p className="upvotes-count">{post?.likes_count} upvotes</p>
      </div>
      <hr />
      <div>Comments:</div>
      <div className="initial-comment-container">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="What are your thoughts?"
        />
        <button className="button" onClick={() => handleCommentSubmit(newComment, null)}>
          Submit Comment
        </button>
      </div>
      <div className="comments-container">
        {comments?.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            content={comment.content}
            children={comment.children}
            parent_id={comment.parent_id}
            onReplySubmit={handleCommentSubmit}
            created_at={comment.created_at}
            user={comment.user_name}
            refetch={fetchPostDetails} 
          />
        ))}
      </div>
    </div>
  );
};

export default connect(null, { likePost, addComment, addReply })(PostDetails);
