/* eslint-disable no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        utm_params: {},
    },
    reducers: {
        setToken: (state, param) => {
            const { payload } = param;
            state.token = payload;
        },
        removeToken: (state) => {
            delete state.token;
        },
        setUserData: (state, param) => {
            const { payload } = param;
            state.user = { ...(state.user || {}), ...payload };
        },
        setIsPhoneVerified: (state) => {
            state.isPhoneVerified = true;
        },
        logout: (state) => {
            delete state.token;
            delete state.user;
            delete state.utm_params;
            delete state.isPhoneVerified;
        },
        setUtmParams: (state, param) => {
            const { payload } = param;
            state.utm_params = payload;
        },
    },
});
const { actions, reducer } = authSlice;
export const {
    setToken,
    setUserData,
    removeToken,
    logout,
    setUtmParams,
    setIsPhoneVerified,
} = actions;
export default reducer;
