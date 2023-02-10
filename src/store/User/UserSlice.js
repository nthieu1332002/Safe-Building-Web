import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "../../config/api/user/userAPI"

const { loginAPI } = userAPI;

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: [],
        status: "idle",
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(loginWithGoogle.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(loginWithGoogle.fulfilled, (state, action) => {
            state.status = 'success';
            state.user = action.payload
        })
    }
})

export const loginWithGoogle = createAsyncThunk(
    "user/loginWithGoogle",
    async (data) => {
        const res = await loginAPI(data);
        return res;
    }
);

// export const setProfile = createAsyncThunk(
//     "user/setProfile",
//     async (data) => {
//         const value = {
//             firstName: data.firstName,
//             lastName: data.lastName,
//             phone: data.phone,
//         }
//         try {
//             await setDoc(doc(db, "users", data.uid), value);
//             toast.success("Update your information successfully!", {
//                 position: toast.POSITION.BOTTOM_RIGHT,
//                 className: "foo-bar",
//             });
//             return value
//         } catch (err) {
//             toast.error("Update your information failed!", {
//                 position: toast.POSITION.BOTTOM_RIGHT,
//                 className: "foo-bar",
//             });
//             console.log(err);
//         }
//     }
// );

// export const { logIn, logOut } = userSlice.actions;
export default userSlice