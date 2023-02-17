import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import userAPI from "../../config/api/user/userAPI"
import { toast } from "react-toastify";

const { loginAPI, loginWithGoogleAPI } = userAPI;

const userToken = Cookies.get('userToken')
    ? Cookies.get('userToken')
    : null

const refreshToken = Cookies.get('refreshToken')
    ? Cookies.get('refreshToken')
    : null

const users = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : null
const userSlice = createSlice({
    name: "user",
    initialState: {
        users,
        userToken,
        refreshToken,
        loading: false,
    },
    reducers: {
        logout: (state) => {
            console.log("cookie remove");
            Cookies.remove("userToken");
            Cookies.remove("refreshToken");
            state.userToken = null
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                Cookies.set('userToken', action.payload.data.accessToken, { expires: 1, path: '' })
                Cookies.set('refreshToken', action.payload.data.refreshToken, { expires: 1, path: '' })
                localStorage.setItem('users', JSON.stringify(action.payload.data.fullname));
                state.users = action.payload.data.fullname
                state.userToken = action.payload.data.accessToken
                state.refreshToken = action.payload.data.refreshToken
                state.loading = false
            })
            .addCase(login.rejected, (state) => {
                state.users = {}
                state.loading = false
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                Cookies.set('userToken', action.payload.data.accessToken, { expires: 1, path: '' })
                Cookies.set('refreshToken', action.payload.data.refreshToken, { expires: 1, path: '' })
                localStorage.setItem('users', JSON.stringify(action.payload.data.fullname));
                state.users = action.payload.data.fullname
                state.userToken = action.payload.data.accessToken
                state.refreshToken = action.payload.data.refreshToken
            })
            .addCase(loginWithGoogle.rejected, (state) => {
                state.users = {}
            })
    }
})

export const login = createAsyncThunk(
    "user/login",
    async (data, { rejectWithValue }) => {
        try {
            const res = await loginAPI(data)
            if (res.status === "202 ACCEPTED") {
                toast.success(res.message)
                return res
            } else {
                toast.error(res.message)
                return rejectWithValue(res)
            }
        } catch (err) {
            toast.error("Login failed! Check your info again.")
            return rejectWithValue()
        }
    }
);


export const loginWithGoogle = createAsyncThunk(
    "user/loginWithGoogle",
    async (data, { rejectWithValue }) => {
        try {
            const res = await loginWithGoogleAPI(data)
            if (res.status === "202 ACCEPTED") {
                toast.success(res.message)
                return res
            } else {
                toast.error(res.message)
                return rejectWithValue(res)
            }
        } catch (err) {
            toast.error("Login failed! Check your info again.")
            return rejectWithValue()
        }
    }
);

export const { logout } = userSlice.actions;
export default userSlice