import 'isomorphic-fetch';
import {normalize, Schema, arrayOf} from 'normalizr';
import config from '../config';

export const CALL_API = Symbol('CALL_API');

const API_ROOT = `/${config.locationRoot}/api/`;

const userSchema = new Schema('user', {
  idAttribute: 'ID'
});

const itemSchema = new Schema('items', {
  idAttribute: 'typeID'
});

const materialSchema = new Schema('materials', {
  idAttribute: 'typeID'
});

const blueprintSchema = new Schema('blueprints', {
  idAttribute: 'typeID'
});

const quantitySchema = new Schema('quantities', {
  idAttribute: 'ID'
});

const catalogSchema = new Schema('catalog', {
  idAttribute: 'name'
});

blueprintSchema.define({
  materials: arrayOf(blueprintSchema),
  quantities: arrayOf(quantitySchema)
});

export const schemas = {
  CATALOG: catalogSchema,
  USER: userSchema,
  ITEM: itemSchema,
  ITEM_ARRAY: arrayOf(itemSchema),
  MATERIAL: materialSchema,
  MATERIAL_ARRAY: arrayOf(materialSchema),
  BLUEPRINT: blueprintSchema,
  BLUEPRINT_ARRAY: arrayOf(blueprintSchema)
};

function callApi (endpoint, schema, data = {}, method = 'GET') {
  const fullUri = `${API_ROOT}${endpoint}`;
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method,
    credentials: 'include'
  };
  if (method === 'POST' || method === 'PUT') {
    options.body = JSON.stringify(data);
  }
  return fetch(fullUri, options)
  .then(response =>
    response.json().then(json => ({json, response}))
  ).then(({json, response}) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return Object.assign({}, normalize(json, schema));
  });
}

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }
  let {endpoint} = callAPI;
  const {schema, types, data, method} = callAPI;
  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }
  function actionWith (dat) {
    const finalAction = Object.assign({}, action, dat);
    delete finalAction[CALL_API];
    return finalAction;
  }
  const [REQUEST, SUCCESS, FAILURE] = types;
  next(actionWith({type: REQUEST}));
  return callApi(endpoint, schema, data, method).then(
    response => next(actionWith({
      response,
      type: SUCCESS
    })),
    error => next(actionWith({
      type: FAILURE,
      error: error.message || 'A useful error message!'
    }))
  );
};
