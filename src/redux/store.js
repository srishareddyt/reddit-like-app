import { legacy_createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import {thunk }from 'redux-thunk';

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
