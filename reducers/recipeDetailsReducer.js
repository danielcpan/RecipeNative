import {
  FETCH_RECIPE_DETAILS_REQUEST,
  FETCH_RECIPE_DETAILS_SUCCESS,
  FETCH_RECIPE_DETAILS_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  hasErrored: false,
  error: null,
  recipe: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECIPE_DETAILS_REQUEST:
      return { 
        ...state, 
        isLoading: true, 
        hasErrored: false, 
        error: null 
      };
    case FETCH_RECIPE_DETAILS_SUCCESS:
      return { 
        ...state, 
        isLoading: false,
        hasErrored: false,
        error: null,
        recipe: action.payload
      };
    case FETCH_RECIPE_DETAILS_FAILURE:
      return { 
        ...state, 
        isLoading: false, 
        hasErrored: true, 
        error: action.payload 
      };
    default:
      return state;
  }
}
