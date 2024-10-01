import { MICROSITE_APIS } from "./micrositeServices";

const userApis = MICROSITE_APIS.injectEndpoints({
    endpoints: (build) => ({
        updateUserDetails: build.mutation({
            query: (data) => ({
                url: "/user",
                method: "PATCH",
                data,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useUpdateUserDetailsMutation } = userApis;
