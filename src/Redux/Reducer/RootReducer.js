import { combineReducers } from 'redux';
import authReducer from './AuthReducer';

// Reducer to handle theme and sidebarShow state
const initialState = {
  sidebarShow: true,
  theme: 'light',
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  themeState: changeState, 
});

export default rootReducer;
