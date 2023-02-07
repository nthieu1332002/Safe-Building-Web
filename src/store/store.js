import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false
        })
    ],
})
export default store;