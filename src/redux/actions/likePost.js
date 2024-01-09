export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const likePostRequest = () => ({
  type: LIKE_POST_REQUEST,
});

export const likePostSuccess = (postId) => ({
  type: LIKE_POST_SUCCESS,
  payload: {
    postId,
  },
});

export const likePostFailure = (error) => ({
  type: LIKE_POST_FAILURE,
  payload: {
    error,
  },
});

export const likePost = (postId) => {
  console.log('check1', postId);

  return async (dispatch, getState) => {
    dispatch(likePostRequest());
    
    console.log('check2', getState());
    try {
      const response = await fetch(`http://127.0.0.1:8000/like_post?post_id=${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: postId,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to like post: ${errorData.message}`);
      }
      
      dispatch(likePostSuccess(postId));
    } catch (error) {
      dispatch(likePostFailure(error.message));
    }
  };
};

