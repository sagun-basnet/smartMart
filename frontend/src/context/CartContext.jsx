import React, { createContext, useContext, useEffect, useReducer } from "react";

// Create Context for Cart
const CartContext = createContext();

// Cart Reducer to manage cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newCartItem = {
        ...action.payload,
        id: Date.now(), // or use uuid if available
        image: action.payload.images?.[0]
          ? `http://localhost:5555${action.payload.images[0]}`
          : null,
        quantity: 1,
      };

      return {
        ...state,
        cart: [...state.cart, newCartItem],
      };

    case "REMOVE_SELECTED":
      return {
        ...state,
        cart: state.cart
          ? state.cart.filter((item) => !action.payload.includes(item.id))
          : [],
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: Math.max(
                  1,
                  item.quantity + (action.payload.type === "increase" ? 1 : -1)
                ),
              }
            : item
        ),
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// CartProvider component to wrap around the application
const initialState = { cart: [] };

const getInitialCart = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? { cart: JSON.parse(savedCart) } : initialState;
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, getInitialCart());
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);
  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

// Custom hook to use Cart context
export const UseCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
