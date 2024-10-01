import { MICROSITE_APIS } from "./micrositeServices";

const corporateApis = MICROSITE_APIS.injectEndpoints({
    endpoints: (build) => ({
        getCompanies: build.query({
            query: () => ({
                url: "/corporate/companies",
                method: "get",
            }),
            transformResponse: (data) =>
                data?.data?.data?.map((i) => ({
                    ...i,
                    label: i?.company_name,
                    value: i?.id,
                })) ?? [],
        }),

        functionsByCompany: build.query({
            query: (cid) => ({
                url: `/corporate/functions-by-company?company_id=${cid}`,
                method: "get",
            }),
            transformResponse: (data) =>
                data?.data?.data?.map((i) => ({
                    ...i,
                    label: i.title,
                    value: i.id,
                })) ?? [],
        }),
        rolesByCompanyAndFunction: build.mutation({
            query: (data) => ({
                url: "/corporate/roles",
                method: "post",
                data,
            }),
            transformResponse: (data) =>
                data?.data?.data?.map((i) => ({
                    ...i,
                    label: i.role_name,
                    value: i.id,
                })) ?? [],
        }),
        jobBandsByCompanyFunctionAndRole: build.mutation({
            query: (data) => ({
                url: "/corporate/job-band",
                method: "post",
                data,
            }),
            transformResponse: (data) =>
                data?.data?.data?.map((i) => ({
                    ...i,
                    label: i.job_band_name,
                    value: i.id,
                })) ?? [],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetCompaniesQuery,
    useFunctionsByCompanyQuery,
    useRolesByCompanyAndFunctionMutation,
    useJobBandsByCompanyFunctionAndRoleMutation,
} = corporateApis;
