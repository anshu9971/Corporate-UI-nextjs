import ArrowRight from "assets/images/ArrowRight.png";
import { CircularArrow } from "assets/svgs";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { createSlug, randomIntFromInterval, sideScroll } from "utils/helpers";
// import { useGetSubjectsQuery } from "services/onboarding";
import { useGetFunctionsQuery } from "services/microsite/master";
import { setSubjectRecommendation } from "redux/store/configSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "../../../Button";
import { SUBJECTS } from "../../../OnboardingQuestions/constants";
import styles from "./ChooseSubject.module.scss";
import splitArray from "./splitArr";

function easeOutQuint(x) {
    return 1 - (1 - x) ** 4.7;
}

const bounce = {
    duration: 0.9,
    ease: easeOutQuint,
};

export function ChooseSubject({ setIsLoading = () => {} }) {
    const auth = useSelector((state) => state.auth);
    const { push } = useRouter();
    const ref = useRef(null);
    const autoScrollInterval = useRef(null);
    const dispatch = useDispatch();
    const isInView = useInView(ref);

    // fetching functions Data START
    const { data } = useGetFunctionsQuery(undefined, { skip: !auth?.token });

    const functionsData = useMemo(
        () => data?.data?.data || [],
        [data?.data?.data],
    );
    // fetching functions Data END
    const [scrollFlags, setScrollFlags] = useState({
        atStartPosition: true,
        atEndPosition: false,
    });
    const [isEntryAnimationCompleted, setIsEntryAnimationCompleted] =
        useState(false);

    const [functions, setFunctions] = useState([]);

    // splitting the incoming functions array from API into rows
    useEffect(() => {
        setFunctions(splitArray(functionsData, 3));
    }, [functionsData]);

    function ScrollDiv() {
        if (ref.current?.scrollLeft < ref.current?.scrollWidth) {
            ref.current.scrollLeft += 1;
        } else if (ref.current?.scrollLeft) ref.current.scrollLeft = 0;
    }

    function updateScrollFlags(event) {
        const node = event?.target ?? ref.current;
        const atStartPosition = node.scrollLeft <= 0;
        const atEndPosition =
            node.scrollLeft + 0.2 >= node.scrollWidth - node.clientWidth;

        if (
            scrollFlags.atStartPosition !== atStartPosition ||
            scrollFlags.atEndPosition !== atEndPosition
        ) {
            setScrollFlags({
                atStartPosition,
                atEndPosition,
            });
        }
    }

    useEffect(() => {
        if (isInView) {
            // If condition to set repeat
            setTimeout(() => {
                autoScrollInterval.current = setInterval(ScrollDiv, 100);
            }, 1300);
        }
    }, [isInView]);

    useEffect(
        () => () => {
            clearInterval(autoScrollInterval.current);
        },
        [],
    );

    useEffect(() => {
        if (data?.data?.status === "success") {
            setIsLoading(false);
        }
    }, [data]);

    console.log("Functions", functions);

    const handleArrowClick = (direction) => {
        sideScroll(ref.current, 25, 100, 10 * direction);
    };

    return (
        <section className={styles.chooseSubjectContainer}>
            <div
                ref={ref}
                className={styles.subjectContainer}
                onScroll={updateScrollFlags}
            >
                {functions.map((row, outerIndex) => (
                    <div className={styles.subjectRow}>
                        {row.map((item, index) => {
                            const BASE_DELAY = 0;
                            const ROW_DELAY = 0;
                            const PILL_DELAY = 0.12 + index * 0.08;
                            const delay = BASE_DELAY + ROW_DELAY + PILL_DELAY;
                            return (
                                <button
                                    type="button"
                                    className={styles.domains}
                                >
                                    <motion.div
                                        className={styles.subjectPill}
                                        style={{
                                            backgroundColor:
                                                SUBJECTS[outerIndex][index]
                                                    .bgColor ?? "white",
                                            y: -300,
                                            transition: `0.3s all ${
                                                isEntryAnimationCompleted
                                                    ? "inherit"
                                                    : "ease-out"
                                            }`,
                                            cursor:
                                                item.slug && item.slug !== null
                                                    ? "pointer!important"
                                                    : "default",
                                        }}
                                        onClick={() => {
                                            if (
                                                item.slug &&
                                                item.slug !== null
                                            ) {
                                                dispatch(
                                                    setSubjectRecommendation({
                                                        id: item.function_id,
                                                        name: item.function_name,
                                                        thumbnailLink:
                                                            item.thumbnail_link,
                                                        videoLink:
                                                            item.video_link?.[0]
                                                                ?.video_720p ||
                                                            item.video_link?.[0]
                                                                ?.video_1080p,
                                                    }),
                                                );
                                                push(
                                                    createSlug(`${item.slug}`),
                                                );
                                            }
                                        }}
                                        initial={{
                                            rotate: randomIntFromInterval(
                                                -15,
                                                10,
                                            ),
                                        }}
                                        animate={{
                                            y: isInView ? 0 : -300,
                                            transition: isInView
                                                ? {
                                                      ...bounce,
                                                      delay,
                                                  }
                                                : {
                                                      duration: 0,
                                                  },
                                        }}
                                        onAnimationStart={() => {
                                            setIsEntryAnimationCompleted(false);
                                        }}
                                        onAnimationComplete={(def) => {
                                            if (def.y === 0) {
                                                setIsEntryAnimationCompleted(
                                                    true,
                                                );
                                            }
                                        }}
                                        key={`${item?.function_id} + ${item?.function_name}`}
                                    >
                                        <p
                                            style={{
                                                color: SUBJECTS[outerIndex][
                                                    index
                                                ]?.fontColor,
                                            }}
                                        >
                                            {item.function_name}
                                        </p>
                                        <CircularArrow
                                            bgColor={
                                                SUBJECTS[outerIndex][index]
                                                    ?.fontColor
                                            }
                                            arrowColor={
                                                SUBJECTS[outerIndex][index]
                                                    ?.bgColor
                                            }
                                        />
                                    </motion.div>
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className={styles.content}>
                <div className={styles.titleSec}>
                    <div>
                        <h2>
                            Choose a function <br /> of choice
                        </h2>
                        <div className={styles.arrowș}>
                            <Image
                                src={ArrowRight}
                                onClick={() => handleArrowClick(-1)}
                                alt="arrow-left"
                                style={{
                                    pointerEvents: scrollFlags.atStartPosition
                                        ? "none"
                                        : "all",
                                    opacity: scrollFlags.atStartPosition
                                        ? 0.5
                                        : 1,
                                }}
                            />
                            <Image
                                src={ArrowRight}
                                onClick={() => handleArrowClick(1)}
                                alt="arrow-right"
                                style={{
                                    pointerEvents: scrollFlags.atEndPosition
                                        ? "none"
                                        : "all",
                                    opacity: scrollFlags.atEndPosition
                                        ? 0.5
                                        : 1,
                                }}
                            />
                        </div>
                    </div>
                    {/* <p>Select a subject to compare and enrol in courses.</p> */}
                </div>
                <Button
                    variant="primary"
                    widthStyle="long"
                    className={styles.button}
                >
                    View All
                </Button>
            </div>
            {/* <div>
                <h2>Choose a subject of your choice</h2>
                <p>
                    Based on your profile get unbiased course recommendations.
                </p>
            </div>
            <div>
                <Button
                    onClick={() => push("/learn")}
                    style={{
                        width: "fit-content",
                        padding: "0 30px",
                    }}
                    variant="primary"
                >
                    View All
                </Button>
                <p>In just 5 steps!</p>
            </div> */}
        </section>
    );
}
