import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import recipeReducer from './recipeReducer';
import favoriteReducer from './favoriteReducer';

export default combineReducers({
  errors: errorReducer,
  recipes: recipeReducer,
  favorites: favoriteReducer
});
