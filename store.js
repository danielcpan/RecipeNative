/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

let store; // eslint-disable-line import/no-mutable-exports

store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware)),
);

export default store;
