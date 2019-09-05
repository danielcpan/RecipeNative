import axios from 'axios';

import {
  GET_RECIPE,
  GET_RECIPES,
} from '../constants/actionTypes';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

export const getRecipe = recipeNameId => async dispatch => {
  try {
    const response = await axios.get(`${config.API_URL}/api/recipes/${recipeNameId}?`);
    dispatch({
      type: GET_RECIPE,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: 'GET_RECIPE_ERROR',
      error: err.response.data,
    });
  }
};

export const getRecipes = params => async dispatch => {
  try {
    // console.log(params)
    const response = await axios.get(`${config.API_URL}/api/recipes`, { params });
    dispatch({
      type: GET_RECIPES,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: 'GET_RECIPES_ERROR',
      error: err.response.data,
    });
  }
};
