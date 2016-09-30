import {FILTER as INVENTORY_FILTER, ADD as INVENTORY_ADD, REMOVE as INVENTORY_REMOVE, COUNT_CHANGE as INVENTORY_COUNT_CHANGE, CLEAR as INVENTORY_CLEAR} from '../constants/inventory';

function getDefaultState () {
  return {
    items: {},
    counts: {},
    filterTerm: ''
  };
}

export default function inventory (state = getDefaultState(), action) {
  if (action.response && action.response.entities.user) {
    const catalog = (action.response.entities.user[0].catalog || []).reduce((prev, curr) => {
      return Object.assign({}, prev, {
        [curr.name]: curr
      });
    }, {});
    console.log(catalog);
    const items = Object.assign({}, state.items, catalog);
    let counts = Object.assign({}, state.counts);
    Object.keys(catalog).forEach((key) => {
      const {name} = catalog[key];
      const count = state.counts[name] || 0;
      counts = Object.assign({}, counts, {
        [name]: count
      });
    });
    const newState = Object.assign({}, state, {items, counts});
    return newState;
  }
  if (action.response && action.response.entities.catalog) {
    const {catalog} = action.response.entities;
    const items = Object.assign({}, state.items, catalog);
    let counts = Object.assign({}, state.counts);
    Object.keys(catalog).forEach((name) => {
      const count = state.counts[name] || 0;
      counts = Object.assign({}, counts, {
        [name]: count
      });
    });
    const newState = Object.assign({}, state, {items, counts});
    return newState;
  }
  if (action.type === INVENTORY_FILTER) {
    const newState = Object.assign({}, state, {filterTerm: action.query});
    return newState;
  }
  if (action.type === INVENTORY_CLEAR) {
    const counts = Object.assign({}, state.counts);
    Object.keys(counts).forEach((itemName) => {
      counts[itemName] = 0;
    });
    const newState = Object.assign({}, state, {counts});
    return newState;
  }
  if (action.type === INVENTORY_COUNT_CHANGE) {
    const counts = Object.assign({}, state.counts);
    counts[action.name] = action.count;
    const newState = Object.assign({}, state, {counts});
    return newState;
  }
  if (action.type === INVENTORY_ADD) {
    const items = Object.assign({}, state.items, {
      [action.name]: {materials: action.manifest, typeID: action.typeID}
    });
    const count = state.counts[action.name] || 0;
    const counts = Object.assign({}, state.counts, {
      [action.name]: count
    });
    const newState = Object.assign({}, state, {items, counts});
    return newState;
  }
  if (action.type === INVENTORY_REMOVE) {
    const items = Object.assign({}, state.items);
    delete items[action.name];
    const counts = Object.assing({}, state.counts);
    delete counts[action.name];
    const newState = Object.assign({}, state, {items, counts});
    return newState;
  }
  return state;
}
