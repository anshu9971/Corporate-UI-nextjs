/* eslint-disable no-unsafe-optional-chaining */
import Close from "assets/svgs/cancel_icon.svg";
import { Button } from "components/Button";
import ArrowUp from "assets/svgs/arrow_up.svg";
import BlackArrowDown from "assets/svgs/black_arrow_down.svg";
import DisabledArrowUp from "assets/svgs/disabled_arrow.svg";
import ArrowDown from "assets/svgs/arrow_down_bold.svg";
import SealCheck from "assets/svgs/seal_check.svg";
// import SkillUp from "assets/svgs/skillup.svg";
import Book from "assets/svgs/BookOpenText.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearAllShortlistedCourse,
    removeShortlistedCourse,
} from "redux/store/configSlice";
import { createSlug } from "utils/helpers";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Tooltip } from "@mantine/core";
import { Field } from "./components/Field";
import styles from "./Comparison.module.scss";

const COMPARISON_ATTRIBUTES = [
    {
        label: "Provider",
        key: "merchant_logo_url",
    },

    {
        label: "No-cost EMI",
        key: "zero_cost_finance",
    },
    {
        label: "Fees",
        key: "offer_price",
    },
    {
        label: "Delivery Mode",
        key: "course_delivery_mode",
    },
    {
        label: "Eligibility Required",
        key: "course_eligibility",
    },
    {
        label: "Level",
        key: "course_level",
    },
    {
        label: "Certification",
        key: "certificate_availability",
    },
    {
        label: "What will you learn",
        key: "what_will_you_learn",
    },
    {
        label: "Instructors",
        key: "course_faculty",
    },
    {
        label: "Syllabus",
        key: "course_syllabus",
    },
    {
        label: "Duration",
        key: "course_duration",
    },
    {
        label: "Learning Mode",
        key: "course_learning_mode",
    },
    {
        label: "Language",
        key: "medium_of_instruction",
    },
    {
        label: "Scholarship",
        key: "scholarship",
    },
    {
        label: "Placement Assistance",
        key: "placement_assistance",
    },
];

