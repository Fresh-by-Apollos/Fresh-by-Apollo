// Action Creators
const addToCart = (item, dispatch) => {
  dispatch({ type: "ADD_TO_CART", payload: item });
};

export { addToCart };
