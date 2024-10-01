import { APIS } from "./apiServices";

export const webfAPIs = APIS.injectEndpoints({
    endpoints: (build) => ({
        getBlogCollections: build.mutation({
            query: () => ({
                url: `/master/webflowProxy`,
                method: "POST",
                data: {
                    api_uri:
                        "https://api.webflow.com/sites/64a001a019ddf795aaf14ea8/collections",
                    token: "814d1ff05d7787e9cca9fc112b3c35810155e1aa4ad8adb81cf51ec58d2abc77",
                },
            }),
        }),
        getSpecificItemDetail: build.mutation({
            query: () => ({
                url: `/master/webflowProxy`,
                method: "POST",
                data: {
                    api_uri:
                        "https://api.webflow.com/collections/64a01029b275c16702c09c95/items/64cd7664648369d9148201f2?",
                    token: "814d1ff05d7787e9cca9fc112b3c35810155e1aa4ad8adb81cf51ec58d2abc77",
                },
            }),
        }),
        getItemsFromCollection: build.mutation({
            query: ({ collectionId, filters }) => ({
                url: `/master/webflowProxy`,
                method: "POST",
                data: {
                    api_uri: `https://api.webflow.com/collections/${collectionId}/items?${filters}`,
                    token: "814d1ff05d7787e9cca9fc112b3c35810155e1aa4ad8adb81cf51ec58d2abc77",
                },
            }),
        }),
        getSpecificCollection: build.mutation({
            query: () => ({
                url: `/master/webflowProxy`,
                method: "POST",
                data: {
                    api_uri: `https://api.webflow.com/collections/64ea103807334aa0d94be961`,
                    token: "814d1ff05d7787e9cca9fc112b3c35810155e1aa4ad8adb81cf51ec58d2abc77",
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetBlogCollectionsMutation,
    useGetSpecificItemDetailMutation,
    useGetItemsFromCollectionMutation,
    useGetSpecificCollectionMutation,
} = webfAPIs;