export default function Comparison({ onClick }) {
    const { push } = useRouter();
    const dispatch = useDispatch();

    const allShortlistedCourses = useSelector(
        (state) => state.config.shortlistedCourses,
    );
    const [showComparison, setShowComparison] = useState(false);
    const [window, setWindow] = useState(0);

    useEffect(() => {
        if (!window) return;
        setWindow(window.innerWidth);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const count = allShortlistedCourses.length;

    useEffect(() => {
        if (count === 0) setShowComparison(false);
    }, [count]);

    useEffect(
        () => () => {
            dispatch(clearAllShortlistedCourse());
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );
    const [tooltipVisibility, setTooltipVisibility] = useState({
        0: false,
        1: false,
        2: false,
    });

    useEffect(
        () =>
            document?.addEventListener("touchend", ({ target }) =>
                allShortlistedCourses?.map(({ merchant_product_sfid: id }) =>
                    !document?.getElementById(id)?.contains(target)
                        ? setTooltipVisibility({
                              0: false,
                              1: false,
                              2: false,
                          })
                        : null,
                ),
            ),
        // eslint-disable-next-line  react-hooks/exhaustive-deps
        [],
    );
    if (count)
        return (
            <div
                className={
                    showComparison
                        ? styles.comparisonContainer
                        : `${styles.comparisonContainer} ${styles.hideComparisonContainer}`
                }
            >
                <div
                    className={
                        showComparison ? styles.blurArea : styles.hideComparison
                    }
                />

                <div
                    className={showComparison ? styles.head : styles.closedHead}
                >
                    <div
                        className={
                            showComparison
                                ? styles.title
                                : styles.hideComparison
                        }
                    >
                        Comparing {count} courses
                    </div>
                    {count > 0 && (
                        <div className={styles.responsiveTile}>
                            <Image
                                src={SealCheck}
                                alt="seal_checked"
                                className={styles.check}
                            />
                            {`${count} Course${
                                count > 1 ? "s" : ""
                            } selected for comparison`}
                        </div>
                    )}
                    <div className={styles.tile} />
                    <AnimatePresence mode="popLayout">
                        {allShortlistedCourses.map((item, index) => (
                            <motion.div
                                key={item.merchant_product_sfid}
                                initial={{
                                    opacity: 0,
                                    y: 50,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.4 },
                                }}
                                exit={{ opacity: 0, y: 50 }}
                                className={styles.tile}
                            >
                                <div className={styles.courseParent}>
                                    <p>{index + 1}</p>
                                    <Tooltip
                                        label={item?.product_name}
                                        opened={tooltipVisibility[index]}
                                        events={{
                                            hover: true,
                                            touch: true,
                                        }}
                                    >
                                        <div
                                            className={styles.course}
                                            id={item?.merchant_product_sfid}
                                            ref={(r) => {
                                                r?.addEventListener(
                                                    "mouseenter",
                                                    () => {
                                                        setTooltipVisibility(
                                                            (prev) => ({
                                                                ...prev,
                                                                [index]:
                                                                    r?.scrollHeight -
                                                                        r?.offsetHeight >
                                                                    2,
                                                            }),
                                                        );
                                                    },
                                                );
                                                r?.addEventListener(
                                                    "mouseleave",
                                                    () => {
                                                        setTooltipVisibility(
                                                            (prev) => ({
                                                                ...prev,
                                                                [index]: false,
                                                            }),
                                                        );
                                                    },
                                                );
                                            }}
                                        >
                                            {item.product_name}
                                        </div>
                                    </Tooltip>
                                    <button
                                        onClick={() => {
                                            dispatch(
                                                removeShortlistedCourse(
                                                    item.merchant_product_sfid,
                                                ),
                                            );
                                        }}
                                        type="button"
                                    >
                                        <Image
                                            src={Close}
                                            alt="close_icon"
                                            className={styles.closeIcon}
                                        />
                                    </button>
                                </div>
                                <Button
                                    variant="primary"
                                    widthStyle="long"
                                    style={{
                                        backgroundColor: "#50495A",
                                        padding: "7px 18px",
                                        display: `${
                                            showComparison ? "initial" : "none"
                                        }`,
                                    }}
                                    className={styles.enrollBtn}
                                    onClick={() => {
                                        if (onClick) {
                                            onClick(item.slug);
                                        } else {
                                            push(createSlug(item.slug));
                                        }
                                    }}
                                >
                                    View Details
                                </Button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <AnimatePresence mode="popLayout">
                        {/* eslint-disable-next-line no-unused-vars */}
                        {new Array(3 - count).fill("").map((_, index) => (
                            <motion.div
                                // eslint-disable-next-line react/no-array-index-key
                                key={`animation-object-${index}`}
                                initial={{
                                    opacity: 0,
                                    y: 50,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.4 },
                                }}
                                exit={{ opacity: 0, y: 50 }}
                                className={styles.tile}
                            >
                                <div className={styles.emptyParent}>
                                    <Image src={Book} alt="book_icon" />

                                    <div className={styles.emptyText}>
                                        Add a course from the listing
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div
                        className={
                            showComparison
                                ? styles.hideComparison
                                : styles.compareBtn
                        }
                    >
                        <button
                            type="button"
                            className={styles.dismissBtn}
                            style={{
                                marginBottom: 12,
                            }}
                            onClick={() => {
                                dispatch(clearAllShortlistedCourse());
                            }}
                        >
                            Dismiss
                        </button>
                        <Button
                            variant="primary"
                            widthStyle="long"
                            onClick={() => setShowComparison(true)}
                            disabled={count < 2}
                        >
                            Compare
                            {count < 2 ? (
                                <Image
                                    src={DisabledArrowUp}
                                    alt="compare_btn_icon"
                                />
                            ) : (
                                <>
                                    <Image
                                        src={ArrowUp}
                                        alt="compare_btn_icon"
                                    />
                                    <Image
                                        src={BlackArrowDown}
                                        alt="compare_btn_icon"
                                        style={{ transform: "rotate(180deg)" }}
                                    />
                                </>
                            )}
                        </Button>
                    </div>
                    {showComparison ? (
                        <button
                            type="button"
                            className={styles.dismissBtn}
                            onClick={() => {
                                setShowComparison(false);
                            }}
                        >
                            Dismiss{" "}
                            <Image
                                src={ArrowDown}
                                alt="dismiss_comparison_icon"
                                width={20}
                                height={20}
                            />
                        </button>
                    ) : (
                        <button
                            type="button"
                            className={styles.crossBtn}
                            onClick={() => {
                                dispatch(clearAllShortlistedCourse());
                            }}
                        >
                            <Image
                                src={Close}
                                alt="close_comparison_icon"
                                width={35}
                                height={35}
                            />
                        </button>
                    )}
                </div>
                <div
                    className={
                        showComparison
                            ? styles.rowContainer
                            : ` ${styles.hideComparison}`
                    }
                >
                    {COMPARISON_ATTRIBUTES.map((item) => (
                        <div className={styles.row}>
                            <div className={styles.value}>{item.label}</div>
                            {allShortlistedCourses &&
                                allShortlistedCourses.length &&
                                allShortlistedCourses.map((course) => (
                                    <Field
                                        type={item.key}
                                        value={course[item.key]}
                                        window={window}
                                        courseDetail={course}
                                    />
                                ))}
                            <div className={styles.value} />
                        </div>
                    ))}
                </div>
            </div>
        );
}
