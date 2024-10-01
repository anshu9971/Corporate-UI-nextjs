import { APIS } from "./apiServices";

export const userManagementAPIs = APIS.injectEndpoints({
    endpoints: (build) => ({
        getRecommendedRoles: build.query({
            query: (userId) => ({
                url: `/user/rolesRecommendation/${userId}`,
                method: "GET",
            }),
            transformResponse: (res) => res?.data?.recommendation ?? [],
        }),

        updateUser: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/user/update`,
                method: "post",
                data: payload,
            }),
            transformResponse: (res) => res,
        }),
        updateUserProfession: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/user/updateProfession`,
                method: "post",
                data: payload,
            }),
            transformResponse: (res) => res,
        }),
        setUserFlag: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/user/flag`,
                method: "post",
                data: payload,
            }),
        }),
        consolidateCustomerInfo: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/user/consolidateCustInfo`,
                method: "post",
                data: payload,
            }),
        }),
        updateUserProfile: build.mutation({
            query: ({ payload = {} }) => ({
                url: "/user",
                method: "PATCH",
                data: payload,
            }),
            invalidatesTags: [{ id: "USER", type: "USER" }],
        }),
        getCreditLimit: build.query({
            query: () => ({
                url: `/user/limit`,
                method: "GET",
            }),
            transformResponse: (res) => res ?? {},
        }),
        updateWizrConsent: build.mutation({
            query: (consent) => ({
                url: "/user/wizr-consent",
                method: "POST",
                data: { wizr_consent: consent },
            }),
        }),
        updateUserPinCode: build.mutation({
            query: ({ pincode }) => ({
                url: `/user/pincode`,
                method: "post",
                data: { pincode },
            }),
            invalidatesTags: [{ id: "USER", type: "USER" }],
        }),
        updateUserFunctions: build.mutation({
            query: (payload) => ({
                url: `/user/function-job-band`,
                method: "post",
                data: payload,
            }),
            invalidatesTags: [
                { id: "USER", type: "USER" },
                { type: "UB-QUIZ", id: "LIST" },
            ],
        }),

        verifyPersonalEmail: build.mutation({
            query: (payload) => ({
                url: `/user/generate-otp-email`,
                method: "post",
                data: payload,
            }),
        }),

        savePersonalEmail: build.mutation({
            query: (payload) => ({
                url: `/user/save-personal-email`,
                method: "post",
                data: payload,
            }),
        }),

        createFinanceLead: build.mutation({
            query: (payload) => ({
                url: `/finance/create-lead`,
                method: "post",
                data: payload,
            }),
            invalidatesTags: [{ id: "USER", type: "USER" }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetRecommendedRolesQuery,
    useUpdateUserMutation,
    useUpdateUserProfessionMutation,
    useSetUserFlagMutation,
    useConsolidateCustomerInfoMutation,
    useUpdateUserProfileMutation,
    // useUseGetCreditLimitQuery,
    useLazyGetCreditLimitQuery,
    useUpdateWizrConsentMutation,
    useUpdateUserPinCodeMutation,
    useUpdateUserFunctionsMutation,
    useSavePersonalEmailMutation,
    useCreateFinanceLeadMutation,
    useVerifyPersonalEmailMutation,
} = userManagementAPIs;
