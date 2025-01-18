// src/redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './AuthReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
