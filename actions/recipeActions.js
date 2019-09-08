import axios from 'axios';

import {
  RESET_RECIPE_DETAILS,
  FETCH_RECIPE_DETAILS_REQUEST,
  FETCH_RECIPE_DETAILS_SUCCESS,
  FETCH_RECIPE_DETAILS_FAILURE,
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
} from '../constants/actionTypes';

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
  category
})

export const fetchRecipesSuccess = (category, recipes) => ({
  type: FETCH_RECIPES_SUCCESS,
  payload: recipes,
  category
})

export const fetchRecipesFailure = (category, err) => ({
  type: FETCH_RECIPES_FAILURE,
  payload: err,
  category
})

export const fetchRecipes = (category, params) => async dispatch => {
  try {
    dispatch(fetchRecipesRequest(category));
    const response = await axios.get(`${API_URL}/api/recipes/${category}`, { params });
    dispatch(fetchRecipesSuccess(category, response.data));
  } catch (err) {
    dispatch(fetchRecipesFailure(category, err));
  }
}
