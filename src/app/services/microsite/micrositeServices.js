/* eslint-disable import/no-cycle */
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../apiConfig";

export const MICROSITE_APIS = createApi({
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    }),
    endpoints: () => ({}),
    tagTypes: [],
    reducerPath: "micrositeSlice",
});
