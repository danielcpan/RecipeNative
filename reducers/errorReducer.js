import { RESET_ERRORS } from '../constants/actionTypes';

export default (state = null, action) => { // eslint-disable-line no-unused-vars
  const { type, error } = action;

  console.log(error)

  if (type === RESET_ERRORS) {
    return null;
  }
  // Catch API Errors
  // if (error.response) {
  //   return {
  //     ...error.response.data,
  //     type,
  //   }
  // }
  // Catch Misc Errors
  if (error) {
    return {
      ...error,
      type,
    };
  }
  return null; // Else reset if no errors
};
