import { APIS } from "./apiServices";

export const feedbackAPIs = APIS.injectEndpoints({
    endpoints: (build) => ({
        getFeedbackQuestions: build.query({
            query: ({ type, token }) => ({
                url: `/user/feedback?feedback_type=${type}`,
                method: "get",
                headers: {
                    token,
                    origin: "https://www.abc-uat.wizr.in",
                },
            }),
            transformResponse: (res) => res,
        }),
        submitFeedback: build.mutation({
            query: ({ payload, token }) => ({
                url: `/user/save-feedback`,
                method: "post",
                data: payload,
                headers: {
                    token,
                    origin: "https://www.abc-uat.wizr.in",
                },
            }),
            transformResponse: (res) => res,
        }),
    }),
    overrideExisting: false,
});

export const { useGetFeedbackQuestionsQuery, useSubmitFeedbackMutation } =
    feedbackAPIs;
