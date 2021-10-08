import { firestore } from "firebase";

const userDocument = await firestore()
  .collection("users")
  .doc("Gbv1w0mCr9JBgDHwY5Zx")
  .get();

// Action Creators
const fetchUser = (item, dispatch) => {
  dispatch({ type: "ADD_TO_CART", payload: item });
};

export { addToCart };
