import { combineReducers } from 'redux';
import recipeDetailsReducer from './recipeDetailsReducer';
import { 
  newRecipeListReducer,
  searchedRecipeListReducer,
  popularRecipeListReducer,
  featuredRecipeListReducer,
  mostLikedRecipeListReducer
 } from './recipeListReducer';
// import snackbarReducer from './snackbarReducer';

export default combineReducers({
  recipeDetails: recipeDetailsReducer,
  searchedRecipes: searchedRecipeListReducer,
  newRecipes: newRecipeListReducer,
  popularRecipes: popularRecipeListReducer,
  featuredRecipes: featuredRecipeListReducer,
  mostLikedRecipes: mostLikedRecipeListReducer,
  // snackbars: snackbarReducer,
});
