import {
  FETCH_INSTRUCTIONS_REQUEST,
  FETCH_INSTRUCTIONS_SUCCESS,
  FETCH_INSTRUCTIONS_FAILURE,  
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  hasErrored: false,
  error: null,
  byId: {},
  allIds: [],
};

  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_INSTRUCTIONS_REQUEST:
        return { 
          ...state, 
          isLoading: true,
          hasErrored: false, 
          error: null 
        };
      case FETCH_INSTRUCTIONS_SUCCESS:
        return { 
          ...state, 
          isLoading: false,
          hasErrored: false,
          error: null,
          byId: { ...state.byId, ...action.payload},
          // allIds: action.ids,
        };
      case FETCH_INSTRUCTIONS_FAILURE:
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

// SELECTORS
export const selectInstructions = (state, category) => {
  return state.instructions.allIds.map(id => state.instructions.byId[id]);
}