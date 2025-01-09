
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
      // axios.defaults.headers.common['Authorization'] = action.payload;
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
      // delete axios.defaults.headers.common['Authorization'];
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
