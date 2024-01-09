import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import commentsReducer from './commentsReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  comments: commentsReducer,
});

export default rootReducer;
