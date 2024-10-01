import ArrowRight from "assets/images/ArrowRight.png";
import CourseArrow from "assets/images/course-arrow.png";
import { RightArrow } from "assets/svgs";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
    // useEffect,
    useRef,
    useState,
} from "react";
import {
    createSlug,
    fixIncorrectExplorationFilters,
    sideScroll,
} from "utils/helpers";
import { useRouter } from "next/navigation";
import { useGetCoursesCollectionsQuery } from "services/courseRecommendation";
import { useDispatch, useSelector } from "react-redux";
import { setCollectionExplorationFilters } from "redux/store/configSlice";
// import { isEmpty } from "lodash";
import { Button } from "../../../Button";
import styles from "./ExploreCourses.module.scss";

export function ExploreCourses() {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const isInView = useInView(ref);
    const { push } = useRouter();
    const isMobile = window.innerWidth < 1280;
    const [scrollFlags, setScrollFlags] = useState({
        atStartPosition: true,
        atEndPosition: false,
    });
    const auth = useSelector((state) => state?.auth);
    const { data: COURSES } = useGetCoursesCollectionsQuery(undefined, {
        skip: !auth?.token,
    });
    function updateScrollFlags(event) {
        const node = event?.target ?? ref.current;
        const atStartPosition = node.scrollLeft <= 0;
        const atEndPosition =
            node.scrollLeft + 1 >= node.scrollWidth - node.clientWidth;

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

    const handleArrowClick = (direction) => {
        sideScroll(ref.current, 25, 270, 10 * direction);
    };
    const explore = (item) => {
        dispatch(
            setCollectionExplorationFilters({
                filters: fixIncorrectExplorationFilters(item.filterCriteria),
                collectionName: item?.title,
            }),
        );
        push(createSlug(item.slug));
    };

    // useEffect(() => {
    //     if (COURSES?.length > 0) {
    //         const listItems = COURSES?.map((course, index) => ({
    //             "@type": "ListItem",
    //             position: index + 1,
    //             item: {
    //                 "@type": "Course",
    //                 url: `https://www.wizr.in/${course?.slug}`,
    //                 name: course?.title, // Name of the collection //
    //                 description: course?.desc, // Collection Description //
    //             },
    //         }));
    //         const siteNavigationSchemaScript = document.getElementById(
    //             "site-navigation-ld-json",
    //         );
    //         let updatedJson = null;
    //         try {
    //             const existingJson = JSON.parse(
    //                 siteNavigationSchemaScript.innerText,
    //             );
    //             if (!isEmpty(existingJson)) {
    //                 updatedJson = {
    //                     ...existingJson,
    //                     additionalItemList: listItems,
    //                 };
    //                 siteNavigationSchemaScript.innerText =
    //                     JSON.stringify(updatedJson);
    //             }
    //             // eslint-disable-next-line no-console
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }
    //     return () =>
    //         document?.getElementById("courses-collection-ld-json")?.remove();
    // }, [COURSES]);
    return (
        <section className={styles.exploreCourseContainer}>
            <div
                ref={ref}
                className={styles.coursesContainer}
                onScroll={updateScrollFlags}
            >
                {COURSES?.map((item) => (
                    <motion.div
                        initial={{
                            x: "100vw",
                        }}
                        animate={{
                            x: isInView ? 0 : "100vw",
                            rotate: isInView ? 0 : "-7deg",
                            transition: {
                                duration: 1.3,
                            },
                        }}
                        style={{
                            transform: "translateX(0vw) rotate(0deg)",
                        }}
                        key={item.id}
                        className={styles.staticCard}
                        onClick={() => explore(item)}
                    >
                        <div className={styles.courseCard}>
                            {/* <div className={styles.courseCountTag}>
                            {item.numOfCourses} courses
                        </div> */}
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                            <Image
                                className={styles.arrow}
                                src={CourseArrow}
                                alt="arrow"
                                onClick={() => explore(item)}
                            />
                            <Button
                                className={styles.exploreBtn}
                                variant="primary"
                                onClick={() => explore(item)}
                            >
                                Explore <RightArrow className={styles.svg} />
                            </Button>
                            <Image
                                className={styles.bgImage}
                                src={item.bgImage}
                                alt="bg"
                                fill
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className={styles.content}>
                <div className={styles.titleSec}>
                    <div>
                        <h2>Explore our course collections</h2>
                        {(COURSES?.legth > 2 ||
                            (isMobile && COURSES?.length > 1)) && (
                            <div>
                                <Image
                                    src={ArrowRight}
                                    alt="arrow-left"
                                    onClick={() => handleArrowClick(-1)}
                                    style={{
                                        pointerEvents:
                                            scrollFlags.atStartPosition
                                                ? "none"
                                                : "all",
                                        opacity: scrollFlags.atStartPosition
                                            ? 0.5
                                            : 1,
                                    }}
                                />
                                <Image
                                    src={ArrowRight}
                                    alt="arrow-right"
                                    onClick={() => handleArrowClick(1)}
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
                        )}
                    </div>
                    <p>
                        To find a course with ease, choose from our curated
                        collection.
                    </p>
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
