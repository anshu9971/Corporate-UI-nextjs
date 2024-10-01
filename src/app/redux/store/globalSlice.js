/* eslint-disable no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";

// use this slice to share common state between components and pages
const globalSlice = createSlice({
    name: "global",
    initialState: {
        videoUrl: null,
        corporateData: null,
    },
    reducers: {
        setVideoUrl: (state, param) => {
            const { payload } = param;
            state.videoUrl = payload;
        },
        resetVideoUrl: (state) => {
            state.videoUrl = null;
        },
        setCorporateData: (state, param) => {
            const { payload } = param;
            state.corporateData = payload;
        },
        clearCorporateData: (state) => {
            state.corporateData = null;
        },
    },
});

const { actions, reducer } = globalSlice;

export const {
    setVideoUrl,
    resetVideoUrl,
    setCorporateData,
    clearCorporateData,
} = actions;

export default reducer;
