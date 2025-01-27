// src/redux/store.js
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './Redux/Reducer/RootReducer'; 

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
