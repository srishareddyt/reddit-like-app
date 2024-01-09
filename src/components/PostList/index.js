import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Post from "../Post";
import PostForm from "../PostForm"; 
import Modal from "../Modal"; 
import "./PostList.css";
import { useParams } from "react-router-dom";
import { fetchPosts } from "../../redux/actions/postActions"; 

const PostList = ({ posts, fetchPosts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="post-list-container">
      <div className="container">
        {posts.map((post) => (
          <Post refetch={fetchPosts} key={post.id} post={post} />
        ))}
      </div>
      <div className="button-container">
        <button className="add-post-button" onClick={handleOpenModal}>
          Create new subreddit
        </button>
      </div>

      <Modal show={isModalOpen} handleClose={handleCloseModal}>
        <PostForm refetch={fetchPosts} handleCloseModal={handleCloseModal} user_id={params?.user_id} />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = {
  fetchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
