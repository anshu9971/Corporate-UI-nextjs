import { storage } from "services/storage";
import { MICROSITE_APIS } from "./micrositeServices";

const validationAPIs = MICROSITE_APIS.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: ({ email }) => ({
                url: "/auth/login",
                method: "post",
                data: { email },
            }),
        }),
        validateEmailOtp: build.mutation({
            query: ({ otp, email }) => ({
                url: "/auth/email-validate",
                method: "post",
                data: {
                    otp,
                    email,
                },
            }),
            transformResponse: (res) => {
                const data = res?.data?.data;
                const authToken = data?.tokens?.accessToken?.token;
                storage.set.authToken(authToken);
                return res;
            },
            invalidatesTags: [{ type: "HEADERS", id: "HEADERS" }],
        }),
        mobileOtp: build.mutation({
            query: ({ mobile }) => ({
                url: "/auth/mobile-otp",
                method: "post",
                data: { mobile },
            }),
        }),
        validateMobileOtp: build.mutation({
            query: ({ otp, mobile }) => ({
                url: "/auth/mobile-validate",
                method: "post",
                data: { otp, mobile },
            }),
        }),
        logout: build.query({
            query: () => ({
                url: "/auth/logout",
                method: "get",
            }),
        }),
        B2BMobileOtp: build.mutation({
            query: (payload) => ({
                url: "/auth/generate-otp",
                method: "post",
                data: payload,
            }),
        }),
        validateB2BMobileOtp: build.mutation({
            query: ({ otp, mobile }) => ({
                url: "/auth/validate-otp",
                method: "post",
                data: { otp, mobile },
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useLoginMutation,
    useValidateEmailOtpMutation,
    useMobileOtpMutation,
    useValidateMobileOtpMutation,
    useLazyLogoutQuery,
    useB2BMobileOtpMutation,
    useValidateB2BMobileOtpMutation,
} = validationAPIs;
