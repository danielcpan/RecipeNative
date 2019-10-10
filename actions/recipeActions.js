import axios from 'axios';
import { normalize } from 'normalizr';
import * as schema from '../schema';
import store from '../store';
import * as ErrorActions from './errorActions';
import * as GeneralUtils from '../utils/general.utils';

import {
  LOAD_RECIPE,
  FETCH_RECIPE_REQUEST,
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPE_FAILURE,  
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
  FETCH_SEARCH_RECIPES_REQUEST,
  FETCH_SEARCH_RECIPES_SUCCESS,
  FETCH_SEARCH_RECIPES_FAILURE,
} from '../constants/actionTypes';

const env = process.env.NODE_ENV || 'development';
const { API_ROOT } = require('../config/config')[env];

export const loadRecipe = _id => ({
  type: LOAD_RECIPE,
  payload: _id
})

// FETCH RECIPE ACTIONS
export const fetchRecipeRequest = () => ({
  type: FETCH_RECIPE_REQUEST,
})

export const fetchRecipeSuccess = (recipe, id) => ({
  type: FETCH_RECIPE_SUCCESS,
  payload: recipe,
  id
})

export const fetchRecipeFailure = err => ({
  type: FETCH_RECIPE_FAILURE,
  payload: err,
})

export const fetchRecipe = (_id, options = {}) => async dispatch => {
  const currentRecipeId =  store.getState().recipes.currentId;

  if (currentRecipeId === _id && !options.refresh) return;
  const recipeId = store.getState().recipes.byId[_id];

  // Return cached if exists
  if (recipeId && !options.refresh) {
    dispatch(loadRecipe(_id));
    return;
  }

  try {
    dispatch(fetchRecipeRequest());
    const response = await axios.get(`${API_ROOT}/api/recipes/${_id}`);
    const normalizedData = normalize(response.data, schema.recipeSchema);
    const { entities: { recipes }, result } = normalizedData;

    dispatch(fetchRecipeSuccess(recipes, result));
  } catch (err) {
    // API Errors
    if (err.response) dispatch(fetchRecipeFailure(err.response.data));
    // General Errors
    dispatch(ErrorActions.logError(err));
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
  const recipeIds =  store.getState().recipes[`${category}Ids`]

  // Return cached if exists
  if (recipeIds.length > 0 && !options.refresh) return;

  try {
    dispatch(fetchRecipesRequest(category));
    const response = await axios.get(`${API_ROOT}/recipes/${GeneralUtils.camelToKebab(category)}`, { params });
    const normalizedData = normalize(response.data, schema.recipeListSchema);
    const { entities: { recipes }, result } = normalizedData;

    dispatch(fetchRecipesSuccess(category, recipes, result));
  } catch (err) {
    // API Errors
    if (err.response) dispatch(fetchRecipesFailure(category, err.response.data));
    // General Errors
    dispatch(ErrorActions.logError(err));
  }
}

export const loadRecipes = (category, params, options = {}) => ({
  // Types of actions to emit before and after
  types: [FETCH_RECIPES_REQUEST, FETCH_RECIPES_SUCCESS, FETCH_RECIPES_FAILURE],
  // Check the cache (optional):
  shouldCallAPI: state => state.recipes[`${category}Ids`].length === 0,
  // Perform the fetching:
  callAPI: () => axios.get(`${API_ROOT}/recipes/${GeneralUtils.camelToKebab(category)}`, { params }),
  // Schema for normalizing
  schema: schema.recipeListSchema,
  // Arguments to inject in begin/end actions
  payload: { category }
})


// FETCH SEARCH RECIPE ACTIONS
export const fetchSearchRecipesRequest = () => ({
  type: FETCH_SEARCH_RECIPES_REQUEST,
})

export const fetchSearchRecipesSuccess = (recipes, ids) => ({
  type: FETCH_SEARCH_RECIPES_SUCCESS,
  payload: recipes,
  ids
})

export const fetchSearchRecipesFailure = err => ({
  type: FETCH_SEARCH_RECIPES_FAILURE,
  payload: err,
})

export const fetchSearchRecipes = val => async dispatch => {
  // const currentRecipeId =  store.getState().recipes.currentId;

  // if (currentRecipeId === _id) return;
  // const recipeId = store.getState().recipes.byId[_id];

  // // Return cached if exists
  // if (recipeId) {
  //   dispatch(loadRecipe(_id));
  //   return;
  // }

  try {
    dispatch(fetchSearchRecipesRequest());
    const response = await axios.get(`${API_ROOT}/api/recipes/search?val=${val}`);
    // console.log('response')
    // console.log(response)
    const normalizedData = normalize(response.data, schema.recipeListSchema);
    // console.log('normalizedData')
    // console.log(normalizedData)
    const { entities: { recipes }, result } = normalizedData;

    dispatch(fetchSearchRecipesSuccess(recipes, result));
  } catch (err) {
    // API Errors
    if (err.response) dispatch(fetchSearchRecipesFailure(err.response.data));
    // General Errors
    dispatch(ErrorActions.logError(err));
  }
}

