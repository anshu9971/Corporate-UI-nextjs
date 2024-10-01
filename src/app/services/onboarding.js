import { APIS } from "./apiServices";

export const onboardingAPIs = APIS.injectEndpoints({
    endpoints: (build) => ({
        saveUserChoice: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/user/find-perfect-course`,
                method: "post",
                data: payload,
            }),
            transformResponse: (res) => res,
        }),
        getComfortLevel: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/master/comfortLevel`,
                method: "post",
                data: payload,
            }),
            transformResponse: (res) => res,
        }),
        getPreferredLearningMode: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/master/prefrenceLearningMode`,
                method: "post",
                data: payload,
            }),
            transformResponse: (res) => res,
        }),
        getSubPreferredLearningMode: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/master/subPrefrenceLearningMode`,
                method: "post",
                data: payload,
            }),
            transformResponse: (res) => res,
        }),
        getLearningTimeSpent: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/master/learningTimeSpend`,
                method: "post",
                data: payload,
            }),
            transformResponse: (res) => res,
        }),
        verifyPincode: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/master/pincode`,
                method: "post",
                data: payload,
            }),
            transformResponse: (res) => res,
        }),
        getSubjects: build.query({
            query: (params = { journey_type: "explore_journey" }) => ({
                url: `/master/subject`,
                method: "get",
                params,
            }),
            transformResponse: (res) => res,
        }),
        getSkills: build.query({
            query: ({ functionId }) => ({
                url: `/corporate/skills-by-function/${functionId}`,
                method: "get",
            }),
            transformResponse: (res) => res,
        }),
        getSubSkills: build.query({
            query: ({ skillId = null }) => ({
                url: `/master/primarySkills/${skillId}/subSkills`,
                method: "get",
            }),
        }),
        getFaqs: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/master/genericFaq`,
                method: "post",
                data: payload,
            }),
            transformResponse: (res) => res,
        }),
        findLocation: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/master/findLocation`,
                method: "post",
                data: payload,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetSubjectsQuery,
    useGetSkillsQuery,
    useLazyGetSkillsQuery,
    useSaveUserChoiceMutation,
    useGetComfortLevelMutation,
    useGetPreferredLearningModeMutation,
    useGetSubPreferredLearningModeMutation,
    useVerifyPincodeMutation,
    useGetLearningTimeSpentMutation,
    useGetFaqsMutation,
    useFindLocationMutation,
    useGetSubSkillsQuery,
    useLazyGetSubSkillsQuery,
} = onboardingAPIs;
