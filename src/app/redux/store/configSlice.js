/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { fixIncorrectExplorationFilters } from "utils/helpers";

const configSlice = createSlice({
    name: "config",
    initialState: {
        shortlistedCourses: [],
        skillReco: {
            id: "",
            name: "",
        },
        subjectReco: {
            id: "",
            name: "",
        },
        collectionExplorationFilters: {},
        insertionId: null,
    },
    reducers: {
        setShortlistedCourses: (state, param) => {
            const { payload } = param;
            const isAlreadyPresent =
                state.shortlistedCourses.findIndex(
                    (course) =>
                        course.merchant_product_sfid ===
                        payload.merchant_product_sfid,
                ) > -1;
            if (state.shortlistedCourses.length === 3) {
                state.shortlistedCourses[2] = payload;
            } else if (!isAlreadyPresent)
                state.shortlistedCourses.push(payload);
        },
        removeShortlistedCourse: (state, param) => {
            const { payload: idToRemove } = param;
            state.shortlistedCourses = state.shortlistedCourses.filter(
                (item) => item.merchant_product_sfid !== idToRemove,
            );
        },
        clearAllShortlistedCourse: (state) => {
            state.shortlistedCourses = [];
        },
        setSubSkillCount: (state, param) => {
            const { payload } = param;
            state.subSkillCount = payload;
        },
        clearSubSkillCount: (state) => {
            state.subSkillCount = 0;
        },
        setSkillRecommendation: (state, param) => {
            const { payload } = param;
            state.skillReco = payload;
        },
        setSubjectsList: (state, param) => {
            const { payload } = param;
            state.subjects = payload;
        },
        setFunctionsList: (state, param) => {
            const { payload } = param;
            state.functions = payload;
        },
        removeSkillRecommendation: (state) => {
            delete state.skillReco;
        },
        setSubSkillReco: (state, param) => {
            const { payload } = param;
            state.subSkillReco = payload;
        },
        clearSubSkillReco: (state) => {
            delete state.subSkillReco;
        },
        setSubjectRecommendation: (state, param) => {
            const { payload } = param;
            state.subjectReco = payload;
        },
        removeSubjectRecommendation: (state) => {
            delete state.subjectReco;
        },
        setCollectionExplorationFilters: (state, param) => {
            const { payload } = param;
            const withCorrectedFilters = { ...payload };
            if (payload?.filters) {
                withCorrectedFilters.filters = fixIncorrectExplorationFilters(
                    payload.filters,
                );
            }
            state.collectionExplorationFilters = withCorrectedFilters;
        },
        setInsertionId: (state, param) => {
            const { payload } = param;
            state.insertionId = payload;
        },
        clearInsertionId: (state) => {
            state.insertionId = null;
        },
        clearCollectionExplorationFilters: (state) => {
            delete state.collectionExplorationFilters;
        },
    },
});
const { actions, reducer } = configSlice;
export const {
    setSkillRecommendation,
    removeSkillRecommendation,
    setSubjectRecommendation,
    removeSubjectRecommendation,
    setShortlistedCourses,
    removeShortlistedCourse,
    clearAllShortlistedCourse,
    setCollectionExplorationFilters,
    clearCollectionExplorationFilters,
    setSubjectsList,
    setFunctionsList,
    setInsertionId,
    clearInsertionId,
    setSubSkillCount,
    clearSubSkillCount,
    setSubSkillReco,
    clearSubSkillReco,
} = actions;
export default reducer;
