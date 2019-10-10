import { normalize } from 'normalizr';
import * as ErrorActions from '../actions/errorActions';

const callApiMiddleware = ({ dispatch, getState }) => next => async action => {
  const { 
    types, 
    callAPI, 
    shouldCallAPI = () => true, 
    schema,
    payload = {}
  } = action;

  console.log(types)
  // Normal action: pass it on
  if (!types) return next(action);

  if (
    !Array.isArray(types) ||
    types.length !== 3 ||
    !types.every(type => typeof type === 'string')
  ) {
    throw new Error('Expected an array of three string types.');
  }
  
  if (typeof callAPI !== 'function') {
    throw new Error('Expected callAPI to be a function.');
  }

  if (!schema) {
    throw new Error('Expected schema to be present');
  }
  console.log('got here boisss')
  if (!shouldCallAPI(getState())) return;

  console.log('we should call the api')

  const [requestType, successType, failureType] = types;

  dispatch({ type: requestType, ...payload })
  try {
    const response = await callAPI();
    const normalizedData = normalize(response.data, schema);
    const key = schema[0]._key;
    const { entities, result } = normalizedData;

    dispatch({ type: successType, entities: entities[key], result, ...payload })
  } catch (err) {
    // TODO Figure out better way to handle client errors
    if (err.response) loggedError = err.response.data;
    else if (err.message) loggedError = err.message;

    dispatch({ type: failureType, err: loggedError, ...payload })
    // // API Errors
    // if (err.response) dispatch({ type: failureType, err: err.response.data, ...payload })
    // // General Errors
    // dispatch(ErrorActions.logError(err));
  }
}

export default callApiMiddleware;