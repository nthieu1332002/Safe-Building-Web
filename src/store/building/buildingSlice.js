import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import buildingAPI from "../../config/api/building/buildingAPI.js"

const { getBuildingAPI, searchBuildingAPI } = buildingAPI;


const buildingSlice = createSlice({
    name: "building",
    initialState: {
        buildings: [],
        loading: false,
        error: '',
        page: 1,
        size: 10,
        totalPage: 0,
        searchKey: '',
        sortBy: '',
        order: '',
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
                state.buildings = action.payload.res.data
                state.page = action.payload.res.pagination.page
                state.totalPage = action.payload.res.pagination.totalPage
                state.searchKey = action.payload.data.searchKey
                state.sortBy = action.payload.data.sortBy
                state.order = action.payload.data.order
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
            const response = {
                data, res
            }
            console.log(response);
            return response;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export default buildingSlice