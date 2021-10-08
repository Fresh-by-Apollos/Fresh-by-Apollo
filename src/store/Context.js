import React, { createContext, useReducer, useContext } from "react";
import { initialState, reducers } from "./reducers";

const GlobalContext = createContext();

export const useStorage = () => {
  return useContext(GlobalContext);
};

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducers, initialState);
  return (
    <GlobalContext.Provider
      value={{
        fridgeState: state.fridgeState,
        state,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
