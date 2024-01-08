export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const createUser = (name, email, password, navigation) => async (dispatch) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/create_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error('User creation failed');
    }

    const data = await response.json();
    navigation(data.id);
    dispatch({ type: CREATE_USER_SUCCESS, payload: data });
  } catch (error) {
    console.error('Error creating user:', error);
    dispatch({ type: CREATE_USER_FAILURE, payload: error.message });
  }
};


export const getUser = (email, password, navigation) => async (dispatch) => {
  try {
    const url = `http://127.0.0.1:8000/get_user?email=${email}&password=${password}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "69420",
      }
    });

    if (!response.ok) {
      throw new Error('User retrieval failed');
    }

    const data = await response.json();
    navigation(data.id);
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    console.error('Error getting user:', error);
    dispatch({ type: GET_USER_FAILURE, payload: error.message });
  }
};
