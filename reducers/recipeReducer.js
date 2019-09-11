import {
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,  
} from '../constants/actionTypes';

const initialState = {
  mostLikedIsLoading: false,
  newIsLoading: false,
  popularIsLoading: false,
  hasErrored: false,
  error: null,
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
          hasErrored: true, 
          error: action.payload 
        };
      default:
        return state;
    }
  }

// SELECTORS
export const selectRecipes = (state, category) => {
  return state.recipes[`${category}Ids`].map(id => state.recipes.byId[id]);
}