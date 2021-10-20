import fridgeReducer, { fridgeState } from "./fridgeReducer";
import barcodeReducer, { scannedItem } from "./barcodeReducer";
import userReducer, { userState } from "./userReducer";
import lookUpReducer, { lookUpItem } from "./lookUpReducer";

export const initialState = {
  fridgeState,
  scannedItem,
  userState,
  lookUpItem,
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
  lookUpReducer,
});
