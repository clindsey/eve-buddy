import {CALL_API, schemas} from '../middleware/api';
import {REQUEST, SUCCESS, FAILURE} from '../constants/materials';

function fetchMaterials (itemID) {
  return {
    [CALL_API]: {
      types: [REQUEST, SUCCESS, FAILURE],
      endpoint: `materials/${itemID}`,
      schema: schemas.MATERIAL_ARRAY
    }
  };
}

export function loadMaterials (itemID) {
  return (dispatch) => {
    return dispatch(fetchMaterials(itemID));
  };
}
