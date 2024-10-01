import { APIS } from "./apiServices";

export const genericAPIs = APIS.injectEndpoints({
    endpoints: (build) => ({
        getRelevantProducts: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/product/relevent-products`,
                method: "post",
                data: payload,
            }),
            transformResponse: (res) => res,
        }),
        getSearchProducts: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/master/search`,
                method: "post",
                data: payload,
            }),
            transformResponse: (res) => res,
        }),
        getDataBySlug: build.mutation({
            query: ({ payload = {} }) => ({
                url: `/product/get-object-by-slug`,
                method: "post",
                data: payload,
            }),
        }),
        getDataByIsqSlug: build.mutation({
            query: ({ payload = {}, token }) => ({
                url: `/product/lsq-get-object-by-slug`,
                method: "post",
                data: payload,
                headers: {
                    token,
                },
            }),
        }),
        getPartnersLogo: build.query({
            query: () => ({
                url: `/master/lpmerchantLogos`,
                method: "GET",
            }),
            transformResponse: (res) => {
                const logos = [];

                if (res.data) {
                    const numberOfRows = 4;
                    const allLogos = res.data.data.map((partner) => ({
                        logo: partner.img_link,
                    }));

                    // Arranging logos in below order
                    // 1 5 9
                    // 2 6 10
                    // 3 7 11
                    // 4 8 12
                    for (
                        let i = 0, row = 0;
                        i < allLogos.length;
                        i += 1, row += 1
                    ) {
                        if (row === numberOfRows) {
                            row = 0;
                        }

                        logos[row] = logos[row]
                            ? [...logos[row], allLogos[i]]
                            : [allLogos[i]];
                    }
                }

                return logos;
            },
        }),
        getTrendingCourses: build.query({
            query: () => ({
                url: "/product/trending",
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetRelevantProductsMutation,
    useGetSearchProductsMutation,
    useGetPartnersLogoQuery,
    useGetDataBySlugMutation,
    useGetTrendingCoursesQuery,
    useGetDataByIsqSlugMutation,
} = genericAPIs;
