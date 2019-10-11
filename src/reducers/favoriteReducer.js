import {
  FAVORITE_RECIPE,
  UNFAVORITE_RECIPE,
} from '../constants/actionTypes';

const initialState = {
  byId: {},
  allIds: []
};

const removeByKey = (obj, prop) => {
  let res = Object.assign({}, obj);
  delete res[prop];
  return res;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FAVORITE_RECIPE:
      return {
        ...state,
        byId: { ...state.byId, ...action.payload },
        allIds: [...state.allIds, action.id]
      }
    case UNFAVORITE_RECIPE:
      return {
        byId: removeByKey(state.byId, action.id),
        allIds: state.allIds.filter(el => el !== action.id)
      };
    default:
      return state;
  }
};