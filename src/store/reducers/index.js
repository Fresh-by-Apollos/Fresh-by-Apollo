import fridgeReducer from "./fridgeReducer";
import singleFridgeItemReducer from "./singleFridgeItemReducer";
import { fridgeState } from "./fridgeReducer";
import { singleFridgeItemState } from "./singleFridgeItemReducer";

export const initialState = {
  fridgeState,
  singleFridgeItemState
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
  singleFridgeItemReducer
});
