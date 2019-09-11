import {
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,  
} from '../constants/actionTypes';

const initialState = {
  // isLoading: false,
  mostLikedIsLoading: false,
  newIsLoading: false,
  popularIsLoading: false,
  hasErrored: false,
  error: null,
  recipes: [],
  byId: {},
  allIds: [],
  mostLikedIds: [],
  newIds: [],
  popularIds: [],
};

  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_RECIPES_REQUEST:
        return { 
          ...state, 
          // isLoading: true, 
          [`${action.category}IsLoading`]: true, 
          hasErrored: false, 
          error: null 
        };
      case FETCH_RECIPES_SUCCESS:
        return { 
          ...state, 
          [`${action.category}IsLoading`]: false,
          hasErrored: false,
          error: null,
          byId: { ...state.byId, ...action.payload},
          [`${action.category}Ids`]: action.ids,
        };
      case FETCH_RECIPES_FAILURE:
        return { 
          ...state, 
          [`${action.category}IsLoading`]: false,
          // isLoading: false, 
          hasErrored: true, 
          error: action.payload 
        };
      default:
        return state;
    }
  }

// SELECTORS
export const selectRecipes = (state, category) => {
  return state.recipesList[`${category}Ids`].map(id => state.recipesList.byId[id]);
}