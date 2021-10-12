import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from 'react';
import { initialState, reducers } from './reducers';
import firebase, { auth } from '../firebase/firebase';
import { _setUser } from './reducers/userReducer';

const GlobalContext = createContext();

export const useStorage = () => {
  return useContext(GlobalContext);
};

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducers, initialState);
  const [loading, setLoading] = useState(true);

  const globalState = {
    fridgeState: state.fridgeState,
    userState: state.userState,
    state,
    dispatch,
  }; // <--- Add all Pieces of state here

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Setting user..');

      dispatch(_setUser(user));

      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <GlobalContext.Provider value={globalState}>
      {!loading && children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
