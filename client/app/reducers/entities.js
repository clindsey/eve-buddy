import merge from 'lodash/merge';
import {REQUEST as MATERIALS_REQUEST} from '../constants/materials';
import {REQUEST as ITEMS_REQUEST} from '../constants/items';
import {REQUEST as BLUEPRINTS_REQUEST} from '../constants/blueprints';

function defaultEntitiesState () {
  return {
    blueprints: {},
    items: [],
    materials: {},
    quantities: {}
  };
}

export default function entities (state = defaultEntitiesState(), action) {
  if (action.type === BLUEPRINTS_REQUEST) { // refactor: these are in the wrong place
    const newState = merge({}, state);
    newState.blueprints = {};
    newState.quantities = {};
    return newState;
  }
  if (action.type === MATERIALS_REQUEST) {
    const newState = merge({}, state);
    newState.materials = {};
    return newState;
  }
  if (action.type === ITEMS_REQUEST) {
    const newState = merge({}, state);
    newState.items = [];
    return newState;
  }
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities); // refactor: this could be split
  }
  return state;
}
