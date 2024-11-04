import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import cartReducer from './slice/cartSlice';
import userReducer from './slice/userSlice';

import thunk from 'redux-thunk';
const getDefaultMiddleware = () => configureStore.getDefaultMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    user: userReducer,
  },
  // middleware: () => [...getDefaultMiddleware(), thunk],
});
export default store;
