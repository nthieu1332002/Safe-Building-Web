import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import buildingAPI from "../../config/api/building/buildingAPI.js"

const { getBuildingAPI } = buildingAPI;


const buildingSlice = createSlice({
    name: "building",
    initialState: {
        buildings: [],
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
            .addCase(getBuilding.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBuilding.fulfilled, (state, action) => {
                state.loading = false
                state.buildings = action.payload.data
                state.page = action.payload.pagination.page
                state.totalPage = action.payload.pagination.totalPage
            })
            .addCase(getBuilding.rejected, (state, action) => {
                state.loading = false
                state.buildings = []
                state.error = action.error.message
            })

    }
})

export const getBuilding = createAsyncThunk(
    "building/getBuilding",
    async (data, { rejectWithValue }) => {
        try {
            const res = await getBuildingAPI(data);
            return res;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);


export default buildingSlice