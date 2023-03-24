import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import billAPI from "../../config/api/bill/billAPI";

const { getBillAPI, createBillAPI, getBillByIdAPI } = billAPI;

const billSlice = createSlice({
    name: "bill",
    initialState: {
        bills: [],
        billDetail: {},
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
            .addCase(getBill.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBill.fulfilled, (state, action) => {
                state.loading = false
                state.bills = action.payload.data.data
                state.page = action.payload.data.pagination.page
                state.totalPage = action.payload.data.pagination.totalPage
            })
            .addCase(getBill.rejected, (state, action) => {
                state.loading = false
                state.bills = []
                state.error = action.error.message
            })
            .addCase(createBill.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBill.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(createBill.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(getBillById.fulfilled, (state, action) => {
                state.billDetail = action.payload.data.data
            })
    }
})

export const getBill = createAsyncThunk(
    "bill/getBill",
    async (data, { rejectWithValue }) => {
        try {
            const res = await getBillAPI(data);
            return res;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const createBill = createAsyncThunk(
    "bill/createBill",
    async (data, { rejectWithValue }) => {
        try {
            const res = await createBillAPI(data);
            if (res.status === 201) {
                toast.success(res.data.message)
                return res
            }
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
);

export const getBillById = createAsyncThunk(
    "bill/getBillById",
    async (data, { rejectWithValue }) => {
        try {
            const res = await getBillByIdAPI(data);
            return res;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export default billSlice