import initialState from "../initialState";

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      console.log(state);
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    }
    case "UPDATE_CART_ITEM": {
      return {
        ...state,
        cart: action.payload,
      };
    }
    // case "UPDATE_ITEM": {
    //     return {
    //         ...state,
    //         cart:
    //     }
    // }
    default:
      return state;
  }
};

export default cartReducer;
