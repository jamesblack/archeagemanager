import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from './middleware/logger';
import thunk from 'redux-thunk';
import user from './reducers/user';

export const archeageApplication = combineReducers({
  user,
});

let store;

if (typeof window !== 'undefined') {
  store = applyMiddleware(thunk, logger)(createStore)(archeageApplication, window.__INITIAL_STATE__);
} else {
  store = () => applyMiddleware(thunk, logger)(createStore)(archeageApplication);
}

export default store;
