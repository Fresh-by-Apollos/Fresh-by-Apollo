import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import { initialState, reducers } from "./reducers";
import firebase, { auth } from "../firebase/firebase";
import { _setUser } from "./reducers/userReducer";

const GlobalContext = createContext();

export const useStorage = () => {
  return useContext(GlobalContext);
};

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducers, initialState);
  const [loading, setLoading] = useState(true);

  const globalState = {
    fridgeState: state.fridgeState,
    scannedItem: state.scannedItem,
    userState: state.userState,
    lookUpItem: state.lookUpItem,
    isLoading: loading,
    onBoarded: state.userState.onBoarded,
    state,
    dispatch,
  }; // <--- Add all Pieces of state here

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist.");
              return;
            } else {
              const userData = firestoreDocument.data();
              dispatch(_setUser(userData));
              console.log("User found..");
            }
          });
      } else {
        dispatch(_setUser(null));
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
