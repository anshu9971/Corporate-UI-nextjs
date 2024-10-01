import { APIS } from "./apiServices";

const courseRecoAPIs = APIS.injectEndpoints({
    endpoints: (build) => ({
        getCourseRecoFilters: build.mutation({
            query: (payload = {}) => ({
                url: `/user/latestPreferData`,
                method: "post",
                data: payload,
            }),
            transformResponse: (res) => res,
        }),
        getCoursesList: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/product/productList`,
                method: "post",
                data: payload,
            }),
            transformResponse: (res) => res,
        }),
        getFilteredCoursesList: build.mutation({
            query: (payload = {}) => ({
                url: `/product/product-filter-data`,
                method: "post",
                data: payload,
            }),
            transformResponse: (res) => res,
        }),
        getTopCourses: build.query({
            query: ({ customerInterestId }) => ({
                url: `/product/customerproductList/${customerInterestId}`,
                method: "get",
            }),
        }),
        getAvailableFilters: build.mutation({
            query: (payload = {}) => ({
                url: "/product/product-filter-list",
                method: "post",
                data: payload,
            }),
        }),
        getCoursesCollections: build.query({
            query: () => ({
                url: `/master/course-collection`,
                method: "get",
            }),
            transformResponse: (res) =>
                (
                    !!res?.data?.data?.length &&
                    res.data.data.sort(
                        ({ priority: a }, { priority: b }) => a - b || 0,
                    )
                ).map(
                    ({
                        background_image_url: bgImage,
                        collection_name: title,
                        description: desc,
                        filter_criteria: filterCriteria,
                        id,
                        priority,
                        slug,
                    }) => ({
                        numOfCourses: 50,
                        title,
                        desc,
                        bgImage,
                        filterCriteria,
                        id,
                        priority,
                        slug,
                    }),
                ) || [],
        }),
        getFilteredCoursesListGeneric: build.mutation({
            query: (payload = {}) => ({
                url: `product/generic-product-filter-data`,
                method: "post",
                header: { payload },
            }),
            transformResponse: (res) => res,
        }),
        getAvailableFiltersGeneric: build.mutation({
            query: (payload = {}) => ({
                url: "/product/generic-product-filter-list",
                method: "post",
                header: { payload },
            }),
        }),
        getConceptRecommendedCourses: build.mutation({
            query: (data = {}) => ({
                url: "/product/concept-recomended-courses",
                method: "post",
                data,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetTopCoursesQuery,
    useGetCoursesListMutation,
    useGetCourseRecoFiltersMutation,
    useGetFilteredCoursesListMutation,
    useGetAvailableFiltersMutation,
    useGetCoursesCollectionsQuery,
    useLazyGetCoursesCollectionsQuery,
    useGetFilteredCoursesListGenericMutation,
    useGetAvailableFiltersGenericMutation,
    useGetConceptRecommendedCoursesMutation,
} = courseRecoAPIs;
