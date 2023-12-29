import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactions: [],
    error: null,
    loading: false
};

const transactionSlice = createSlice({

    name: 'transaction',
    initialState,
    reducers: {
        createTransactionStart: (state) => {
            state.loading = true;
        },
        createTransactionSuccess: (state, action) => {
            state.loading = false;
            state.transactions = action.payload;
            state.error = null;
        },
        createTransactionFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchTransactionsStart: (state) => {
            state.loading = true;
        },
        fetchTransactionsSuccess: (state, action) => {
            state.loading = false;
            state.transactions = action.payload;
            state.error = null;
        },
        fetchTransactionsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchTransactionStart: (state) => {
            state.loading = true;
        },
        fetchTransactionSuccess: (state, action) => {
            state.loading = false;
            state.transactions = action.payload;
            state.error = null;
        },
        fetchTransactionFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    createTransactionStart,
    createTransactionSuccess,
    createTransactionFailure,
    fetchTransactionsStart,
    fetchTransactionsSuccess,
    fetchTransactionsFailure,
    fetchTransactionStart,
    fetchTransactionSuccess,
    fetchTransactionFailure,
} = transactionSlice.actions;

export default transactionSlice.reducer;
