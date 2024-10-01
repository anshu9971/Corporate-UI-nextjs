import { APIS } from "./apiServices";

const courseDetailsAPIs = APIS.injectEndpoints({
    endpoints: (build) => ({
        getCourseDetails: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/product/productDetails`,
                method: "post",
                data: payload,
            }),
            transformResponse: (res) => res,
        }),
    }),
    overrideExisting: false,
});

export const { useGetCourseDetailsMutation } = courseDetailsAPIs;
