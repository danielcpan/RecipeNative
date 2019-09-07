import axios from 'axios';

import {
  GET_RECIPE,
  GET_ALL_RECIPES,
  GET_MOST_LIKED_RECIPES,
  GET_POPULAR_RECIPES,
  GET_NEW_RECIPES,


  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE
} from '../constants/actionTypes';

const env = process.env.NODE_ENV || 'development';
const { API_URL } = require('../config/config')[env];

export const getRecipe = recipeNameId => async dispatch => {
  try {
    const response = await axios.get(`${API_URL}/api/recipes/${recipeNameId}?`);
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
    const response = await axios.get(`${API_URL}/api/recipes`, { params });
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
    const response = await axios.get(`${API_URL}/api/recipes`, { params });
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

export const fetchRecipesRequest = () => ({
  type: FETCH_RECIPES_REQUEST
})

export const fetchRecipesSuccess = (recipes, category) => ({
  type: FETCH_RECIPES_SUCCESS,
  payload: recipes,
  category
})

export const fetchRecipesFailure = (err) => ({
  type: FETCH_RECIPES_FAILURE,
  payload: err
})

export const fetchRecipes = (category, params) => async dispatch => {
  try {
    dispatch(fetchRecipesRequest());
    const response = await axios.get(`${API_URL}/api/recipes/${category}`, { params });
    dispatch(fetchRecipesSuccess(response.data, category));
  } catch (err) {
    dispatch(fetchRecipesFailure(err));
  }
}
