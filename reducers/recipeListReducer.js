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
        if (category === action.category) {
          return { 
            ...state, 
            isLoading: true, 
            hasErrored: false, 
            error: null 
          };
        }
        return state;
      case FETCH_RECIPES_SUCCESS:
        if (category === action.category) {
          return { 
            ...state, 
            isLoading: false,
            hasErrored: false,
            error: null,
            // recipes: [...state.recipes, ...action.payload]
            recipes: action.payload
          };
        }
        return state;
      case FETCH_RECIPES_FAILURE:
        if (category === action.category) {
          return { 
            ...state, 
            isLoading: false, 
            hasErrored: true, 
            error: action.payload 
          };
        }
        return state;
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
