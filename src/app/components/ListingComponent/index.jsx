"use client";

/* eslint-disable camelcase */
/* eslint-disable no-plusplus */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
// import { useFilterContext } from "context/FilterContext";
import { MapIcon } from "assets/svgs";
import { em, getBreakpointValue, Pagination } from "@mantine/core";
import FilterBox from "components/FilterBox";
import { useDispatch, useSelector } from "react-redux";
import {
    useGetAvailableFiltersMutation,
    // useGetCoursesListMutation,
    useGetFilteredCoursesListMutation,
} from "services/courseRecommendation";
import EditIcon from "assets/svgs/edit_icon.svg";
import isEmpty from "lodash/isEmpty";
// import GIF from "assets/gifs/wizrLogoCharcoalTransparent.gif";
import Four from "assets/svgs/fourStar.svg";
import Three from "assets/svgs/threeStar.svg";
import Two from "assets/svgs/twoStar.svg";
import { FILTER_KEYS } from "utils/constants";
import Image from "next/image";
import {
    addOrUpdateScript,
    appendFilterToUrl,
    appendPageNoToUrl,
    fetchFiltersFromUrl,
    kFormatter,
    removeParamFromUrl,
    getCourseSchedule,
} from "utils/helpers";
import { Loader } from "components/Loader";
import { useSearchParams } from "next/navigation";
// import CanonicalURL from "components/CanonicalURL";
import { clearAllShortlistedCourse } from "redux/store/configSlice";
import { useGetMerchantFiltersMutation } from "services/subDomainServices";
import CourseCard from "../CourseCard";

import styles from "./ListingComponent.module.scss";

