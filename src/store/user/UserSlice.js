import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import userAPI from "../../config/api/user/userAPI"

const { loginAPI, loginWithGoogleAPI } = userAPI;

const userToken = Cookies.get('userToken')
    ? Cookies.get('userToken')
    : null

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        userToken,
        loading: false,
        error: '',
    },
    reducers: {
        logout: (state) => {
            Cookies.remove("userToken");
            state.userToken = null
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.user = []
                state.error = action.error.message
            })
            .addCase(loginWithGoogle.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.loading = true;
                state.user = action.payload
                state.error = ''
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.loading = false
                state.user = []
                state.error = action.error.message
            })
    }
})

export const login = createAsyncThunk(
    "user/login",
    async (data, { rejectWithValue }) => {
        try {
            const res = await loginAPI(data);
            Cookies.set("token", res.token, { expires: 1, path: '' })
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
);


export const loginWithGoogle = createAsyncThunk(
    "user/loginWithGoogle",
    async (data, { rejectWithValue }) => {
        try {
            const res = await loginWithGoogleAPI(data);
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
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