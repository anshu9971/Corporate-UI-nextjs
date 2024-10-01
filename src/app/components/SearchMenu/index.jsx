import { motion } from "framer-motion";
import { SearchIcon } from "assets/svgs";
import { useGetSearchProductsMutation } from "services/genericServices";
import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { createSlug } from "utils/helpers";
import { useRouter } from "next/navigation";
import throttle from "lodash/throttle";
import isEmpty from "lodash/isEmpty";
import Image from "next/image";
import Glasses from "assets/images/eye-glasses.png";
import styles from "./SearchMenu.module.scss";

const SearchMenu = forwardRef(
    ({ onSelectOption, containerClassName = "", animate = true }, ref) => {
        const { push } = useRouter();
        const [searchText, setSearchText] = useState("");
        const [searchData, setSearchData] = useState({
            courses: [],
            subject: [],
            skill: [],
            merchant: [],
        });
        const [performGetSearchProducts] = useGetSearchProductsMutation();

        const fetchSearchProducts = useCallback(async (text = "") => {
            const res = await performGetSearchProducts({
                payload: {
                    searchText: text,
                },
            });
            if (res?.data?.data?.status === "success") {
                const data = isEmpty(res?.data?.data?.data)
                    ? searchData
                    : res?.data?.data?.data;
                setSearchData(data);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        const debouncedFetchSearchProducts = useRef(
            throttle(fetchSearchProducts, 800),
        );
        useEffect(() => {
            fetchSearchProducts();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        const selectOption = useCallback((slug) => {
            if (!slug) return;
            push(createSlug(slug));
            onSelectOption();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        useImperativeHandle(ref, () => ({
            fetchSearchProducts: (text) => {
                debouncedFetchSearchProducts.current(text);
                setSearchText(text);
            },
            searchAllResults: selectOption,
        }));
        return (
            <div
                className={`${styles.searchMenuContainer} ${containerClassName}`}
            >
                <motion.div
                    initial={{
                        opacity: animate ? 0 : 1,
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            delay: animate ? 0.1 : 0,
                        },
                    }}
                    exit={{ opacity: animate ? 1 : 0 }}
                >
                    {searchText ? (
                        <button
                            className={styles.title}
                            type="button"
                            onClick={() => {
                                selectOption(
                                    `/search?q=${encodeURIComponent(
                                        searchText,
                                    )}`,
                                );
                            }}
                        >
                            <h3
                                className={styles.titleText}
                            >{`Search all courses matching "${searchText}"`}</h3>
                        </button>
                    ) : (
                        <h3 className={styles.titleText}>
                            Search for Courses{" "}
                        </h3>
                    )}
                    {searchData.subject?.length ? (
                        <div className={styles.section}>
                            <p className={styles.subHeading}>
                                POPULAR SUBJECTS
                            </p>
                            {searchData.subject.map((item) => (
                                <button
                                    type="button"
                                    onClick={() => {
                                        selectOption(item.subject_slug);
                                    }}
                                    className={styles.link}
                                >
                                    <SearchIcon />
                                    <p>{item.subject_name}</p>
                                </button>
                            ))}
                        </div>
                    ) : null}
                    {searchData.concept?.length ? (
                        <div className={styles.section}>
                            <p className={styles.subHeading}>
                                POPULAR CONCEPTS
                            </p>
                            {searchData.concept.map((item) => (
                                <button
                                    type="button"
                                    onClick={() => {
                                        selectOption(item.concept_slug);
                                    }}
                                    className={styles.link}
                                >
                                    <SearchIcon />
                                    <p>{item.concept_name}</p>
                                </button>
                            ))}
                        </div>
                    ) : null}
                    {searchData.skill?.length ? (
                        <div className={styles.section}>
                            <p className={styles.subHeading}>POPULAR SKILLS</p>
                            {searchData.skill.map((item) => (
                                <button
                                    type="button"
                                    onClick={() => {
                                        selectOption(item.skill_slug);
                                    }}
                                    className={styles.link}
                                >
                                    <SearchIcon />
                                    <p>{item.skill_name}</p>
                                </button>
                            ))}
                        </div>
                    ) : null}
                    {searchData.courses?.length ? (
                        <div className={styles.section}>
                            <p className={styles.subHeading}>POPULAR COURSES</p>
                            {searchData.courses.map((item) => (
                                <button
                                    type="button"
                                    onClick={() => {
                                        selectOption(item.course_slug);
                                    }}
                                    className={`${styles.link} ${styles.courseLink}`}
                                >
                                    <p>{item.courses_name}</p>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={
                                            item?.institute_horizontal_logo ||
                                            item?.cpp_horizontal_logo
                                        }
                                        alt="logo"
                                    />
                                </button>
                            ))}
                        </div>
                    ) : null}
                    {searchData.merchant?.length ? (
                        <div className={styles.section}>
                            <p className={styles.subHeading}>
                                POPULAR INSTITUTES
                            </p>
                            {searchData.merchant.map((item) => (
                                <button
                                    type="button"
                                    onClick={() => {
                                        selectOption(item.merchant_slug);
                                    }}
                                    className={`${styles.link} ${styles.courseLink}`}
                                >
                                    <p>{item.merchant_name}</p>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={item?.cpp_horizontal_logo}
                                        alt="logo"
                                    />
                                </button>
                            ))}
                        </div>
                    ) : null}
                    {!searchData.subject?.length &&
                    !searchData.courses?.length &&
                    !searchData.skill?.length &&
                    !searchData.merchant?.length &&
                    searchText?.length ? (
                        <div className={styles.noData}>
                            <Image src={Glasses} alt="eye-glass" />
                            <p>No Results Found!</p>
                        </div>
                    ) : null}
                </motion.div>
            </div>
        );
    },
);
export default SearchMenu;