const PAGE_SIZE = 10;
export default function ListingComponent({
    setShowCompTile,
    showCompTile,
    count,
    setCount,
    skillId = null,
    subSkillId = null,
    subjId = null,
    skillObj = {},
    collectionFilters,
    withJsonLd = false,
    showSearchHeading = false,
    listingHeading = null,
    isMerchantPage = false,
    isConceptPage = false,
    addtionalItemsForJsonLdScript,
    breadcrumbs = null,
    subSkillName = null,
    hideLoader = false,
    userPinCode,
    setOpenPinCodeModal,
    userCity,
    hideInstitueFilter,
}) {
    // eslint-disable-next-line camelcase
    // const { filter_products } = useFilterContext()
    const prevDataRef = useRef({
        skillId,
        subjId,
    });
    const headingRef = useRef(null);
    const dispatch = useDispatch();
    const isFilterActive = useRef(false);
    const totalDataCount = useRef(0);
    const appConfig = useSelector((state) => state.config);
    const urlParamsFilter = useMemo(() => fetchFiltersFromUrl(), []);
    const [availableFilters, setAvailableFilters] = useState([]);
    const [performGetFilterList] = useGetAvailableFiltersMutation();
    const [performGetMerchantFilterList] = useGetMerchantFiltersMutation();
    const [activeFilters, setActiveFilters] = useState({
        ...collectionFilters,
        ...urlParamsFilter,
    });
    const searchParams = useSearchParams();
    const auth = useSelector((state) => state.auth);
    // const [performGetCoursesListMutation] = useGetCoursesListMutation();
    const [performUseGetFilteredCoursesList] =
        useGetFilteredCoursesListMutation();
    const [recommendationsToShow, setRecommendationsToShow] = useState([]);
    const [page, setPage] = useState(
        Number(searchParams?.get("page"))
            ? Number(searchParams?.get("page"))
            : 1,
    );
    const [loading, setIsLoading] = useState(true);
    const hasTotalCountReached = useMemo(
        () => page * 10 >= totalDataCount.current,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [totalDataCount.current, page],
    );
    const isMobile = window.innerWidth < 768;
    const [currentPageItems, setCurrentPageItems] = useState([]);

    useEffect(() => {
        headingRef.current = document.querySelector("#showAllCourses");
    }, []);

    // const getCourseList = useCallback(
    //     async ({ pageNo = 1, limit = PAGE_SIZE }) => {
    //         setIsLoading(true);
    //         const res = await performGetCoursesListMutation({
    //             payload: {
    //                 category_id: 9,
    //                 customer_id: auth?.user?.id,
    //                 skill_id: skillId || appConfig?.skillReco?.id,
    //                 subject_id: subjId || appConfig?.subjectReco?.id,
    //                 page: pageNo,
    //                 limit,
    //             },
    //         });
    //         if (res?.data?.data?.status === "success") {
    //             const coursesData =
    //                 pageNo === 1
    //                     ? res?.data?.data?.data
    //                     : [
    //                           ...recommendationsToShow,
    //                           ...(res.data?.data?.data || []),
    //                       ];
    //             setRecommendationsToShow(coursesData);
    //             totalDataCount.current = res?.data?.data?.total_count || 0;
    //         }
    //         setCurrentPageItems(res?.data?.data?.data || []);
    //         setTimeout(() => {
    //             setIsLoading(false);
    //         }, 1000);
    //         // eslint-disable-next-line react-hooks/exhaustive-deps
    //     },
    //     [
    //         auth,
    //         appConfig,
    //         recommendationsToShow,
    //         skillId,
    //         subjId,
    //         performGetCoursesListMutation,
    //     ],
    // );

    useEffect(() => {
        if (withJsonLd) {
            let coursesToAdd = currentPageItems;
            if (coursesToAdd?.length > 0) {
                coursesToAdd = coursesToAdd?.map((course, index) => ({
                    "@type": "ListItem",
                    position: index + 1 + (page - 1) * PAGE_SIZE,
                    item: {
                        "@type": "Course",
                        url: `https://www.wizr.in/${course?.slug}`,
                        name: course?.product_name,
                        description: course?.meta_course_description,
                        offers: [
                            {
                                "@type": "Offer",
                                category: "Paid",
                                priceCurrency: course?.currency_type,
                                price: course?.offer_price,
                            },
                        ],
                        hasCourseInstance: {
                            courseMode: {
                                "Instructor-led (Live)": {
                                    Online: "Online",
                                    Hybrid: "Blended",
                                    "In-person (Offline)": "Onsite",
                                }[course?.course_delivery_mode],
                                Online: "Online",
                                Hybrid: "Blended",
                                "Self-paced (Recorded)": "Online",
                            }[course?.course_learning_mode],
                            ...getCourseSchedule(
                                course?.course_duration,
                                course?.duration_medium,
                                course?.course_learning_mode,
                                course?.course_delivery_mode,
                            ),
                        },

                        provider: {
                            "@type": "Organization",
                            name: course?.secondary_provider_name, // Institute name //
                            sameAs: `https://www.wizr.in${window?.location?.pathname}`, // Same as page URL
                        },
                    },
                }));
                const json = {
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    itemListElement: coursesToAdd,
                    ...(addtionalItemsForJsonLdScript
                        ? { additionalItemList: addtionalItemsForJsonLdScript }
                        : {}),
                };
                addOrUpdateScript(json, "course-list-ld-json");
            }
        }
        return () => document?.getElementById("course-list-ld-json")?.remove();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recommendationsToShow, currentPageItems, isMobile, withJsonLd]);

    const getFilteredCoursesList = useCallback(
        async ({ filters = {}, pageNo = 1, limit = PAGE_SIZE }) => {
            let allFilters = { ...filters, customer_id: auth?.user?.id };
            const skillIdFilter = [skillId || appConfig?.skillReco?.id];
            if (skillIdFilter.filter((id) => !!id).length > 0) {
                allFilters = { ...allFilters, skill_id: skillIdFilter };
            }
            const functionIdFilter = [subjId || appConfig?.subjectReco?.id];
            if (functionIdFilter.filter((id) => !!id).length > 0) {
                allFilters = { ...allFilters, function_id: functionIdFilter };
            }
            delete allFilters.skillId;
            delete allFilters.functionId;
            delete allFilters.expertise_level;
            delete allFilters.page;
            const payload = {
                filters: { ...allFilters },
                page: pageNo,
                limit,
            };

            // delete the search term from filter payload
            if (filters?.search) {
                payload.search = filters?.search;
                delete payload.filters.search;
            }

            setIsLoading(true);
            const res = await performUseGetFilteredCoursesList(payload);
            if (res?.data?.data?.status === "success") {
                const coursesData =
                    pageNo === 1
                        ? res?.data?.data?.data
                        : [
                              ...recommendationsToShow,
                              ...(res.data?.data?.data || []),
                          ];
                setRecommendationsToShow(coursesData);
                totalDataCount.current =
                    res?.data?.data?.total_count ||
                    res?.data?.data?.data?.length ||
                    0;
                const instituteData = res?.data?.data?.merchant;
                if (instituteData?.length > 0) {
                    setAvailableFilters((prev) =>
                        prev.map(({ label, values, key }) => {
                            if (key === "institute") {
                                return {
                                    label: "Institute",
                                    values: instituteData?.map(
                                        ({ merchant_name, merchant_sfid }) => ({
                                            option_label: merchant_name,
                                            option_value: merchant_sfid,
                                        }),
                                    ),
                                    key: "institute",
                                };
                            }
                            return { label, values, key };
                        }),
                    );
                }
            }
            setCurrentPageItems(res?.data?.data?.data || []);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            performUseGetFilteredCoursesList,
            recommendationsToShow,
            appConfig,
            skillId,
            subjId,
        ],
    );

    const onPageChange = useCallback(
        (pageNo) => {
            getFilteredCoursesList({ pageNo });
        },
        [getFilteredCoursesList],
    );

    const onClickShowMore = useCallback(
        (newPage, scrollToTop = false) => {
            if (hasTotalCountReached && newPage > page) return;
            if (scrollToTop && headingRef.current)
                headingRef.current.scrollIntoView();
            const newPageNo = newPage || page + 1;
            setPage(newPageNo);
            setIsLoading(true);
            if (isFilterActive.current) {
                getFilteredCoursesList({
                    filters: activeFilters,
                    pageNo: newPageNo,
                });
            } else {
                onPageChange(newPageNo);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        [
            page,
            onPageChange,
            setPage,
            activeFilters,
            hasTotalCountReached,
            isFilterActive,
            getFilteredCoursesList,
        ],
    );

    const applyFilter = useCallback(
        (key, value, pageNo = 1, limit = PAGE_SIZE, appendToUrl = true) => {
            dispatch(clearAllShortlistedCourse());
            let newFilters = { ...activeFilters };
            const collecFilters = { ...collectionFilters };
            if (value?.length > 0) {
                newFilters = {
                    ...newFilters,
                    [key]: value,
                };
            } else {
                delete newFilters[key];
            }
            if (Object.keys(collecFilters).includes(key)) {
                delete collecFilters[key];
            }
            isFilterActive.current = !isEmpty(newFilters);
            setActiveFilters(newFilters);
            if (limit === PAGE_SIZE) setPage(pageNo);
            // if (isFilterActive.current || !isEmpty(collectionFilters))
            getFilteredCoursesList({
                filters: {
                    ...newFilters,
                    ...(!skillId ? collecFilters : {}),
                },
                pageNo,
                limit,
            });

            if (appendToUrl) appendFilterToUrl(key, value);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            activeFilters,
            collectionFilters,
            skillId,
            subSkillId,
            getFilteredCoursesList,
        ],
    );
    useEffect(() => {
        if (typeof page === "number" && page > 1) {
            appendPageNoToUrl(page);
        } else if (typeof page === "number" && page === 1) {
            removeParamFromUrl("page");
        }
        // document?.getElementById("from-layout-jsx")?.remove();
    }, [page]);
    const getFilterList = useCallback(async () => {
        const res = isMerchantPage
            ? await performGetMerchantFilterList({
                  payload: {
                      merchant_sfid: collectionFilters?.institute?.[0],
                  },
              })
            : await performGetFilterList({
                  payload: {
                      customer_id: auth?.user?.id,
                  },
                  ...(isConceptPage ? { hide_concept: "Yes" } : {}),
                  skill_id: skillId,
                  ...(subSkillId ? { sub_skill_id: subSkillId } : {}),
              });

        if (res?.data?.data?.status === "success") {
            const filterObj = res.data.data.data?.filterList;
            let filterArr = Object.entries(filterObj).map((item) => {
                const obj = {
                    label: item[0],
                    values: item[1],
                    key: FILTER_KEYS[item[0]] || "_",
                };
                if (item[0] === "ratings") {
                    obj.values = obj.values.map((ratingItem) => {
                        const newObj = { ...ratingItem };
                        switch (ratingItem.option_value) {
                            case "4":
                                newObj.icon = Four;
                                break;
                            case "3":
                                newObj.icon = Three;
                                break;
                            case "2":
                                newObj.icon = Two;
                                break;
                            default:
                                break;
                        }
                        return newObj;
                    });
                }
                if (item[0] === "concepts") {
                    obj.values = obj.values.map((conceptItem) => ({
                        ...conceptItem,
                        option_value: String(conceptItem?.option_value),
                    }));
                }
                return obj;
            });

            filterArr = filterArr?.map((item) => {
                if (item?.label === "No-Cost / Low-Cost EMI") {
                    return {
                        ...item,
                        label: "No-Cost EMI",
                    };
                }
                return item;
            });

            filterArr = filterArr.filter((item) => item.values?.length);
            setAvailableFilters(filterArr);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth, skillId]);

    useEffect(() => {
        getFilterList();
        // if the skill/subj changes, reset the page to 1
        let key;
        let value;
        if (subSkillId) {
            key = "sub_skills";
            value = [subSkillId];
        }
        const pageToFetch =
            prevDataRef.current.skillId !== skillId ||
            prevDataRef.current.subjId !== subjId
                ? 1
                : page ?? 1;
        applyFilter(key, value, pageToFetch, undefined, false);
        prevDataRef.current.skillId = skillId;
        prevDataRef.current.subjId = subjId;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collectionFilters, skillId, subjId, subSkillId, userPinCode]);

    const noCourses = (
        <h2
            style={{
                margin: "auto",
                fontFamily: "var(--font-patron)",
                padding: "212px 0px",
            }}
        >
            {activeFilters?.delivery_mode?.includes("In-person (Offline)")
                ? "Update your pin code"
                : "No courses found"}
        </h2>
    );

    const getHeading = (heading) => {
        let str = heading;
        if (!(str?.toLowerCase()?.indexOf("courses") > -1))
            str = `${str ?? ""} Courses`;
        str = str?.replace("All ", "");
        str = str?.replace("all ", "");
        return str;
    };

    return (
        <div className={styles.listingContainer}>
            {breadcrumbs && breadcrumbs}
            <div id="showAllCourses" className={styles.head}>
                <div>
                    {showSearchHeading &&
                    !isEmpty(activeFilters) &&
                    activeFilters?.search !== "" ? (
                        <h2 className={styles.searchHead}>
                            Showing {totalDataCount.current} Courses for{" "}
                            <span>&quot;{skillObj?.skill_name}&quot;</span>
                        </h2>
                    ) : (
                        <>
                            <h2>
                                {listingHeading || (
                                    <>
                                        Showing all{" "}
                                        {getHeading(
                                            subSkillName ||
                                                skillObj?.skill_name ||
                                                appConfig
                                                    ?.collectionExplorationFilters
                                                    ?.collectionName ||
                                                appConfig?.skillReco?.name,
                                        )}
                                    </>
                                )}
                            </h2>
                            {totalDataCount.current !== 0 && (
                                <sup className={styles.power}>
                                    ({kFormatter(totalDataCount.current)})
                                </sup>
                            )}
                            {totalDataCount.current !== 0 && (
                                <span className={styles.powerMobile}>
                                    ({kFormatter(totalDataCount.current)})
                                </span>
                            )}
                        </>
                    )}
                </div>
                {setOpenPinCodeModal ? (
                    <div>
                        {!userPinCode ? (
                            <motion.div
                                className={`${styles.compareButton}`}
                                type="button"
                                variant="primary"
                                style={{
                                    width: "fit-content",
                                }}
                                onClick={() => setOpenPinCodeModal(true)}
                            >
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transition: {
                                            duration: 0.3,
                                            delay: 0.2,
                                        },
                                    }}
                                    className={styles.pinCodeContainer}
                                >
                                    <MapIcon />
                                    <h6 className={styles.pinText}>
                                        Update Location
                                    </h6>
                                    <Image
                                        onClick={() =>
                                            setOpenPinCodeModal(true)
                                        }
                                        src={EditIcon}
                                        alt="edit"
                                    />
                                </motion.div>
                            </motion.div>
                        ) : (
                            <motion.div
                                className={`${styles.compareButton} compareButton`}
                                type="button"
                                variant="primary"
                                style={{
                                    width: "fit-content",
                                }}
                            >
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transition: {
                                            duration: 0.3,
                                            delay: 0.2,
                                        },
                                    }}
                                    className={styles.pinCodeContainer}
                                >
                                    <MapIcon />
                                    <h6 className={styles.pinText}>
                                        {`${
                                            userCity && userCity !== null
                                                ? `${userCity},`
                                                : ""
                                        } ${userPinCode}`}
                                    </h6>

                                    <Image
                                        onClick={() =>
                                            setOpenPinCodeModal(true)
                                        }
                                        src={EditIcon}
                                        alt="edit"
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </div>
                ) : null}
            </div>
            <div className={styles.filterParent}>
                <FilterBox
                    applyFilter={applyFilter}
                    activeFilters={activeFilters}
                    availableFilters={availableFilters}
                    hideInstitueFilter={hideInstitueFilter}
                />
                {
                    <div className={styles.productBox}>
                        <div className={styles.cardContainer}>
                            {!isMobile &&
                                (recommendationsToShow?.length
                                    ? recommendationsToShow.map(
                                          (recommendation) => (
                                              <CourseCard
                                                  // animateAll
                                                  key={`${
                                                      recommendation?.product_sfid
                                                  }-${Math.random()
                                                      .toString(16)
                                                      .slice(2)}`}
                                                  item={recommendation}
                                                  setShowCompTile={
                                                      setShowCompTile
                                                  }
                                                  showCompTile={showCompTile}
                                                  count={count}
                                                  setCount={setCount}
                                              />
                                          ),
                                      )
                                    : !loading && noCourses)}
                            {isMobile &&
                                (currentPageItems?.length
                                    ? currentPageItems?.map(
                                          (recommendation, idx) => (
                                              <CourseCard
                                                  // animateAll
                                                  key={
                                                      recommendation?.product_sfid
                                                  }
                                                  index={idx}
                                                  item={recommendation}
                                                  setShowCompTile={
                                                      setShowCompTile
                                                  }
                                                  showCompTile={showCompTile}
                                                  count={count}
                                                  setCount={setCount}
                                              />
                                          ),
                                      )
                                    : !loading && noCourses)}
                            {/* <Image
                                width={150}
                                src={GIF}
                                alt=""
                                style={{
                                    alignSelf: "center",
                                    justifySelf: "center",
                                    scale: 2,
                                    margin: "auto",
                                    display: loading ? "block" : "none",
                                }}
                            /> */}
                        </div>
                        {!hasTotalCountReached && (
                            <button
                                type="button"
                                className={styles.desktopShowMore}
                                onClick={() => onClickShowMore(null, false)}
                            >
                                Show more (
                                {recommendationsToShow &&
                                    totalDataCount.current -
                                        (recommendationsToShow?.length ||
                                            0)}{" "}
                                to go)
                            </button>
                        )}
                        {totalDataCount.current > 10 && (
                            <Pagination
                                value={page}
                                onChange={(value) =>
                                    onClickShowMore(value, true)
                                }
                                total={Math.ceil(
                                    totalDataCount.current / PAGE_SIZE,
                                )}
                                className={styles.mobilePagination}
                                boundaries={1}
                                noWrap
                                siblings={0}
                                align="center"
                                position="center"
                                styles={(theme) => ({
                                    control: {
                                        width: "29px",
                                        height: "29px",
                                        fontSize: "12px",
                                        borderWidth: "0",
                                        color: "#A198AC",
                                        backgroundColor: "transparent",

                                        "&[data-active]": {
                                            backgroundColor: "#A198AC",
                                            borderRadius: "50%",
                                            minWidth: "2rem",
                                            minHeight: "2rem",
                                        },

                                        [`@media (max-width: ${em(
                                            getBreakpointValue(
                                                theme.breakpoints.lg,
                                            ),
                                        )})`]: {
                                            "&:first-child": {
                                                margin: "7px 0 7px 10px",
                                            },
                                            "&:last-child": {
                                                margin: "7px 0 7px 0",
                                            },
                                        },
                                    },
                                    dots: {
                                        color: "#A198AC",
                                        paddingTop: "10px",
                                    },
                                })}
                            />
                        )}
                    </div>
                }
            </div>
            {!hideLoader && <Loader isLoading={loading} />}
            {/* <CanonicalURL page={page} /> */}
        </div>
    );
}
