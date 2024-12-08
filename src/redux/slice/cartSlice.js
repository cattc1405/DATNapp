// src/store/cartSlice.js
import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array of cart items
    transactionId: null, // Global transaction ID for the cart
  },
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setTransactionId: (state, action) => {
      state.transactionId = action.payload; // Save transaction ID here
    },
    clearCart: state => {
      state.items = []; // Clears the cart items
      state.transactionId = null; // Optionally reset the transaction ID
    },
  },
});

export const {
  setCartItems,
  incrementQuantity,
  decrementQuantity,
  removeCartItem,
  setTransactionId,
  clearCart, // Export the action to set the transaction ID
} = cartSlice.actions;
export default cartSlice.reducer;
