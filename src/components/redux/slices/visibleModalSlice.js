import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisibleModal : false
};

const visibleModalSlice = createSlice({
    name: 'visibleModal',
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.isVisibleModal = !state.isVisibleModal
        }
    }
})

export const { toggleModal } = visibleModalSlice.actions
export default visibleModalSlice.reducer;