import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../Action/AuthAction';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
};

const storedUser = localStorage.getItem('authToken');

const initialStateWithLocalStorage = storedUser  ? {
  isAuthenticated: true,
  user: JSON.parse(storedUser),
  error: null,
} : initialState;

const authReducer = (state = initialStateWithLocalStorage, action) => {
  
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('authToken', JSON.stringify(action.payload.user));
      
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
      localStorage.removeItem('authToken');
      
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
