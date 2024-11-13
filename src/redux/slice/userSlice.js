import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  gender: '',
  password: '',
  email: '',
  phone: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
  },
});

export const {setName, setGender, setPassword, setEmail, setPhone} =
  userSlice.actions;
export default userSlice.reducer;
