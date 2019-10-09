import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import recipesReducer from './recipeReducer';

export default combineReducers({
  errors: errorReducer,
  recipes: recipesReducer
});
