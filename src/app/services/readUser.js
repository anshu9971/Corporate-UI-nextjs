import { APIS } from "./apiServices";

export const aboutUserAPIs = APIS.injectEndpoints({
    endpoints: (build) => ({
        readUser: build.query({
            query: () => ({
                url: `/user`,
                method: "get",
            }),
            transformResponse: (res) => res,
            providesTags: [{ id: "USER", type: "USER" }],
        }),
    }),
    overrideExisting: false,
});

export const { useReadUserQuery, useLazyReadUserQuery } = aboutUserAPIs;
