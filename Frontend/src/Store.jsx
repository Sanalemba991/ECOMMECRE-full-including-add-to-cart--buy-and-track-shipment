import React, { createContext, useReducer } from "react";

// Create context for the global state
export const Store = createContext();

// Initial state for the store
const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

// Reducer function to handle actions related to the cart
function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      // Update localStorage before returning the new state
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };

    case "CART_REMOVE_ITEM":
      const updatedCartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      // Update localStorage before returning the new state
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      return { ...state, cart: { ...state.cart, cartItems: updatedCartItems } };

    default:
      return state;
  }
}

// StoreProvider to wrap the app and provide global state
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
