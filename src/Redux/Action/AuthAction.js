// src/redux/actions/authActions.js
import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const login = (userData) => {
  return async (dispatch) => {
    const { email, password } = userData;
    let data = new FormData();

    try {
      let data = new FormData();
      data.append('emailid', email);

      const config = {
        method: 'post',
        url: 'https://photouncle.com/gateway/web/genie/parent-photouncle/login.php',
        data: data,
      };

      // Make the API request
      const response = await axios(config);
      console.log(response);
      
      if (response.data.status =="success") {
        const user = response.data.data;
        // const userId = response?.data?.pid;
console.log(user);

// console.log(userId);

localStorage.setItem('authToken',JSON.stringify(user) );

        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user },
        });

        // setShowSuccessToast(true); 
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          error: response.data.message || 'Login failed. Please try again.',
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_FAILURE,
        error: 'Login failed. Please try again.',
      });
    }
  };
};

// Action to log out the user
export const logout = () => {
  localStorage.removeItem('authToken');
  return { type: LOGOUT };
};
