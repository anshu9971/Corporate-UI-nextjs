/* eslint-disable import/no-cycle */
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./apiConfig";

export const APIS = createApi({
    reducerPath: "apiSlice",
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    }),
    tagTypes: ["Dashboard", "USER", "UB-QUIZ", "UB-GAME-REPORT", "HEADERS"],
    endpoints: () => ({}),
});

export const WEBFLOWAPIS = createApi({
    baseQuery: axiosBaseQuery({
        baseUrl: "https://cors-anywhere.herokuapp.com/api.webflow.com",
    }),
    endpoints: () => ({}),
    tagTypes: [],
    reducerPath: "webflowApiSlice",
});
