import React, { createContext, useReducer } from "react";

// Create context for the global state
export const Store = createContext();

// Initial state for the store
const initialState = {
  cart: {
    cartItems: [],
  },
};

// Reducer function to handle actions
function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      // Add item to the cart
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [...state.cart.cartItems, action.payload], // Add payload (item) to cart
        },
      };
    default:
      return state;
  }
}

// StoreProvider to wrap the app and provide global state
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState); // useReducer to manage state
  const value = { state, dispatch }; // Value to pass down to the context
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
