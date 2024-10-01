import { APIS } from "./apiServices";

export const listingAPIs = APIS.injectEndpoints({
    endpoints: (build) => ({
        getListingProducts: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/user/productList`,
                method: "post",
                data: payload,
            }),
            transformResponse: (res) => res,
        }),
        getFilterList: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/user/productFilterList`,
                method: "post",
                data: payload,
            }),
            transformResponse: (res) => res,
        }),
        getOrders: build.query({
            query: () => ({
                url: `/user/my-orders`,
                method: "get",
            }),
            providesTags: [{ type: "Dashboard", id: "Dashboard" }],
        }),
        getModularFaqs: build.query({
            query: (module = "finance") => ({
                url: `/master/modular-faq/${module}`,
                method: "get",
            }),
        }),
        getRecomendedCourses: build.query({
            query: (skillId) => ({
                url: `/product/recomended-courses/${skillId}`,
                method: "get",
            }),
            providesTags: [{ id: "USER", type: "USER" }],
        }),
        getLsqRecommendations: build.mutation({
            query: (payload) => ({
                url: `/product/lsq-product-recomendation`,
                method: "post",
                headers: {
                    ...payload,
                },
            }),
        }),
        getLsqFilterList: build.mutation({
            query: ({ token }) => ({
                url: `/product/generic-product-filter-list`,
                method: "post",
                headers: { token },
            }),
            transformResponse: (res) => res,
        }),
        getLsqProductData: build.mutation({
            query: ({ payload = {}, token }) => ({
                url: `/product/generic-product-filter-data`,
                method: "post",
                data: payload,
                headers: { token },
            }),
            transformResponse: (res) => res,
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetListingProductsMutation,
    useGetFilterListMutation,
    useGetOrdersQuery,
    useGetModularFaqsQuery,
    useGetRecomendedCoursesQuery,
    useGetLsqRecommendationsMutation,
    useGetLsqFilterListMutation,
    useGetLsqProductDataMutation,
} = listingAPIs;
