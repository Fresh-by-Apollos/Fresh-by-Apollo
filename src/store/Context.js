import React, { createContext, useReducer, useContext, Children } from "react";
import { initialState, reducers } from "./reducers";
import { fridgeState } from "./reducers/fridgeReducer";

const GlobalContext = createContext();

export const useStorage = () => {
  return useContext(GlobalContext);
};

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducers, { fridgeState });
  return (
    <GlobalContext.Provider
      value={{
        fridgeState: state.fridgeState,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
