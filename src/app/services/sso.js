import { APIS } from "./apiServices";

export const ssoApis = APIS.injectEndpoints({
    endpoints: (build) => ({
        getSSOUrl: build.query({
            query: () => ({
                url: `/auth/sso`,
                method: "get",
            }),
            transformResponse: (res) => res,
            providesTags: [{ id: "USER", type: "USER" }],
        }),
        tokenGeneration: build.mutation({
            query: (payload) => ({
                url: `/auth/sso-token-generation`,
                method: "post",
                data: payload,
            }),
            invalidatesTags: [{ type: "HEADERS", id: "HEADERS" }],
        }),
        corporateTokenGeneration: build.query({
            query: () => ({
                url: `/auth/corporate-token-generation`,
                method: "get",
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useLazyGetSSOUrlQuery,
    useTokenGenerationMutation,
    useLazyCorporateTokenGenerationQuery,
} = ssoApis;
