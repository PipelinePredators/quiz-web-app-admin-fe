import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

/* Creating a slice of state. */
export const TakeQuizSlice = createSlice({
    name: 'takeQuiz',
    initialState: {
        quiz: [],
    },
    reducers: {
        setTakeQuizState: (state, action) => {
            state.quiz = action.payload;
        },
        removeTakeQuizState:()=>{
            storage.removeItem('persist:takeQuiz');
        }
    }
})

/* Exporting the action creator function. */
export const { setTakeQuizState } = TakeQuizSlice.actions;
export const {removeTakeQuizState} = TakeQuizSlice.actions;

/* Exporting the reducer function. */
export default TakeQuizSlice.reducer;