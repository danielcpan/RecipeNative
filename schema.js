import { normalize, schema } from 'normalizr';
// const { normalize, schema } = require('normalizr');

// const user = new schema.Entity('users');

// export const recipe = new schema.Entity('recipes', {
//   instructions: [instruction],
//   ingredients: [ingredient]
// });

// export const instruction = new schema.Entity('instructions', {
//   recipeId: recipe
// });

// export const ingredient = new schema.Entity('ingredients', {
//   recipeId: recipe
// });

// export const recipeSchema = new schema.Entity('recipes');
export const instructionSchema = new schema.Entity('instructions', {

}, { idAttribute: '_id' });
// export const ingredientSchema = new schema.Entity('ingredients', {}, {
//   idAttribute: '_id'
// });

export const recipeSchema = new schema.Entity('recipes', {
  // recipes: [recipe],
  // instructions: [instructionSchema],
  // ingredients: [ingredientSchema]
}, { idAttribute: '_id' });

export const recipeListSchema = [recipeSchema]



// Define a users schema
// const user = new schema.Entity('users');

// // Define your comments schema
// const comment = new schema.Entity('comments', {
//   commenter: user
// });

// // Define your article
// const article = new schema.Entity('articles', {
//   author: user,
//   comments: [comment]
// });

// const normalizedData = normalize(originalData, recipe);

const data = [{ _id: '123', name: 'Jim' }, { _id: '456', name: 'Jane' }];
const userSchema = new schema.Entity('users');
const userListSchema = [userSchema];

const normalizedData = normalize(data, userListSchema);