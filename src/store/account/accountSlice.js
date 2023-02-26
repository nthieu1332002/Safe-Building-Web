import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountAPI from "../../config/api/account/accountAPI.js"

const { getAdminAccountAPI, getCustomerAccountAPI, createCustomerAccountAPI } = accountAPI;


const accountSlice = createSlice({
    name: "account",
    initialState: {
        adminAccounts: [],
        customerAccounts: [],
        loading: false,
        error: '',
        page: 1,
        size: 10,
        totalPage: 0,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAdminAccount.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAdminAccount.fulfilled, (state, action) => {
                state.loading = false
                state.adminAccounts = action.payload.data
                state.page = action.payload.pagination.page
                state.totalPage = action.payload.pagination.totalPage
            })
            .addCase(getAdminAccount.rejected, (state, action) => {
                state.loading = false
                state.adminAccounts = []
                state.error = action.error.message
            })
            .addCase(getCustomerAccount.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCustomerAccount.fulfilled, (state, action) => {
                state.loading = false
                state.customerAccounts = action.payload.data
                state.page = action.payload.pagination.page
                state.totalPage = action.payload.pagination.totalPage
            })
            .addCase(getCustomerAccount.rejected, (state, action) => {
                state.loading = false
                state.customerAccounts = []
                state.error = action.error.message
            })
    }
})

export const getAdminAccount = createAsyncThunk(
    "account/getAdminAccount",
    async (data, { rejectWithValue }) => {
        try {
            const res = await getAdminAccountAPI(data);
            console.log(res);
            return res;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const getCustomerAccount = createAsyncThunk(
    "account/getCustomerAccount",
    async (data, { rejectWithValue }) => {
        try {
            const res = await getCustomerAccountAPI(data);
            return res;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);


export const createCustomerAccount = createAsyncThunk(
    "account/createCustomerAccount",
    async (data, { rejectWithValue }) => {
        try {
            const res = await createCustomerAccountAPI(data);
            return res;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export default accountSlice