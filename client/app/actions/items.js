import {CALL_API, schemas} from '../middleware/api';
import {REQUEST, SUCCESS, FAILURE} from '../constants/items';

function fetchItems (query) {
  return {
    [CALL_API]: {
      types: [REQUEST, SUCCESS, FAILURE],
      endpoint: `items?q=${encodeURI(query)}`,
      schema: schemas.ITEM_ARRAY
    }
  };
}

export function loadItems (query) {
  return (dispatch) => {
    return dispatch(fetchItems(query));
  };
}
