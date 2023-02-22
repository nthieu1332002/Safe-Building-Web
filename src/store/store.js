import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import contractSlice from "./contract/contractSlice";
import residentSlice from "./resident/residentSlice";
import serviceSlice from "./service/serviceSlice";
import userSlice from "./user/userSlice";
import flatSlice from "./flat/flatSlice.js";
import buildingSlice from "./building/buildingSlice.js";


const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        resident: residentSlice.reducer,
        contract: contractSlice.reducer,
        service: serviceSlice.reducer,
        flat: flatSlice.reducer,
        building: buildingSlice.reducer,
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false
        })
    ],
})
export default store;