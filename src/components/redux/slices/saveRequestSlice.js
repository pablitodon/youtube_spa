import { createSlice } from "@reduxjs/toolkit";
const user = localStorage.getItem(`user`);
const saveRequestSlice = createSlice({
  name: "saveRequests",
  initialState: [],
  reducers: {
    addRequest: (state, action) => {
      state.push(action.payload);
      if (user) {
        localStorage.setItem(`${user}`, JSON.stringify(state));
      }
    },
    updateRequest: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
        localStorage.setItem(`${user}`, JSON.stringify(state));
      }
    },
    allStartResponse: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  addRequest,
  updateRequest,
  allStartResponse,
  setLocaleResponse,
} = saveRequestSlice.actions;
export default saveRequestSlice.reducer;
