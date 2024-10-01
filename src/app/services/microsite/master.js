import { MICROSITE_APIS } from "./micrositeServices";

const headerApis = MICROSITE_APIS.injectEndpoints({
    endpoints: (build) => ({
        getHeaderLinks: build.query({
            query: () => ({
                url: "/master/headers",
                method: "get",
            }),
            providesTags: [{ type: "HEADERS", id: "HEADERS" }],
        }),
        getFunctions: build.query({
            query: () => ({
                url: "/master/function-by-corporate",
                method: "get",
            }),
        }),
        getJobBands: build.query({
            query: () => ({
                url: "/master/job-bands",
                method: "get",
            }),
        }),
        // TODO :: no need to add below APIs just change endpoint of existing one's
        getMerchantLogos: build.query({
            query: () => ({
                url: "/master/merchant-logos",
                method: "get",
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
    }),
    overrideExisting: false,
});

export const {
    useGetHeaderLinksQuery,
    useGetFunctionsQuery,
    useGetJobBandsQuery,
    useGetMerchantLogosQuery,
} = headerApis;
