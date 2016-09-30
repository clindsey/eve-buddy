import {CALL_API, schemas} from '../middleware/api';
import {REQUEST, SUCCESS, FAILURE} from '../constants/blueprints';

function fetchBlueprint (itemID) {
  return {
    [CALL_API]: {
      types: [REQUEST, SUCCESS, FAILURE],
      endpoint: `blueprints/${itemID}`,
      schema: schemas.BLUEPRINT
    }
  };
}

export function loadBlueprint (itemID) {
  return (dispatch) => {
    return dispatch(fetchBlueprint(itemID));
  };
}
