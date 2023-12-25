import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
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
    }
});

export const {
    fetchUsersStart, fetchUsersSuccess, fetchUsersFailure,
} = gmSlice.actions;

export default gmSlice.reducer;