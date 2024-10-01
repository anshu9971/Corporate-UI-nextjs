import { APIS } from "./apiServices";

export const dashboardAPIs = APIS.injectEndpoints({
    endpoints: (build) => ({
        getDashboard: build.query({
            query: () => ({
                url: `/user/dashboard`,
                method: "get",
            }),
            transformResponse: (res) => res,
            providesTags: [{ type: "Dashboard", id: "Dashboard" }],
        }),
    }),
    overrideExisting: false,
});

export const { useGetDashboardQuery } = dashboardAPIs;
