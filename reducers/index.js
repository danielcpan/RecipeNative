import { combineReducers } from 'redux';
import recipeDetailsReducer from './recipeDetailsReducer';
import instructionReducer from './instructionReducer';
import recipesReducer from './recipeReducer';
// import snackbarReducer from './snackbarReducer';

export default combineReducers({
  recipeDetails: recipeDetailsReducer,
  instructions: instructionReducer,
  recipes: recipesReducer
  // snackbars: snackbarReducer,
});
