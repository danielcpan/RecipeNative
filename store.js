/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const composeEnhancers = composeWithDevTools({ hostname: 'localhost', port: 8000 });

let store; // eslint-disable-line import/no-mutable-exports

store = createStore(
  rootReducer,
  initialState,
  // compose(applyMiddleware(...middleware)),
  composeEnhancers(applyMiddleware(...middleware)),
);

export default store;
