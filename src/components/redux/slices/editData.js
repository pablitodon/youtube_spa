/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const editDataSlice = createSlice({
  name: "editData",
  initialState: {
    data: "",
  },
  reducers: {
    editDataFunc: (state, action) => {
      state.data = action.payload;
    },
    resetEditData: (state) => {
      state.data = "";
    },
    editDataQuery: (state, action) => {
      state.data.query = action.payload;
    },
    editDataType: (state, action) => {
      state.data.type = action.payload;
    },
  },
});

export const { editDataFunc, resetEditData, editDataQuery, editDataType } =
  editDataSlice.actions;
export default editDataSlice.reducer;
