import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contractAPI from "../../config/api/contract/contractAPI";

const { postContractAPI } = contractAPI;

const contractSlice = createSlice({
    name: "contract",
    initialState: {
        file: [],
        customerId: [] ,
        flatId: [] ,
        rentContractId: [] ,
        loading: false,      
        error: '',
        
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(postContract.pending, (state) => {
                state.loading = true;
            })
            .addCase(postContract.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(postContract.rejected, (state, action) => {
                state.loading = false
                state.user = []
                state.error = action.error.message
            })
            
    }
})
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