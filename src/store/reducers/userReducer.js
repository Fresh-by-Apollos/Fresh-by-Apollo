// initial State
export const userState = {};

// Action Types
const SET_USER = 'SET_USER';

// Action Creators
export const _setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case SET_USER: {
      return { ...state, userState: action.user };
    }
    default:
      return state;
  }
};

export default userReducer;
