import {CALL_API, schemas} from '../middleware/api';
import {REQUEST, SUCCESS, FAILURE} from '../constants/user';

function fetchUser () {
  return {
    [CALL_API]: {
      types: [REQUEST, SUCCESS, FAILURE],
      endpoint: 'user',
      schema: schemas.USER
    }
  };
}

export function loadUser () {
  return (dispatch) => {
    return dispatch(fetchUser());
  };
}
