import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serviceAPI from "../../config/api/service/serviceAPI"

const { getServiceAPI } = serviceAPI;


const serviceSlice = createSlice({
    name: "service",
    initialState: {
        services: [],
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
            .addCase(getService.pending, (state) => {
                state.loading = true;
            })
            .addCase(getService.fulfilled, (state, action) => {
                state.loading = false
                state.services = action.payload.data
                state.page = action.payload.pagination.page
                state.totalPage = action.payload.pagination.totalPage
            })
            .addCase(getService.rejected, (state, action) => {
                state.loading = false
                state.service = []
                state.error = action.error.message
            })

    }
})

export const getService = createAsyncThunk(
    "service/getService",
    async (data, { rejectWithValue }) => {
        try {
            const res = await getServiceAPI(data);
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
);


export default serviceSlice