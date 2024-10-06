import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer({ users: [], user: {}, loading: false, error: null, }, (builder) => {
    builder
        .addCase("loginRequest", (state) => {
            state.loading = true;
        })
        .addCase("loadUserRequest", (state) => {
            state.loading = true;
        })
        .addCase("logoutRequest", (state) => {
            state.loading = true;
        })
        .addCase("registerRequest", (state) => {
            state.loading = true;
        })
        .addCase("verifyTokenRequest", (state) => {
            state.loading = true;
        })
        .addCase("getAllUsersRequest", (state) => {
            state.loading = true;
        })
        .addCase("deleteUserRequest", (state) => {
            state.loading = true;
        })

    builder
        .addCase("loginSuccess", (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.message = action.payload;
        })
        .addCase("loadUserSuccess", (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })
        .addCase("logoutSuccess", (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.message = action.payload;
            state.user = null;
            state.newUser = false;
        })
        .addCase("registerSuccess", (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.message = action.payload;
        })
        .addCase("verifyTokenSuccess", (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.message = action.payload
        })
        .addCase("getAllUsersSuccess", (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase("deleteUserSuccess", (state) => {
            state.loading = true;
        })

    builder
        .addCase("loginFail", (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
        .addCase("loadUserFail", (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
        .addCase("logoutFail", (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.error = action.payload;
        })
        .addCase("registerFail", (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
        .addCase("verifyTokenFail", (state, action) => {
            state.loading = false;
            state.newUser = action.payload.newUser
            state.user = action.payload.payload
        })
        .addCase("getAllUsersFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("deleteUserFail", (state) => {
            state.loading = true;
        })

    builder.addCase("clearError", (state) => {
        state.error = null;
    });

    builder.addCase("clearMessage", (state) => {
        state.message = null;
    });

    builder.addCase("resetUser", (state) => {
        state.user = null;
        state.newUser = false;
    })
})