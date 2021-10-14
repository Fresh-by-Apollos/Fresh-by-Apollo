import fridgeReducer, { fridgeState } from "./fridgeReducer";
import barcodeReducer, { scannedItem } from "./barcodeReducer";
import userReducer, { userState } from "./userReducer";

export const initialState = {
  fridgeState,
  scannedItem,
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
  barcodeReducer,
  userReducer,
});
