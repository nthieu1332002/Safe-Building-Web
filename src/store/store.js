import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "./user/UserSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false
        })
    ],
})
export default store;