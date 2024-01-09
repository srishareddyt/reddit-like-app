import { CREATE_USER_SUCCESS, GET_USER_SUCCESS, CREATE_USER_FAILURE, GET_USER_FAILURE } from '../actions/authActions';

const initialState = {
  createUserResponse: null,
  getUserResponse: null,
  createUserError: null,
  getUserError: null,
};

const authReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      return { ...state, createUserResponse: action.payload, createUserError: null };
    case GET_USER_SUCCESS:
      return { ...state, getUserResponse: action.payload, getUserError: null };
    case CREATE_USER_FAILURE:
      return { ...state, createUserError: action.payload, createUserResponse: null };
    case GET_USER_FAILURE:
      return { ...state, getUserError: action.payload, getUserResponse: null };
    default:
      return state;
  }
};

export default authReducer;
