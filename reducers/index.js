import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
// import snackbarReducer from './snackbarReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  recipes: recipeReducer,
  // snackbars: snackbarReducer,
  errors: errorReducer,
});
