import { createReducer } from "@reduxjs/toolkit";

export const orderReducer = createReducer({
    orders: [],
    order: {},
    cartItems: [],
    loading: false,
    error: null,
    user: {},

}, (builder) => {
    builder
        .addCase("placeOrderRequest", (state) => {
            state.loading = true;
        })
        .addCase("processOrderRequest", (state) => {
            state.loading = true;
        })
        .addCase("placeOrderSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("placeOrderFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("processOrderSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("processOrderFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("getOrderDetailsRequest", (state) => {
            state.loading = true;
        })
        .addCase("getOrderDetailsSuccess", (state, action) => {
            state.loading = false;
            state.order = action.payload;
        })
        .addCase("getOrderDetailsFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


    builder.addCase("clearError", (state) => {
        state.error = null;
    });

    builder.addCase("clearMessage", (state) => {
        state.message = null;
    });
});