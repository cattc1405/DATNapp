import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the initial state
const initialState = {
  user: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Create an async thunk for the login action
export const loginUser = createAsyncThunk('auth/loginUser', async userData => {
  const response = await axios.post(
    'https://app-datn-gg.onrender.com/api/v1/users/login',
    // 'http://localhost:3000/api/v1/users/login',
    userData,
  );
  await AsyncStorage.setItem('userToken', response.data.token);

  return response.data; // Adjust according to your API response
});

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      AsyncStorage.removeItem('userToken'); // Clear token on logout
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Save user data
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the reducer and actions
export const {logout} = authSlice.actions;
export default authSlice.reducer;
