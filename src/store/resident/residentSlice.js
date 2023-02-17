import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import residentAPI from "../../config/api/resident/residentAPI"

const { getResidentAPI } = residentAPI;


const residentSlice = createSlice({
    name: "resident",
    initialState: {
        residents: [],
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
            .addCase(getResident.pending, (state) => {
                state.loading = true;
            })
            .addCase(getResident.fulfilled, (state, action) => {
                state.loading = false
                state.residents = action.payload.data
                state.page = action.payload.pagination.page
                state.totalPage = action.payload.pagination.totalPage
            })
            .addCase(getResident.rejected, (state, action) => {
                state.loading = false
                state.resident = []
                state.error = action.error.message
            })

    }
})

export const getResident = createAsyncThunk(
    "resident/getResident",
    async (data, { rejectWithValue }) => {
        try {
            const res = await getResidentAPI(data);
            return res;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);


export default residentSlice