import { addToCart, signup, login, logout } from "./actionCreators";
import React, {
  createContext,
  useState,
  useReducer,
  useEffect,
  useContext,
} from "react";

import initialState from "./initialState";
import { auth } from "../firebase/firebase";
import reducers from "./reducers";

export const GlobalContext = createContext();

export const useStorage = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Being Called");
      dispatch({ type: "SET_USER", payload: user });

      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        currentUser: state.currentUser,
        login,
        logout,
        signup,
        addToCart,
        dispatch,
      }}
    >
      {!loading && children}
    </GlobalContext.Provider>
  );
};
