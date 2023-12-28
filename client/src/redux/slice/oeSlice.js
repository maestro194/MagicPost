import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    packages: [],
    error: null,
    loading: false
};

const oeSlice = createSlice({
    name: 'oe',
    initialState,
    reducers: {
        createPackagesStart: (state) => {
            state.loading = true;
        },
        createPackagesSuccess: (state, action) => {
            state.loading = false;
            state.packages = action.payload;
            state.error = null;
        },
        createPackagesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchPackagesStart: (state) => {
            state.loading = true;
        },
        fetchPackagesSuccess: (state, action) => {
            state.loading = false;
            state.packages = action.payload;
            state.error = null;
        },
        fetchPackagesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const { 
    createPackagesStart, createPackagesSuccess, createPackagesFailure,
    fetchPackagesStart, fetchPackagesSuccess, fetchPackagesFailure,
} = oeSlice.actions;

export default oeSlice.reducer;