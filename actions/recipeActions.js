import axios from 'axios';
import { normalize } from 'normalizr';
import * as schema from '../schema';

import {
  RESET_RECIPE_DETAILS,
  FETCH_RECIPE_DETAILS_REQUEST,
  FETCH_RECIPE_DETAILS_SUCCESS,
  FETCH_RECIPE_DETAILS_FAILURE,
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
} from '../constants/actionTypes';
import store from '../store';
import { kebabToCamel, camelToKebab } from '../utils/action.utils';

const env = process.env.NODE_ENV || 'development';
const { API_URL } = require('../config/config')[env];

// FETCH RECIPE DETAILS ACTIONS
export const resetRecipeDetails = () => ({
  type: RESET_RECIPE_DETAILS,
})

export const fetchRecipeDetailsRequest = () => ({
  type: FETCH_RECIPE_DETAILS_REQUEST,
})

export const fetchRecipeDetailsSuccess = recipe => ({
  type: FETCH_RECIPE_DETAILS_SUCCESS,
  payload: recipe,
})

export const fetchRecipeDetailsFailure = err => ({
  type: FETCH_RECIPE_DETAILS_FAILURE,
  payload: err,
})

export const fetchRecipeDetails = _id => async dispatch => {
  try {
    dispatch(fetchRecipeDetailsRequest());
    const response = await axios.get(`${API_URL}/api/recipes/${_id}`);
    dispatch(fetchRecipeDetailsSuccess(response.data));
  } catch (err) {
    dispatch(fetchRecipeDetailsFailure(err));
  }
}

// FETCH RECIPES ACTIONS
export const fetchRecipesRequest = category => ({
  type: FETCH_RECIPES_REQUEST,
  category,
})

export const fetchRecipesSuccess = (category, recipes, ids) => ({
  type: FETCH_RECIPES_SUCCESS,
  payload: recipes,
  category,
  ids,
})

export const fetchRecipesFailure = (category, err) => ({
  type: FETCH_RECIPES_FAILURE,
  payload: err,
  category,
})

export const fetchRecipes = (category, params, options = {}) => async dispatch => {
  const recipeIds =  store.getState().recipesList[`${category}Ids`]

  // Return Cached if exists
  if (recipeIds.length > 0 && !options.refresh) return;

  try {
    dispatch(fetchRecipesRequest(category));
    const response = await axios.get(`${API_URL}/api/recipes/${camelToKebab(category)}`, { params });
    const normalizedData = normalize(response.data, schema.recipeListSchema);
    const { entities: { recipes, instructions }, result } = normalizedData;

    dispatch(fetchRecipesSuccess(category, recipes, result));
  } catch (err) {
    console.log('err')
    console.log(err)
    dispatch(fetchRecipesFailure(category, err));
  }
}