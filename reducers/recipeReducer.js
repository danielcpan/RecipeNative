import {
  GET_RECIPE,
  GET_ALL_RECIPES,
  GET_MOST_LIKED_RECIPES,
  GET_POPULAR_RECIPES,
  GET_NEW_RECIPES,  
} from '../constants/actionTypes';

const initialState = {
  currentRecipe: {},
  mostLikedRecipes: [],
  popularRecipes: [],
  newRecipes: [],
  cookBook: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPE:
      return {
        ...state,
        currentRecipe: action.payload,
      };
    case GET_ALL_RECIPES:
      return {
        ...state,
        cookBook: [...state.cookBook, ...action.payload],
      };
    case GET_MOST_LIKED_RECIPES:
      return {
        ...state,
        mostLikedRecipes: action.payload,
      };
    default:
      return state;
  }
};
