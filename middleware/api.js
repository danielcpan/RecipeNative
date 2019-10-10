import { normalize } from 'normalizr';

const callApiMiddleware = ({ dispatch, getState }) => next => async action => {
  console.log('wwwweeee')
  const { 
    types, 
    callAPI, 
    shouldCallAPI = () => true, 
    schema,
    payload = {}
  } = action;

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
  
  if (!shouldCallAPI(getState())) return;

  const [requestType, successType, failureType] = types;

  dispatch({ type: requestType, ...payload })
  try {
    const response = await callAPI();
    const normalizedData = normalize(response.data, schema);
    const key = schema[0]._key;
    const { entities, result } = normalizedData;

    dispatch({ type: successType, entities: entities[key], result, ...payload })
  } catch (err) {
    dispatch({ type: failureType, err, ...payload })
  }
}

export default callApiMiddleware;