import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../Action/AuthAction';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
};


// console.log(initialState);

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
