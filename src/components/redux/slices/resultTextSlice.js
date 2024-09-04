import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    resultText : ''
}


const resultTextSlice = createSlice({
    name: 'textResultSearch',
    initialState,
    reducers: { 
        setResultText: (state, action) => {
            state.resultText = action.payload
        }
    }
})

export const { setResultText } = resultTextSlice.actions

export default resultTextSlice.reducer;