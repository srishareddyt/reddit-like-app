import {  FETCH_POSTS_SUCCESS } from '../actions/postActions';
import {ADD_POST_SUCCESS} from '../actions/addPost';
import {LIKE_POST_SUCCESS} from '../actions/likePost';


const initialState = [];

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_SUCCESS:
      return [...state, action.payload];
    case LIKE_POST_SUCCESS:
      const updatedPosts = state.map((post) =>
        post.id === action.payload.postId ? { ...post, likes: post.likes + 1 } : post
      );
      return updatedPosts;
    case FETCH_POSTS_SUCCESS:
      return action.payload; 
    default:
      return state;
  }
};

export default postsReducer;
