import { APIS } from "./apiServices";

export const domainAPIs = APIS.injectEndpoints({
    endpoints: (build) => ({
        getSkill: build.query({
            query: ({ skillId }) => ({
                url: `/master/skill/${skillId}`,
                method: "get",
            }),
            transformResponse: (res) => res,
        }),
        getFunctionFaqs: build.query({
            query: ({ functionId }) => ({
                url: `/master/function-faq/${functionId}`,
                method: "get",
            }),
            transformResponse: (res) => res,
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetSkillQuery,
    useGetFunctionFaqsQuery,
    useLazyGetSkillQuery,
} = domainAPIs;
