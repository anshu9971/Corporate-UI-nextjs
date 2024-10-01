"use client";

import Image from "next/image";
import BackIcon from "assets/svgs/back_icon_1.svg";
import Pill from "components/Pill";
import { Button } from "components/Button";
import ArrowDown from "assets/svgs/arrow_down.svg";
import CurledArrow from "assets/svgs/curledArrowGreen.svg";
import CourseCard from "components/CourseCard";
import { motion } from "framer-motion";
import EditIcon from "assets/svgs/edit_icon_fff.svg";
import MapIcon from "assets/svgs/mapPinWhite.svg";
// import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useGetRecomendedCoursesQuery } from "services/listingServices";
import styles from "./Recommendations.module.scss";

export default function Recommendations({
    setShowCompTile,
    showCompTile,
    count,
    setCount,
    quizName = null,
    currentLevel = null,
    skillId,
    userPinCode,
    setOpenPinCodeModal = () => {},
    userCity,
    recommendedCourse,
}) {
    const { replace, back } = useRouter();
    // const appConfig = useSelector((state) => state.config);
    const { data: { data: { data: topCoursesData = [] } = {} } = {} } =
        useGetRecomendedCoursesQuery(skillId, { skip: !skillId }) ?? {};

    const isDataEmpty = useMemo(
        () => !topCoursesData?.length ?? true,
        [topCoursesData],
    );

    if (isDataEmpty && !recommendedCourse) return null;
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <button
                    onClick={() => {
                        if (recommendedCourse) {
                            back();
                        } else {
                            replace("/start-skilling");
                        }
                    }}
                    type="button"
                    className={styles.back}
                >
                    <Image src={BackIcon} alt="back" />
                    <span>Back to quiz</span>
                </button>
                {(!isDataEmpty || recommendedCourse) && (
                    <div className={styles.pills}>
                        {quizName && (
                            <Pill
                                title={quizName}
                                backgroundColor="#7E9392"
                                style={{ transform: "rotate(-2deg)" }}
                            />
                        )}
                        {currentLevel && (
                            <Pill
                                title={currentLevel}
                                backgroundColor="#A79593"
                                style={{ transform: "rotate(2deg)" }}
                            />
                        )}
                        {/* <Pill
                            title={
                                topCoursesData?.customerInterest
                                    ?.preferred_learning
                            }
                            backgroundColor="#AAAEBA"
                            style={{ transform: "rotate(-2deg)" }}
                        /> */}
                    </div>
                )}
                <motion.h1
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                        },
                    }}
                >
                    {isDataEmpty && !recommendedCourse?.length
                        ? "No courses found based on your preferences"
                        : "Your top Course Recommendations"}
                </motion.h1>
                <motion.p
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
                >
                    {isDataEmpty && !recommendedCourse?.length ? (
                        "Browse the courses available with us"
                    ) : (
                        <>
                            We recommend the following courses on the <br />
                            basis of your skill fitment report to bridge your
                            skill gap.
                        </>
                    )}
                    {!recommendedCourse?.length ? null : (
                        <Image src={CurledArrow} className={styles.arrow} />
                    )}
                </motion.p>
                {!userPinCode ? (
                    <motion.div
                        onClick={() => setOpenPinCodeModal(true)}
                        className={styles.pinCodeContainer}
                    >
                        <Image src={MapIcon} alt="map" />
                        <p className={styles.pinText}>Update Location</p>
                    </motion.div>
                ) : (
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
                        <Image src={MapIcon} alt="map" />
                        <p className={styles.pinText}>
                            {`${
                                userCity && userCity !== null
                                    ? `${userCity},`
                                    : ""
                            } ${userPinCode}`}
                        </p>
                        <motion.div onClick={() => setOpenPinCodeModal(true)}>
                            <Image src={EditIcon} alt="edit" />
                        </motion.div>
                    </motion.div>
                )}

                <Button
                    onClick={() => {
                        const el = document.querySelector("#showAllCourses");
                        if (!el) return;
                        el.scrollIntoView({ behavior: "smooth" });
                        // const elBounds = el.getBoundingClientRect();
                        // const offsetPosition =
                        //     elBounds.top + window.pageYOffset;
                        // document.body?.scrollTo({
                        //     top: offsetPosition,
                        //     behavior: "smooth",
                        // });
                    }}
                    variant="primary"
                    widthStyle="long"
                    className={styles.viewAll}
                >
                    View all courses
                    <Image src={ArrowDown} />
                </Button>
            </div>
            {recommendedCourse ? (
                <div className={styles.right}>
                    {recommendedCourse
                        ?.filter((_, index) => index < 3) // show only first 3 courses
                        ?.map((recommendation, idx) => (
                            <CourseCard
                                index={idx}
                                key={String(idx) + recommendation.courseName}
                                item={recommendation}
                                setShowCompTile={setShowCompTile}
                                showCompTile={showCompTile}
                                count={count}
                                setCount={setCount}
                            />
                        ))}
                </div>
            ) : (
                <div className={styles.right}>
                    {topCoursesData
                        ?.filter((_, index) => index < 3) // show only first 3 courses
                        ?.map((recommendation, idx) => (
                            <CourseCard
                                index={idx}
                                key={String(idx) + recommendation.courseName}
                                item={recommendation}
                                setShowCompTile={setShowCompTile}
                                showCompTile={showCompTile}
                                count={count}
                                setCount={setCount}
                            />
                        ))}
                </div>
            )}
        </div>
    );
}
