import cartReducer from "./cartReducer";
import authReducer from "./authReducer";

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

const reducers = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

export default reducers;
