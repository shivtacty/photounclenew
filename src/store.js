// src/redux/store.js
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; 
const initialState = {
  sidebarShow: true,
  theme: 'light',
  auth: {
    isAuthenticated: localStorage.getItem('authToken') !== null,  
    user: null,               
  },
};

// Reducer function
const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    case 'LOGIN_SUCCESS':  // Login action
      return {
        ...state,
        auth: {
          isAuthenticated: true,
          user: rest.user,
        },
      };
    case 'LOGOUT':  // Logout action
      return {
        ...state,
        auth: {
          isAuthenticated: false,
          user: null,
        },
      };
    default:
      return state;
  }
};

const store = createStore(changeState, applyMiddleware(thunk));

export default store;
