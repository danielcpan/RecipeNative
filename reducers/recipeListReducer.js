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
  byId: {},
  allIds: [],
  mostLikedIds: [],
  newIds: [],
  popularIds: [],
};

const createReducer = category => {
  return (state = initialState, action) => {
    if (action.category === 'most-liked') action.category = 'mostLiked';
    // if (category === action.category) {
      switch (action.type) {
        case FETCH_RECIPES_REQUEST:
          return { 
            ...state, 
            isLoading: true, 
            hasErrored: false, 
            error: null 
          };
        // case FETCH_RECIPES_SUCCESS:
        //   return { 
        //     ...state, 
        //     isLoading: false,
        //     hasErrored: false,
        //     error: null,
        //     // recipes: [...state.recipes, ...action.payload]
        //     recipes: action.payload
        //   };
        case FETCH_RECIPES_SUCCESS:
          // console.log("action.payload")
          // console.log(action.payload)
          return { 
            ...state, 
            isLoading: false,
            hasErrored: false,
            error: null,
            byId: { ...state.byId, ...action.payload.entities.recipes},
            // byId: action.payload.entities.recipes,
            // allIds: action.payload.result,
            [action.category + 'Ids']: [...state[action.category + 'Ids'], ...action.payload.result],

            // recipes: [...state.recipes, ...action.payload]
            // recipes: action.payload
          };
        case FETCH_RECIPES_FAILURE:
          return { 
            ...state, 
            isLoading: false, 
            hasErrored: true, 
            error: action.payload 
          };
        default:
          return state;
      }
    // }
    // return state;
  }
}

export const searchedRecipeListReducer = createReducer(RECIPE_TYPES.SEARCHED);
export const newRecipeListReducer = createReducer(RECIPE_TYPES.NEW);
export const popularRecipeListReducer = createReducer(RECIPE_TYPES.POPULAR);
export const featuredRecipeListReducer = createReducer(RECIPE_TYPES.FEATURED);
export const mostLikedRecipeListReducer = createReducer(RECIPE_TYPES.MOST_LIKED);

// SELECTORS
export const getRecipes = (state, category) => {
  console.log("category")
  console.log(category)
  console.log(state[category])
  console.log(state)
  return state.mostLikedRecipes[category].map(id => state.mostLikedRecipes.byId[id]);
}