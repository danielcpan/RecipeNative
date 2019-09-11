import axios from 'axios';
import { normalize } from 'normalizr';
import * as schema from '../schema';

import {
  FETCH_INSTRUCTIONS_REQUEST,
  FETCH_INSTRUCTIONS_SUCCESS,
  FETCH_INSTRUCTIONS_FAILURE,
} from '../constants/actionTypes';
import store from '../store';
import { camelToKebab } from '../utils/action.utils';

const env = process.env.NODE_ENV || 'development';
const { API_URL } = require('../config/config')[env];

// FETCH INSTRUCTIONS ACTIONS
export const fetchInstructionsRequest = () => ({
  type: FETCH_INSTRUCTIONS_REQUEST,
})

export const fetchInstructionsSuccess = (instructions, ids) => ({
  type: FETCH_INSTRUCTIONS_SUCCESS,
  payload: instructions,
})

export const fetchInstructionsFailure = err => ({
  type: FETCH_INSTRUCTIONS_FAILURE,
  payload: err,
})

// export const fetchInstructions = (params, options = {}) => async dispatch => {
//   const recipeIds =  store.getState()

//   // Return Cached if exists
//   if (recipeIds.length > 0 && !options.refresh) return;

//   try {
//     dispatch(fetchInstructionsRequest());
//     // const response = await axios.get(`${API_URL}/api/instructions/${camelToKebab()}`, { params });
//     // const normalizedData = normalize(response.data, schema.recipeListSchema);
//     // const { entities: { instructions, instructions }, result } = normalizedData;

//     dispatch(fetchInstructionsSuccess(instructions, result));
//   } catch (err) {
//     dispatch(fetchInstructionsFailure(err));
//   }
// }