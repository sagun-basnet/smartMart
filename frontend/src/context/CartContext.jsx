import React, { createContext, useContext, useReducer } from 'react';

// Create Context for Cart
const CartContext = createContext();


// Cart Reducer to manage cart state
const cartReducer = (state, action) => {
  switch (action.type) {

    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };

      case 'REMOVE_SELECTED':
        return {
          ...state,
          cart: state.cart.filter(item => !action.payload.includes(item.id)),
          selectedItems: state.selectedItems.filter(id => !action.payload.includes(id)),
        };

    case 'TOGGLE_SELECT_ITEM':
      return {
        ...state,
        selectedItems: state.selectedItems.includes(action.payload)
          ? state.selectedItems.filter(id => id !== action.payload)
          : [...state.selectedItems, action.payload]
      };

    case 'SELECT_ALL_ITEMS':
      return {
        ...state,
        selectedItems: state.selectedItems.length === state.cart.length ? [] : state.cart.map(item => item.id)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, item.quantity + (action.payload.type === 'increase' ? 1 : -1)) }
            : item
        )
      };


    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};


// CartProvider component to wrap around the application
// Update initialState to include selectedItems
const initialState = { cart: [], selectedItems: [] };

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
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

