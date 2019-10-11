import {
  FAVORITE_RECIPE,
  UNFAVORITE_RECIPE,
} from '../constants/actionTypes';

// TEMP LOCAL FAVORITE ACTIONS
export const favoriteRecipe = recipe => ({
  type: FAVORITE_RECIPE,
  id: recipe.id,
  payload: recipe
});

export const unfavoriteRecipe = id => ({
  type: UNFAVORITE_RECIPE,
  id
});