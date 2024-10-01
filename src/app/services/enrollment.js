import { APIS } from "./apiServices";

const enrollmentAPIs = APIS.injectEndpoints({
    endpoints: (build) => ({
        enrollForCourse: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/user/enroll`,
                method: "post",
                data: payload,
            }),
            invalidatesTags: [{ type: "Dashboard", id: "Dashboard" }],
            transformResponse: (res) => res,
        }),
        updateCustomerDetails: build.mutation({
            query: (data) => ({
                url: "/user",
                method: "PATCH",
                data,
            }),
            invalidatesTags: [{ id: "USER", type: "USER" }],
        }),
    }),
    overrideExisting: false,
});

export const { useEnrollForCourseMutation, useUpdateCustomerDetailsMutation } =
    enrollmentAPIs;
