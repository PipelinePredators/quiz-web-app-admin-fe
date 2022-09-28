import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import subjectReducer from './SubjectSlice'
import takeQuizReducer from './TakeQuizSlice'

const subjectConfig = {
    key: 'subject',
    version: 1,
    storage: storage,
    whitelist: ['value']
}

const takeQuizConfig = {
    key: 'takeQuiz',
    version: 1,
    storage
}


const store = configureStore({
    reducer: {
        subject: persistReducer(subjectConfig, subjectReducer),
        takeQuiz: persistReducer(takeQuizConfig, takeQuizReducer),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

let persistor = persistStore(store);

export { store, persistor }