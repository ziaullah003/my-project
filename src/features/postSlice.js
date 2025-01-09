import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: [],
  reducers: {
    setPosts: (state, action) => action.payload,
    addPost: (state, action) => {
      state.push(action.payload);
    },
    deletePost: (state, action) => {
      return state.filter(post => post._id !== action.payload);
    },
  },
});

export const { setPosts, addPost, deletePost } = postSlice.actions;
export default postSlice.reducer;
