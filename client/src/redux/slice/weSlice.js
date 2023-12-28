import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    packages: [],
    error: null,
    loading: false
};

const weSlice = createSlice({
    name: 'we',
    initialState,
    reducers: {
        fetchPackagesStart: (state) => {
            state.loading = true;
        },
        fetchPackagesSuccess: (state, action) => {
            state.packages = action.payload;
            state.loading = false;
        },
        fetchPackagesFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});

export const { 
    fetchPackagesStart, fetchPackagesSuccess, fetchPackagesFailure
} = weSlice.actions;

export default weSlice.reducer;