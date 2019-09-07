import {
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,  
} from '../constants/actionTypes';

import { RECIPE_TYPES } from '../constants/recipeTypes';

const initialState = {
  isLoading: false,
  hasErrored: false,
  error: null,
  recipes: [],
};

const createReducer = category => {
  return (state = initialState, action) => {
    switch (action.type) {
      case FETCH_RECIPES_REQUEST:
        return { ...state, isLoading: true, hasErrored: false, error: null };
      case FETCH_RECIPES_SUCCESS:
        return { ...state, recipes: [...state.recipes, ...action.payload] };
      case FETCH_RECIPES_FAILURE:
        return { ...state, isLoading: false, hasErrored: true, error: action.payload };
      default:
        return state;
    }
  }
}

export const searchedRecipeListReducer = createReducer(RECIPE_TYPES.SEARCHED);
export const newRecipeListReducer = createReducer(RECIPE_TYPES.NEW);
export const popularRecipeListReducer = createReducer(RECIPE_TYPES.POPULAR);
export const featuredRecipeListReducer = createReducer(RECIPE_TYPES.FEATURED);
export const mostLikedRecipeListReducer = createReducer(RECIPE_TYPES.MOST_LIKED);
