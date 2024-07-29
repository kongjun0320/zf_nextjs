const { SET_USER_INFO } = require('./action-types');

const initialState = {
  currentUser: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        currentUser: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
