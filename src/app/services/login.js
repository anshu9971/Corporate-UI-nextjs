import { APIS } from "./apiServices";

const validationAPIs = APIS.injectEndpoints({
    endpoints: (build) => ({
        generateOtp: build.mutation({
            query: ({ mobile = "+910000000000" }) => ({
                url: "/generateOtp",
                method: "post",
                data: { mobile },
            }),
            transformResponse: (res) => res,
        }),
        validateOtp: build.mutation({
            query: ({ mobile = "", ...rest }) => ({
                url: "/validateOtp",
                method: "post",
                data: { mobile, is_paywall_enabled: "Yes", ...rest },
            }),
            transformResponse: (res) => res,
        }),
        emailVerificationToken: build.mutation({
            query: ({ payload }) => ({
                url: "/emailVerificationToken",
                method: "post",
                data: payload,
            }),
        }),
        verifyNotificationToken: build.mutation({
            query: ({ payload }) => ({
                url: "/verifyNotificationToken",
                method: "post",
                data: payload,
            }),
            invalidatesTags: [
                { id: "USER", type: "USER" },
                { type: "Dashboard", id: "Dashboard" },
            ],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGenerateOtpMutation,
    useValidateOtpMutation,
    useEmailVerificationTokenMutation,
    useVerifyNotificationTokenMutation,
} = validationAPIs;
