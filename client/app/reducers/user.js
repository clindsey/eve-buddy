function getDefaultState () {
  return {
    name: undefined,
    isAuthorized: false
  };
}

export default function (state = getDefaultState(), action) {
  if (action.response && action.response.entities && action.response.entities.user) {
    const {user} = action.response.entities.user[0];
    const isAuthorized = !(!user || user.error || !user.name);
    const newState = Object.assign({}, state, user, {isAuthorized});
    return newState;
  }
  return state;
}
