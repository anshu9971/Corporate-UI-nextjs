import { APIS } from "./apiServices";

export const subdomainAPIs = APIS.injectEndpoints({
    endpoints: (build) => ({
        getSkillFaqs: build.query({
            query: ({ skillId, functionId }) => ({
                url: `/master/skill-faq/${skillId}${
                    functionId ? `/${functionId}` : ""
                }`,
                method: "get",
            }),
            transformResponse: (res) => res,
        }),
        getSubSkillFaqs: build.query({
            query: ({ subSkillId }) => ({
                url: `/master/subSkillFaq/${subSkillId}`,
                method: "get",
            }),
        }),
        getMerchantDetails: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/merchant/details`,
                method: "post",
                data: payload,
            }),
            transformResponse: (res) => res,
        }),
        getMerchantFilters: build.mutation({
            query: (payload = {}) => ({
                url: "/merchant/merchantFilterList",
                method: "post",
                data: payload,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetSkillFaqsQuery,
    useLazyGetSkillFaqsQuery,
    useGetMerchantDetailsMutation,
    useGetMerchantFiltersMutation,
    useGetSubSkillFaqsQuery,
    useLazyGetSubSkillFaqsQuery,
} = subdomainAPIs;
