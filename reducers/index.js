import { combineReducers } from 'redux';
import recipeDetailsReducer from './recipeDetailsReducer';
import recipeListReducer, { 
  newRecipeListReducer,
  searchedRecipeListReducer,
  popularRecipeListReducer,
  featuredRecipeListReducer,
  mostLikedRecipeListReducer
 } from './recipeListReducer';
// import snackbarReducer from './snackbarReducer';

export default combineReducers({
  recipeDetails: recipeDetailsReducer,
  recipesList: recipeListReducer
  // searchedRecipes: searchedRecipeListReducer,
  // newRecipes: newRecipeListReducer,
  // popularRecipes: popularRecipeListReducer,
  // featuredRecipes: featuredRecipeListReducer,
  // mostLikedRecipes: mostLikedRecipeListReducer,
  // snackbars: snackbarReducer,
});
