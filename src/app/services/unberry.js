import { TRAITS_LABELS } from "utils/constants";

const { APIS } = require("./apiServices");

const transformGameReportResponse = (res) => {
    let traitsMeasured = [];
    let standoutTraits = [];
    let attentionNeededTraits = [];
    let topTraits = [];
    const result = res?.data?.data ?? {};

    if (result) {
        // removing null or unwanted traits
        traitsMeasured = result.traitsMeasured.filter(
            (trait) => trait.playerScore !== null,
        );

        // Renaming traits
        traitsMeasured = traitsMeasured.map(({ traitName, ...trait }) => ({
            ...trait,
            traitName: TRAITS_LABELS[traitName] ?? traitName,
        }));

        // segregating traits
        standoutTraits = traitsMeasured.filter(
            (trait) => trait.playerScore >= 7,
        );
        attentionNeededTraits = traitsMeasured.filter(
            (trait) => trait.playerScore <= 4,
        );
        topTraits =
            result?.top_traits?.length > 0 &&
            result?.top_traits?.map(({ trait_name: traitName, ...traits }) => ({
                ...traits,
                traitName,
            }));
    }

    return {
        ...result,
        traitsMeasured,
        standoutTraits,
        attentionNeededTraits,
        topTraits,
    };
};

const transformQuizConfigReponse = (res) => {
    if (!res || !res.data) {
        return [];
    }

    const { data } = res.data;
    return data;

    // const transformRes = data.map((quiz) => {
    //     const { quizLevels, ...rest } = quiz;
    //     const { quizzes = [], ...quizUniversalLevel } =
    //         quizLevels.find((level) => level.name === "l0") ?? {};
    //     const [{ id: quizId } = {}] = quizzes ?? [{}];

    //     if (quizId) {
    //         return { quizUniversalLevel, quizId, quizLevels, ...rest };
    //     }

    //     return quiz;
    // });

    // return transformRes.filter((quiz) => !!quiz.quizId);
};

const transformQuizReportResponse = (res, error, args) => {
    if (!res || !res.data) {
        return {};
    }
    const { quizId } = args;
    const {
        data: {
            data: { quizData: data },
        },
    } = res;

    const ubQuizObject = data[quizId];
    const { skillsMeasured = [] } = ubQuizObject ?? {};
    const sortedMeasuredSkills = skillsMeasured.sort(
        (a, b) => a.playerScore - b.playerScore,
    );

    ubQuizObject.skillsMeasured = sortedMeasuredSkills;
    if (res?.data?.data?.customer?.id) {
        data.customer = res?.data?.data?.customer;
    }

    if (data?.skills) {
        data.skillData = data?.skills?.[0];
    }
    return data;
};

const transformAllQuizReportsResponse = (res) => {
    if (!res || !res.data) {
        return {};
    }

    const { allQuiz = [] } = res.data.data ?? {};

    const reports = allQuiz.map((quiz) => {
        const [quizId] = Object.keys(quiz);
        return { quizId, ...quiz[quizId] };
    });

    return reports;
};

const getQuizId = (res) => {
    if (!res) {
        return null;
    }

    const { quiz } = res.data ?? { id: null };
    const quizId = quiz.id;

    return quizId;
};

const unberryApis = APIS.injectEndpoints({
    endpoints: (build) => ({
        // Queries
        getPositions: build.query({
            query: () => ({
                url: `/discover/all-position`,
                method: "GET",
            }),
            transformResponse: (res) => (res ? res.data?.positions : []),
        }),
        getGameReport: build.query({
            query: () => ({
                url: `/discover/mental-discover-report`,
                method: "GET",
            }),
            transformResponse: transformGameReportResponse,
            providesTags: [{ type: "UB-GAME-REPORT", id: "REPORT" }],
        }),
        getQuizConfig: build.query({
            query: (params) => ({
                url: `/discover/quiz-config`,
                method: "GET",
                params,
            }),
            transformResponse: transformQuizConfigReponse,
            providesTags: [{ type: "UB-QUIZ", id: "LIST" }],
        }),

        // Mutations
        createUnberryUser: build.query({
            query: ({ userId, type }) => ({
                url: `/discover/create-user`,
                method: "GET",
                data: { customer_id: userId, type },
                params: { customer_id: userId, type },
            }),
        }),
        gameReportWebhook: build.query({
            query: (userId) => ({
                url: `/discover/mental-discover-webhook`,
                method: "GET",
                data: { customer_id: userId },
                params: { customer_id: userId },
            }),
        }),
        uploadCertificate: build.mutation({
            query: (data) => ({
                url: `/vendor/uploadDiscoveryCertificate`,
                method: "POST",
                data,
                headers: { "Content-Type": "multipart/form-data" },
            }),
            invalidatesTags: [{ type: "UB-GAME-REPORT", id: "REPORT" }],
        }),
        shareCerificateViaEmail: build.mutation({
            query: ({ userId, emails }) => ({
                url: `/discover/share-mental-discovery`,
                method: "POST",
                data: { customer_id: userId, email: emails },
            }),
            transformResponse: (res) => res?.data,
        }),
        linkDynamicQuiz: build.mutation({
            query: ({ userId, quizLevelId }) => ({
                url: "/discover/dynamic-quiz",
                method: "POST",
                data: {
                    customer_id: userId,
                    quizLevelId,
                },
            }),
            transformResponse: getQuizId,
        }),
        quizReportWebhook: build.mutation({
            query: ({ userId, quizId, functionId }) => ({
                url: "/discover/skill-discover-webhook",
                method: "POST",
                data: {
                    customer_id: userId,
                    quiz_id: quizId,
                    function_id: functionId,
                },
            }),
            invalidatesTags: [{ type: "UB-QUIZ", id: "LIST" }],
        }),
        getQuizReport: build.mutation({
            query: ({ userId, quizId, id }) => ({
                url: `/discover/skill-discover-report`,
                method: "POST",
                data: {
                    customer_id: userId,
                    quiz_id: quizId,
                    id,
                },
            }),
            transformResponse: transformQuizReportResponse,
        }),
        shareExpertiseCertificate: build.mutation({
            query: ({ userId, email, quizId }) => ({
                url: "/discover/share-skill-discovery",
                method: "POST",
                data: {
                    customer_id: userId,
                    email,
                    quiz_id: quizId,
                },
            }),
        }),
        getAllQuizReports: build.query({
            query: ({ latest = "true" }) => ({
                url: `/discover/user-completed-quiz?latest=${latest}`,
                method: "GET",
            }),
            providesTags: [{ type: "COMPLETED_QUIZ", id: "LIST" }],
            transformResponse: transformAllQuizReportsResponse,
        }),
    }),
});

export const {
    // Queries
    useCreateUnberryUserQuery,
    useLazyCreateUnberryUserQuery,
    // useGameReportWebhookMutation,
    useLazyGameReportWebhookQuery,
    useGetPositionsQuery,
    useGetGameReportQuery,
    useGetQuizConfigQuery,
    useLazyGetQuizConfigQuery,
    // Mutations
    useUploadCertificateMutation,
    useShareCerificateViaEmailMutation,
    useLinkDynamicQuizMutation,
    useQuizReportWebhookMutation,
    useGetQuizReportMutation,
    useShareExpertiseCertificateMutation,
    useLazyGetAllQuizReportsQuery,
} = unberryApis;
