import { combineReducers } from 'redux';
import { 
  newRecipeListReducer,
  searchedRecipeListReducer,
  popularRecipeListReducer,
  featuredRecipeListReducer,
  mostLikedRecipeListReducer
 } from './recipeListReducer';
// import snackbarReducer from './snackbarReducer';
// import errorReducer from './errorReducer';

export default combineReducers({
  searchedRecipes: searchedRecipeListReducer,
  newRecipes: newRecipeListReducer,
  popularRecipes: popularRecipeListReducer,
  featuredRecipes: featuredRecipeListReducer,
  mostLikedRecipes: mostLikedRecipeListReducer,
  // snackbars: snackbarReducer,
  // errors: errorReducer,
});
