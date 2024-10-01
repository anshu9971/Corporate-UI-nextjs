import { APIS } from "./apiServices";

const enrollmentAPIs = APIS.injectEndpoints({
    endpoints: (build) => ({
        orderCreate: build.mutation({
            query: ({ payload }) => ({
                url: `/vendor/rzOrderCreate`,
                method: "post",
                data: payload,
            }),
        }),
        paymentUpdate: build.mutation({
            query: ({ payload }) => ({
                url: "/vendor/rzPaymentUpdate",
                method: "post",
                data: payload,
            }),
            invalidatesTags: [
                { type: "Dashboard", id: "Dashboard" },
                { type: "UB-GAME-REPORT", id: "REPORT" },
            ],
        }),
        createCashFreeOrder: build.mutation({
            query: ({ payload }) => ({
                url: "/payment/create-order",
                method: "post",
                data: payload,
            }),
        }),
        updateCashFreePayment: build.mutation({
            query: ({ payload }) => ({
                url: "/payment/order",
                method: "post",
                data: payload,
            }),
            invalidatesTags: [
                { type: "Dashboard", id: "Dashboard" },
                { type: "UB-GAME-REPORT", id: "REPORT" },
            ],
        }),
        applyCoupon: build.mutation({
            query: (data) => ({
                url: "/user/validate-coupon",
                method: "post",
                data,
            }),
            invalidatesTags: [
                { type: "Dashboard", id: "Dashboard" },
                { type: "UB-GAME-REPORT", id: "REPORT" },
                { type: "USER", id: "USER" },
            ],
        }),
        gameFee: build.query({
            query: () => ({
                url: "/master/game-fee",
                method: "get",
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useOrderCreateMutation,
    usePaymentUpdateMutation,
    useCreateCashFreeOrderMutation,
    useUpdateCashFreePaymentMutation,
    useApplyCouponMutation,
    useGameFeeQuery,
} = enrollmentAPIs;
