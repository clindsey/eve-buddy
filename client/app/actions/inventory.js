import {CALL_API, schemas} from '../middleware/api';
import {CLEAR, ADD, REMOVE, COUNT_CHANGE, FILTER, ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE} from '../constants/inventory';

export function changeCount (name, count) {
  return (dispatch) => {
    return dispatch({
      count,
      name,
      type: COUNT_CHANGE
    });
  };
}

export function filter (query) {
  return (dispatch) => {
    return dispatch({
      query,
      type: FILTER
    });
  };
}

function handleAddItem (typeID, name, manifest) {
  return {
    [CALL_API]: {
      types: [ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE],
      endpoint: `catalog/${typeID}`,
      schema: schemas.CATALOG,
      method: 'PUT',
      data: {
        typeID,
        name,
        manifest
      }
    }
  };
}

export function addItem (typeID, name, manifest) {
  return (dispatch) => {
    return dispatch(handleAddItem(typeID, name, manifest));
    /*
    return dispatch({
      manifest,
      name,
      type: ADD,
      typeID
    });
    */
  };
}

export function removeItem (name) {
  return (dispatch) => {
    return dispatch({
      name,
      type: REMOVE
    });
  };
}

export function clearCount () {
  return (dispatch) => {
    return dispatch({
      type: CLEAR
    });
  };
}
