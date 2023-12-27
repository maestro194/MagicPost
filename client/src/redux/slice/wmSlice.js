import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    packages: [],
    error: null,
    loading: false
};

const wmSlice = createSlice({
    name: 'wm',
    initialState,
    reducers: {
        fetchUsersStart: (state) => {
            state.loading = true;
        },
        fetchUsersSuccess: (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = null;
        },
        fetchUsersFailure: (state, action) => {
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
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchOfficesStart: (state) => {
            state.loading = true;
        },
        fetchOfficesSuccess: (state, action) => {
            state.loading = false;
            state.offices = action.payload;
            state.error = null;
        },
        fetchOfficesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    fetchUsersStart, fetchUsersSuccess, fetchUsersFailure,
    fetchPackagesStart, fetchPackagesSuccess, fetchPackagesFailure,
    deleteUserFailure, deleteUserStart, deleteUserSuccess,
    fetchOfficesStart, fetchOfficesSuccess, fetchOfficesFailure
} = wmSlice.actions;

export default wmSlice.reducer;