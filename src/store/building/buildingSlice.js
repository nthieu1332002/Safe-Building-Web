import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import buildingAPI from "../../config/api/building/buildingAPI.js"

const { getBuildingFilterAPI, createBuildingAPI  } = buildingAPI;


const buildingSlice = createSlice({
    name: "building",
    initialState: {
        buildings: [],
        buildingList: [],
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
                state.buildings = action.payload.res.data.data
                state.page = action.payload.res.data.pagination.page
                state.totalPage = action.payload.res.data.pagination.totalPage
                state.searchKey = action.payload.data.searchKey
                state.sortBy = action.payload.data.sortBy
                state.order = action.payload.data.order
            })
            .addCase(getBuilding.rejected, (state, action) => {
                state.loading = false
                state.buildings = []
                state.error = action.error.message
            })
            .addCase(getAllBuilding.fulfilled, (state, action) => {
                state.buildingList = action.payload.data.data
            })
            .addCase(createBuilding.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBuilding.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(createBuilding.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const getBuilding = createAsyncThunk(
    "building/getBuilding",
    async (data, { rejectWithValue }) => {
        try {
            const res = await getBuildingFilterAPI(data);
            const response = {
                data, res
            }
            return response;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const getAllBuilding = createAsyncThunk(
    "building/getAllBuilding",
    async (data, { rejectWithValue }) => {
        try {
            const res = await getBuildingFilterAPI(data);
            return res;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const createBuilding = createAsyncThunk(
    "building/createBuilding",
    async (data, { rejectWithValue }) => {
        try {
            const res = await createBuildingAPI(data);
            if (res.status === 201) {
                toast.success(res.data.message)
                return res
            }
        } catch (err) {
            console.log("err", err);
            return rejectWithValue(err.response.data)
        }
    }
);

export default buildingSlice