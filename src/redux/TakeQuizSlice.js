import { createSlice } from "@reduxjs/toolkit";

/* Creating a slice of state. */
export const TakeQuizSlice = createSlice({
    name: 'takeQuiz',
    initialState: {
        quiz: [],
    },
    reducers: {
        setTakeQuizState: (state, action) => {
            state.quiz = action.payload;
        }
    }
})

/* Exporting the action creator function. */
export const { setTakeQuizState } = TakeQuizSlice.actions;

/* Exporting the reducer function. */
export default TakeQuizSlice.reducer;