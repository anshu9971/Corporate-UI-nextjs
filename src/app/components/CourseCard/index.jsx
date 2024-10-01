/* eslint-disable no-nested-ternary */

"use client";

import Pill from "components/Pill";
import Image from "next/image";
import compareLogo from "assets/svgs/check_square.svg";
import SealCheck from "assets/svgs/checkMark.svg";
import FreeCourseIcon from "assets/svgs/freeCourseIcon.svg";
import discountIcon from "assets/svgs/discount.svg";
import discountIconBlack from "assets/svgs/discount_black.svg";
// import { Coins } from "assets/svgs";
import { Button } from "components/Button";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    removeShortlistedCourse,
    setShortlistedCourses,
} from "redux/store/configSlice";
import { useSetUserFlagMutation } from "services/users";
import { motion } from "framer-motion";
import { Tooltip } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { createSlug } from "utils/helpers";
import { useGetDataBySlugMutation } from "services/genericServices";
import styles from "./CourseCard.module.scss";
import { formatWithCurrency } from "../../utils/constants";
import Rating from "../Rating";
import { storage } from "../../services/storage";

export default function CourseCard({
    item = {},

    className,
    setShowCompTile = () => {},
    count = 0,
    setCount = () => {},
    hideCta = false,
    hideCompare = false,
    onClickViewDetails = null,
    isLSQPage,
    onClick,
}) {
    const isUdemyCard =
        item?.course_provider_platform_name?.toLowerCase() === "udemy" ||
        item?.m_custom_2?.length;
    const isFreeCourse = item?.journey_type === "Free course";
    const format = (amount) => formatWithCurrency(amount, item?.currency_type);
    const { push } = useRouter();
    const ref = useRef(null);
    const [setUserFlag] = useSetUserFlagMutation();
    const auth = useSelector((state) => state.auth);
    const isLoggedIn = useMemo(() => !!auth.token, [auth]);
    const allShortlistedCourses = useSelector(
        (state) => state.config.shortlistedCourses,
    );
    const [getDataBySlug] = useGetDataBySlugMutation();
    const searchParams = useSearchParams();

    const handleSlug = (slug) => {
        const functionId = searchParams.get("functionId");
        const skillId = searchParams.get("skillId");
        if (functionId && skillId) {
            push(`${slug}?functionId=${functionId}&skillId=${skillId}`);
        } else {
            push(slug);
        }
    };

    const isShortlisted = useMemo(
        () =>
            allShortlistedCourses.findIndex(
                (course) =>
                    course.merchant_product_sfid === item.merchant_product_sfid,
            ) > -1,
        [allShortlistedCourses, item.merchant_product_sfid],
    );

    const dispatch = useDispatch();

    const [compareClicked, setCompareClicked] = useState(false);

    useEffect(() => {
        if (compareClicked) {
            setCount(count + 1);
        }
        setShowCompTile(compareClicked);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [compareClicked, setShowCompTile]);

    useEffect(() => {
        if (count === 0) {
            setCompareClicked(false);
        }
    }, [count]);
    const [toolipVisivle, setTooltipVisible] = useState(false);

    const getUdemyText = () => item.m_custom_2?.split("of");
    const getCourseDetails = async (slug) => {
        try {
            const res = await getDataBySlug({
                payload: {
                    type: "course",
                    slug_name: slug,
                },
            });
            return res?.data?.data?.data;
        } catch (error) {
            console.log("error", error);
            return null;
        }
    };
    return (
        <div
            ref={ref}
            className={`${styles.card} ${
                isShortlisted ? ` ${styles.hovered}` : ""
            } ${className}`}
        >
            <div className={styles.row1}>
                {item.institute_horizontal_logo || item.cpp_horizontal_logo ? (
                    <Image
                        src={
                            item.institute_horizontal_logo ||
                            item.cpp_horizontal_logo
                        }
                        width={90}
                        height={30}
                        alt="courseName"
                        className={styles.providerLogo}
                    />
                ) : (
                    <div />
                )}
                <Pill
                    title={item.course_level}
                    backgroundColor="#CBC6D1"
                    className={styles.levelPill}
                />
            </div>
            <div className={styles.row2}>
                <Tooltip opened={toolipVisivle} label={item.product_name}>
                    <h3
                        ref={(r) => {
                            r?.addEventListener("mouseenter", () => {
                                setTooltipVisible(
                                    r?.scrollHeight > r?.offsetHeight,
                                );
                            });
                            r?.addEventListener("mouseleave", () => {
                                setTooltipVisible(false);
                            });
                        }}
                    >
                        {item.product_name}
                    </h3>
                </Tooltip>
            </div>
            {!isUdemyCard ? (
                <div className={styles.row3}>
                    {isFreeCourse ? (
                        <Image src={FreeCourseIcon} />
                    ) : item?.price_on_request ? (
                        <p>Price on request</p>
                    ) : (
                        <div className={styles.pricing}>
                            {item.min_avi_emi && (
                                <div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <p
                                            className={styles.priceKey}
                                            style={{ minWidth: "max-content" }}
                                        >
                                            EMI Starts at
                                        </p>
                                        <p style={{ minWidth: "max-content" }}>
                                            {format(item.min_avi_emi)}/mth
                                        </p>
                                    </div>
                                </div>
                            )}
                            <div>
                                <div>
                                    <p
                                        className={styles.priceKey}
                                        style={{ minWidth: "max-content" }}
                                    >
                                        Total Cost
                                    </p>
                                    {item.discount_rate &&
                                    item.offer_price < item.loan_amount ? (
                                        <span
                                            className={styles.discountRate}
                                            style={{ minWidth: "max-content" }}
                                        >
                                            &nbsp;
                                            {item?.discount_rate?.toFixed(2)}
                                            {item.discount_rate ? "% off" : ""}
                                        </span>
                                    ) : null}
                                </div>
                                <div>
                                    {item.offer_price &&
                                    item.offer_price < item.loan_amount ? (
                                        <p
                                            className={styles.oldPrice}
                                            style={{ minWidth: "max-content" }}
                                        >
                                            {format(item.loan_amount)}/-
                                        </p>
                                    ) : null}
                                    &nbsp;
                                    <p style={{ minWidth: "max-content" }}>
                                        {format(item.offer_price)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {item.average_ratings && (
                        <div className={styles.rating}>
                            <Rating rating={item.average_ratings || 0} />
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.rowUdemy}>
                    <div className={styles.udemyContainer}>
                        <p className={styles.udemyText}>
                            {getUdemyText()?.[0] || ""}
                            <motion.span
                                onClick={() =>
                                    handleSlug(createSlug(item.merchant_slug))
                                }
                            >
                                {getUdemyText()?.[1] || ""}
                            </motion.span>
                        </p>
                        <div className={styles.udemyPriceContainer}>
                            {/* <Coins /> */}
                            <p className={styles.priceKey}>
                                {format(item.offer_price)}/-
                            </p>
                            <p className={styles.emiKey}>
                                EMI starting at {format(item.min_avi_emi)}/mth
                            </p>
                        </div>
                    </div>

                    {item.average_ratings && (
                        <div className={styles.rating}>
                            <Rating rating={item.average_ratings || 0} />
                        </div>
                    )}
                </div>
            )}

            {!hideCta && (
                <div className={styles.row4}>
                    {!hideCompare && (
                        <Button
                            className={`${styles.compareButton} ${
                                isShortlisted ? styles.shortlisted : ""
                            } compareButton`}
                            type="button"
                            variant="primary"
                            widthStyle="long"
                            style={{
                                width: "100%",
                            }}
                            onClick={async () => {
                                if (isLoggedIn) {
                                    setUserFlag({
                                        payload: {
                                            customer_id: auth?.user?.id,
                                            flag_type: "Course_compared",
                                        },
                                    });
                                }
                                if (isShortlisted) {
                                    dispatch(
                                        removeShortlistedCourse(
                                            item.merchant_product_sfid,
                                        ),
                                    );
                                } else {
                                    setCompareClicked(true);
                                    const courseDetails =
                                        await getCourseDetails(item?.slug);
                                    dispatch(
                                        setShortlistedCourses(courseDetails),
                                    );
                                }
                            }}
                        >
                            <Image
                                style={{
                                    marginRight: 7,
                                }}
                                src={isShortlisted ? SealCheck : compareLogo}
                                alt="compareLogo"
                            />
                            <motion.span>
                                {isShortlisted ? "Shortlisted" : "Compare"}
                            </motion.span>
                        </Button>
                    )}
                    <div className={styles.buttons}>
                        <Button
                            variant="primary"
                            widthStyle="long"
                            style={{
                                backgroundColor: "var(--primary-dark-1)",
                                width: "100%",
                            }}
                            onClick={() => {
                                if (isLSQPage) {
                                    onClick(item);
                                } else {
                                    if (
                                        typeof onClickViewDetails === "function"
                                    ) {
                                        onClickViewDetails(item);
                                        return;
                                    }
                                    storage.set.tempData({
                                        skillId: item.skill_id,
                                        productId: item.product_sfid,
                                        merchantProductId:
                                            item.merchant_product_sfid,
                                    });
                                    handleSlug(createSlug(item.slug));
                                }
                            }}
                        >
                            View Details
                        </Button>

                        {item.zero_cost_finance === "Yes" ? (
                            <Pill
                                backgroundColor="#CBFB62"
                                className={styles.discountPill}
                                title={
                                    <>
                                        <Image
                                            src={discountIcon}
                                            alt="discount"
                                        />
                                        <span>No-cost EMI</span>
                                    </>
                                }
                            />
                        ) : (
                            item?.is_low_cost_emi === "Yes" && (
                                <Pill
                                    backgroundColor="#A198AC"
                                    className={styles.discountPill}
                                    title={
                                        <>
                                            <Image
                                                src={discountIconBlack}
                                                alt="discount"
                                            />
                                            <span>Low Cost EMI</span>
                                        </>
                                    }
                                />
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
