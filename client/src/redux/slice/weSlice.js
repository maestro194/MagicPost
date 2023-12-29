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
        sendPackageStart: (state) => {
            state.loading = true;
        },
        sendPackageSuccess: (state, action) => {
            state.packages = action.payload;
            state.loading = false;
        },
        sendPackageFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        transferPackageStart: (state) => {
            state.loading = true;
        },
        transferPackageSuccess: (state, action) => {
            state.packages = action.payload;
            state.loading = false;
        },
        transferPackageFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});

export const { 
    fetchPackagesStart, fetchPackagesSuccess, fetchPackagesFailure,
    sendPackageStart, sendPackageSuccess, sendPackageFailure,
    transferPackageStart, transferPackageSuccess, transferPackageFailure,
} = weSlice.actions;

export default weSlice.reducer;