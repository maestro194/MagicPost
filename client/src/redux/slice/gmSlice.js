import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    packages: [],
    error: null,
    loading: false
};

const gmSlice = createSlice({
    name: 'gm',
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
    }
});

export const {
    fetchUsersStart, fetchUsersSuccess, fetchUsersFailure,
    fetchPackagesStart, fetchPackagesSuccess, fetchPackagesFailure,
} = gmSlice.actions;

export default gmSlice.reducer;