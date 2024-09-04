/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const postLogin = async (formData) => {
  const response = await axios.post(
    import.meta.env.VITE_SOME_URL_REACT_APP_REGISTER_URL,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    }
  );
  return response
};


const fetchLoginPost =createAsyncThunk(
    'youtube/login',
    async(formData) => {
        const {data} = await postLogin(formData)
        return data
    }
)

const loginSlice = createSlice({
  name: "login",
  initialState: {},
  reducers: {},
  extraReducers:(builder) => {
    builder
     .addCase(fetchLoginPost.pending, (state, action) => {
        state.status = 'loading';
      })
     .addCase(fetchLoginPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        localStorage.setItem(`myToken`,action.payload.token);
        state.token = action.payload.token;
      })
     .addCase(fetchLoginPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export {fetchLoginPost}
export const { login } = loginSlice.actions;
export default loginSlice.reducer;
