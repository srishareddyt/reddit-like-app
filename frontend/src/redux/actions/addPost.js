export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const addPost = (title, content, created_at, user_id) => {
  console.log(user_id, 'user_id');
  return async (dispatch) => {
    dispatch({ type: ADD_POST_REQUEST });

    try {
      
      const response = await fetch('http://127.0.0.1:8000/create_post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id, 
          title,
          content 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const data = await response.json();

      dispatch({
        type: ADD_POST_SUCCESS,
        payload: {
          ...data,
          created_at,
          likes: 0,
        },
      });
    } catch (error) {
      dispatch({ type: ADD_POST_FAILURE, payload: error.message });
    }
  };
};
