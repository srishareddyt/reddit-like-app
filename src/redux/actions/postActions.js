export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST,
});

export const fetchPostsSuccess = (data) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: data,
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});

export const fetchPosts = () => async (dispatch) => {
  dispatch(fetchPostsRequest());

  try {
    const response = await fetch("http://127.0.0.1:8000/list_all_posts", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    dispatch(fetchPostsSuccess(data));
  } catch (error) {
    dispatch(fetchPostsFailure(error.message));
  }
};
