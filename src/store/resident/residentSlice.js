import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import residentAPI from "../../config/api/resident/residentAPI"
import { toast } from "react-toastify";
const { getResidentAPI, createResidentAccountAPI, getResidentAccountByIdAPI } = residentAPI;


const residentSlice = createSlice({
    name: "resident",
    initialState: {
        residents: [],
        residentDetail: {},
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
            .addCase(createResident.pending, (state) => {
                state.loading = true;
            })
            .addCase(createResident.fulfilled, (state, action) => {
                state.loading = false
                state.residents = action.payload.data
                state.page = action.payload.pagination.page
                state.totalPage = action.payload.pagination.totalPage
            })
            .addCase(createResident.rejected, (state, action) => {
                state.loading = false
                state.resident = []
                state.error = action.error.message
            })
            .addCase(getResidentById.fulfilled, (state, action) => {
                state.residentDetail = action.payload.data
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

export const createResident = createAsyncThunk(
    "resident/createResident",
    async (data, { rejectWithValue }) => {
        try {
            const res = await createResidentAccountAPI(data);
            if (res.status === "202 ACCEPTED") {
                toast.success(res.message)
                return res
            } else {
                toast.error(res.message)
                return rejectWithValue(res)
            }
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
);

export const getResidentById = createAsyncThunk(
    "resident/getResidentById",
    async (data, { rejectWithValue }) => {
        try {
            const res = await getResidentAccountByIdAPI(data);
            return res;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);


export default residentSlice