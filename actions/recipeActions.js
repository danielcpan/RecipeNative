import axios from 'axios';
import * as Schema from '../schema';
import * as GeneralUtils from '../utils/general.utils';

import {
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

const { API_ROOT } = require('../config/config');

export const loadRecipe = (_id, requiredFields = [], options = {}) => ({
  types: [
    FETCH_RECIPE_REQUEST, 
    FETCH_RECIPE_SUCCESS, 
    FETCH_RECIPE_FAILURE
  ],
  // Should call if no recipe in cache or if cached recipe doesn't have required fields
  shouldCallAPI: (state) => {
    const recipe = state.recipes.byId[_id];
    return (!recipe || !requiredFields.every(key => recipe.hasOwnProperty(key)))
  },
  callAPI: () => axios.get(`${API_ROOT}/recipes/${_id}`),
  schema: Schema.recipeSchema,
  payload: {}
})

export const loadRecipes = (category, params, options = {}) => ({
  types: [
    FETCH_RECIPES_REQUEST, 
    FETCH_RECIPES_SUCCESS, 
    FETCH_RECIPES_FAILURE
  ],
  // Should call if no recipes in cache
  shouldCallAPI: (state) => {
    const recipes = state.recipes[`${category}Ids`];
    return recipes.length === 0 || options.refresh === true;
  },
  callAPI: () => {
    const endpoint = GeneralUtils.camelToKebab(category);
    return axios.get(`${API_ROOT}/recipes/${endpoint}`, { params })
  },
  schema: Schema.recipeListSchema,
  payload: { category }
})

export const loadSearchedRecipes = (val) => ({
  types: [
    FETCH_SEARCH_RECIPES_REQUEST, 
    FETCH_SEARCH_RECIPES_SUCCESS, 
    FETCH_SEARCH_RECIPES_FAILURE
  ],
  shouldCallAPI: (state) => true,
  callAPI: () => axios.get(`${API_ROOT}/recipes/search?val=${val}`),
  schema: Schema.recipeListSchema,
  payload: {}
})
