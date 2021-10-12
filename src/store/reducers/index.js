import fridgeReducer from './fridgeReducer';
import { fridgeState } from './fridgeReducer';
import userReducer, { userState } from './userReducer';

export const initialState = {
  fridgeState,
  userState,
};

const combineReducers = (reducers) => {
  return (state, action) => {
    return Object.keys(reducers).reduce((acc, prop) => {
      return {
        ...acc,
        ...reducers[prop]({ [prop]: acc[prop] }, action),
      };
    }, state);
  };
};

export const reducers = combineReducers({
  fridgeReducer,
  userReducer,
});
