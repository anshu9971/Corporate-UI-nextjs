import { WEBFLOWAPIS } from "./apiServices";

export const blogsAPI = WEBFLOWAPIS.injectEndpoints({
    endpoints: (build) => ({
        getBlogCollections: build.query({
            query: () => ({
                url: "/sites/64a001a019ddf795aaf14ea8/collections",
                method: "GET",
                headers: {
                    Authorization: `814d1ff05d7787e9cca9fc112b3c35810155e1aa4ad8adb81cf51ec58d2abc77`,
                    "Access-Control-Allow-Origin": "*",
                },
            }),
        }),
        getSpecificItemDetail: build.query({
            query: () => ({
                url: `/collections/64a01029b275c16702c09c95/items/64cd7664648369d9148201f2?`,
                method: "GET",
                headers: {
                    Authorization: `814d1ff05d7787e9cca9fc112b3c35810155e1aa4ad8adb81cf51ec58d2abc77`,
                    "Access-Control-Allow-Origin": "*",
                },
            }),
        }),
        getItemsFromCollection: build.query({
            query: () => ({
                url: `/collections/64a01029b275c16702c09c95/items`,
                method: "GET",
                headers: {
                    Authorization: `814d1ff05d7787e9cca9fc112b3c35810155e1aa4ad8adb81cf51ec58d2abc77`,
                    "Access-Control-Allow-Origin": "*",
                },
            }),
        }),
        getSpecificCollection: build.query({
            query: () => ({
                url: `/collections/64ea103807334aa0d94be961`,
                method: "GET",
                headers: {
                    Authorization: `814d1ff05d7787e9cca9fc112b3c35810155e1aa4ad8adb81cf51ec58d2abc77`,
                    "Access-Control-Allow-Origin": "*",
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetBlogCollectionsQuery,
    useGetSpecificItemDetailQuery,
    useGetItemsFromCollectionQuery,
    useGetSpecificCollectionQuery,
} = blogsAPI;
