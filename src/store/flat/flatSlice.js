import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import flatAPI from "../../config/api/flat/flatAPI.js"

const { getFlatAPI } = flatAPI;


const flatSlice = createSlice({
    name: "flat",
    initialState: {
        flats: [],
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
            .addCase(getFlat.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFlat.fulfilled, (state, action) => {
                state.loading = false
                state.flats = action.payload.data
                state.page = action.payload.pagination.page
                state.totalPage = action.payload.pagination.totalPage
            })
            .addCase(getFlat.rejected, (state, action) => {
                state.loading = false
                state.flat = []
                state.error = action.error.message
            })

    }
})

export const getFlat = createAsyncThunk(
    "flat/getFlat",
    async (data, { rejectWithValue }) => {
        try {
            const res = await getFlatAPI(data);
            return res;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);


export default flatSlice