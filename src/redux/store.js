import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import cartReducer from './slice/cartSlice';
import thunk from 'redux-thunk';
const getDefaultMiddleware = () => configureStore.getDefaultMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  // middleware: () => [...getDefaultMiddleware(), thunk],
});
export default store;
