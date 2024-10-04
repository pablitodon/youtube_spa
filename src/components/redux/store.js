/* eslint-disable no-undef */
import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import searchYoutubeSlice from "./slices/searchYoutubeSlice";
import resultTextSlice from "./slices/resultTextSlice";
import visibleModalSlice from "./slices/visibleModalSlice";
import saveRequestSlice from "./slices/saveRequestSlice";
import editDataSlice from "./slices/editData";

const store = configureStore({
  reducer: {
    login: loginSlice,
    youtubeSearch: searchYoutubeSlice,
    textResultSearch: resultTextSlice,
    isVisibleModal: visibleModalSlice,
    saveRequests: saveRequestSlice,
    editDataFavorite: editDataSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
