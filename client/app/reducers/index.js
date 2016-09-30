import {routerReducer as routing} from 'react-router-redux';
import {combineReducers} from 'redux';
import entities from './entities';
import inventory from './inventory';
import user from './user';

const rootReducer = combineReducers({
  entities,
  inventory,
  routing,
  user
});

export default rootReducer;
