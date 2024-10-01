import { APIS } from "./apiServices";

export const trackingAPIs = APIS.injectEndpoints({
    endpoints: (build) => ({
        trackEvent: build.mutation({
            query: ({ payload }) => ({
                url: `/user/flag`,
                method: "POST",
                data: payload,
            }),
            transformResponse: (res) => res,
        }),
    }),
    overrideExisting: false,
});

export const { useTrackEventMutation } = trackingAPIs;
