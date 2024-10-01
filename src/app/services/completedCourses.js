import { APIS } from "./apiServices";

export const completedCoursesAPIs = APIS.injectEndpoints({
    endpoints: (build) => ({
        getCompletedCoursesList: build.query({
            query: () => ({
                url: `/discover/completed-courses-list`,
                method: "GET",
            }),
            transformResponse: (res) => res?.data ?? [],
            providesTags: ["Courses"],
        }),

        uploadCompletedCourseCertificate: build.mutation({
            query: (payload = {}) => ({
                url: `/discover/upload-course-certificate`,
                method: "post",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: payload,
            }),
            invalidatesTags: ["Courses"],
        }),
        shareCompletedCourseCertificate: build.mutation({
            query: (payload = {}) => ({
                url: `/discover/share-course-completed-certificate`,
                method: "post",
                data: payload,
            }),
            invalidatesTags: [{ type: "COMPLETED_QUIZ", id: "LIST" }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetCompletedCoursesListQuery,
    useUploadCompletedCourseCertificateMutation,
    useShareCompletedCourseCertificateMutation,
} = completedCoursesAPIs;
