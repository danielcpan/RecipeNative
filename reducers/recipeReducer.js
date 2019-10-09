import {
  LOAD_RECIPE,
  FETCH_RECIPE_REQUEST,
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPE_FAILURE,
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,    
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  mostLikedIsLoading: false,
  newIsLoading: false,
  popularIsLoading: false,
  hasErrored: false,
  error: null,
  byId: {},
  currentId: null,
  allIds: [],
  mostLikedIds: [],
  newIds: [],
  popularIds: [],
};

  export default (state = initialState, action) => {
    switch (action.type) {
      case LOAD_RECIPE:
        return {
          ...state,
          currentId: action.payload
        }
      case FETCH_RECIPE_REQUEST:
        return { 
          ...state, 
          isLoading: true, 
          hasErrored: false, 
          error: null 
        };
      case FETCH_RECIPE_SUCCESS:
        return { 
          ...state, 
          isLoading: false,
          hasErrored: false,
          error: null,
          byId: { ...state.byId, ...action.payload },
          currentId: action.id
        };
      case FETCH_RECIPE_FAILURE:
        return { 
          ...state, 
          isLoading: false,
          hasErrored: true, 
          error: action.payload 
        };
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
          byId: { ...state.byId, ...action.payload },
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
export const getRecipe = (state) => {
  return state.recipes.byId[state.currentId];
}

export const getRecipes = (state, category) => {
  return state.recipes[`${category}Ids`].map(id => state.recipes.byId[id]);
}