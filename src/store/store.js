import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import residentSlice from "./resident/residentSlice";
import userSlice from "./user/userSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        resident: residentSlice.reducer,
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false
        })
    ],
})
export default store;