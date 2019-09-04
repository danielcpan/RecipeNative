import {
  GET_RECIPE,
  GET_RECIPES,
} from '../constants/actionTypes';

const initialState = {
  currentRecipe: {},
  cookBook: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPE:
      return {
        ...state,
        currentRecipe: action.payload,
      };
    case GET_RECIPES:
      return {
        ...state,
        cookBook: action.payload,
      };
    default:
      return state;
  }
};
