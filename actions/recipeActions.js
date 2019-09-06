import axios from 'axios';

import {
  GET_RECIPE,
  GET_ALL_RECIPES,
  GET_MOST_LIKED_RECIPES,
  GET_POPULAR_RECIPES,
  GET_NEW_RECIPES,
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
    // console.log(err.response.data)
    dispatch({
      type: 'GET_RECIPE_ERROR',
      error: err,
    });
  }
};

export const getAllRecipes = params => async dispatch => {
  try {
    const response = await axios.get(`${config.API_URL}/api/recipes`, { params });
    dispatch({
      type: GET_ALL_RECIPES,
      payload: response.data,
    });
  } catch (err) {
    // console.log(err.response.data)
    dispatch({
      type: 'GET_ALL_RECIPES_ERROR',
      error: err,
    });
  }
};

export const getMostLikedRecipes = params => async dispatch => {
  try {
    const response = await axios.get(`${config.API_URL}/api/recipes`, { params });
    dispatch({
      type: GET_MOST_LIKED_RECIPES,
      payload: response.data,
    });
  } catch (err) {
    // console.log(err.response.data)
    dispatch({
      type: 'GET_MOST_LIKED_RECIPES_ERROR',
      error: err,
    });
  }
};
