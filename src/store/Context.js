import React, { createContext, useReducer, useContext } from 'react';
import { initialState, reducers } from './reducers';

const GlobalContext = createContext();

export const useStorage = () => {
  return useContext(GlobalContext);
};

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducers, initialState);

  const globalState = {
    fridgeState: state.fridgeState,
    state,
    dispatch,
  }; // <--- Add all Pieces of state here

  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
