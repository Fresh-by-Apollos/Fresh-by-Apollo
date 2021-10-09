// Action Constant
const ADD_TO_CART = 'ADD_TO_CART';

// Action Creators
const addToCart = (item, dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: item });
};

export const cartState = [];

const cartReducer = (state = cartState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      return {
        cart: [...state.cart, action.payload],
      };
    }
    case 'UPDATE_CART_ITEM': {
      return {
        cart: action.payload,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
