import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import contractSlice from "./contract/contractSlice";
import residentSlice from "./resident/residentSlice";
import userSlice from "./user/userSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        resident: residentSlice.reducer,
        contract: contractSlice.reducer,
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false
        })
    ],
})
export default store;