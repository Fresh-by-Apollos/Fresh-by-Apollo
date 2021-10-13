import fridgeReducer from "./fridgeReducer";
import { fridgeState } from "./fridgeReducer";
import { scannedItem } from "./barcodeReducer";
import barcodeReducer from "./barcodeReducer";

export const initialState = {
  fridgeState,
  scannedItem,
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
});
