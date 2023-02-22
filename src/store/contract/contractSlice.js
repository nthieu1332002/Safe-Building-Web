import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contractAPI from "../../config/api/contract/contractAPI";

const { getContractAPI, postContractAPI } = contractAPI;

const contractSlice = createSlice({
    name: "contract",
    initialState: {
        contracts: [],
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
            .addCase(getContract.pending, (state) => {
                state.loading = true;
            })
            .addCase(getContract.fulfilled, (state, action) => {
                state.loading = false
                state.contracts = action.payload.data
                state.page = action.payload.pagination.page
                state.totalPage = action.payload.pagination.totalPage
            })
            .addCase(getContract.rejected, (state, action) => {
                state.loading = false
                state.contracts = []
                state.error = action.error.message
            })
            .addCase(postContract.pending, (state) => {
                state.loading = true;
            })
            .addCase(postContract.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(postContract.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

    }
})

export const getContract = createAsyncThunk(
    "contract/getContract",
    async (data, { rejectWithValue }) => {
        try {
            const res = await getContractAPI(data);
            return res;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);


export const postContract = createAsyncThunk(
    "contract/postContract",
    async (data, { rejectWithValue }) => {
        try {
            const res = await postContractAPI(data);
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
);


export default contractSlice