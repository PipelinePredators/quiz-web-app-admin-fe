import { createSlice } from "@reduxjs/toolkit";

/* Creating a slice of the Redux store. */
export const SubjectSlice = createSlice({
    name: 'subjects',
    initialState: {
        value: [],
    },
    reducers: {
        setSubjectsState: (state, action) => {
            state.value = action.payload;
        }
    }
})

/* Exporting the setSubjectsState action from the SubjectSlice.actions object. */
export const { setSubjectsState } = SubjectSlice.actions;

/* Exporting the reducer function from the SubjectSlice.reducer object. */
export default SubjectSlice.reducer;