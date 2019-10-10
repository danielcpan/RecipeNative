import axios from 'axios';
import { normalize } from 'normalizr';
import * as Schema from '../schema';
import store from '../store';
import * as ErrorActions from './errorActions';
import * as GeneralUtils from '../utils/general.utils';

import {
  // LOAD_RECIPE,
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

// export const selectRecipe = (_id) => {

// }

export const loadRecipe = (_id, requiredFields = [], options = {}) => ({
  types: [
    FETCH_RECIPE_REQUEST, 
    FETCH_RECIPE_SUCCESS, 
    FETCH_RECIPE_FAILURE
  ],
  // Should call if no recipe in cache or if cached recipe doesn't have required fields
  shouldCallAPI: (state) => {
    const recipe = state.recipes.byId[_id];
    console.log('recipe')
    console.log(recipe)
    console.log('requiredFields')
    console.log(requiredFields)

    // requiredFields.every(key => console.log('key: ' + key));
    return (!recipe || !requiredFields.every(key => {
      console.log('key: ' + key)
      return recipe.hasOwnProperty(key)
    }))
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
    return recipes.length === 0;
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

// FETCH SEARCH RECIPE ACTIONS
// export const fetchSearchRecipesRequest = () => ({
//   type: FETCH_SEARCH_RECIPES_REQUEST,
// })

// export const fetchSearchRecipesSuccess = (recipes, ids) => ({
//   type: FETCH_SEARCH_RECIPES_SUCCESS,
//   payload: recipes,
//   ids
// })

// export const fetchSearchRecipesFailure = err => ({
//   type: FETCH_SEARCH_RECIPES_FAILURE,
//   payload: err,
// })

// export const fetchSearchRecipes = val => async dispatch => {
//   // const currentRecipeId =  store.getState().recipes.currentId;

//   // if (currentRecipeId === _id) return;
//   // const recipeId = store.getState().recipes.byId[_id];

//   // // Return cached if exists
//   // if (recipeId) {
//   //   dispatch(loadRecipe(_id));
//   //   return;
//   // }

//   try {
//     dispatch(fetchSearchRecipesRequest());
//     const response = await axios.get(`${API_ROOT}/api/recipes/search?val=${val}`);
//     // console.log('response')
//     // console.log(response)
//     const normalizedData = normalize(response.data, Schema.recipeListSchema);
//     // console.log('normalizedData')
//     // console.log(normalizedData)
//     const { entities: { recipes }, result } = normalizedData;

//     dispatch(fetchSearchRecipesSuccess(recipes, result));
//   } catch (err) {
//     // API Errors
//     if (err.response) dispatch(fetchSearchRecipesFailure(err.response.data));
//     // General Errors
//     dispatch(ErrorActions.logError(err));
//   }
// }

