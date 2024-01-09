import React, { useState } from "react";
import "./Comment.css";
import { FaReply } from "react-icons/fa";

const Comment = ({
  id,
  content,
  children,
  onReplySubmit,
  created_at,
  depth,
  user, 
  refetch,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [reply, setReply] = useState(null);
  const containerClassName = `comment-container depth-${depth}`;
  const SubmitReplyHandle =()=>{
    onReplySubmit(reply, id);
    setShowReplyForm(!showReplyForm);
    setReply('');
    refetch();
  }
  return (
    <div className={containerClassName}>
      <div className="comment-text">
        <span className="username">{user}:</span> {content}
      </div>
      <button
        className="button"
        onClick={() => setShowReplyForm(!showReplyForm)}
      >
        <FaReply /> Reply
      </button>

      {showReplyForm && (
        <div className="reply-form">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="What are your thoughts?"
          />
          <button className="button" onClick={SubmitReplyHandle}>
            Submit Reply
          </button>
        </div>
      )}

      <div className="replies-container">
        {children?.map((child) => (
          <Comment
            key={child.id}
            id={child.id}
            content={child.content}
            children={child.children}
            depth={depth + 1}
            onReplySubmit={onReplySubmit}
            created_at={child.created_at}
            user={child.user_name}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
