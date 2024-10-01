"use client";

import Close from "assets/svgs/cancel_icon.svg";
import Book from "assets/svgs/BookOpenText.svg";
import ArrowUp from "assets/svgs/arrow_up.svg";
import ArrowDown from "assets/svgs/arrow_down_bold.svg";
import SealCheck from "assets/svgs/seal_check.svg";
import Simpli from "assets/images/SimplilearnLogo.png";
import SkillUp from "assets/svgs/skillup.svg";
import Upgrad from "assets/images/upgradLogo.png";
import { Button } from "components/Button";
import { useEffect, useState } from "react";
import Rating from "components/Rating";
import Image from "next/image";
import styles from "./ComparisonTile.module.scss";

const COMPARISON_ATTRIBUTES = [
    {
        spec: "Provider Logo",
    },
    {
        spec: "Institute Logo",
    },
    {
        spec: "No-cost EMI",
    },
    {
        spec: "Fees",
    },
    {
        spec: "Delivery Mode",
    },
    {
        spec: "Ratings",
    },
    {
        spec: "Pre Requisite",
    },
    {
        spec: "Level",
    },
    {
        spec: "Certification",
    },
    {
        spec: "What will you learn",
    },
    {
        spec: "Instructors",
    },
    {
        spec: "Syllabus",
    },
    {
        spec: "Learning Mode",
    },
    {
        spec: "Scholarship",
    },
    {
        spec: "Placement Assistance",
    },
];

const SEAL_CHECKED_PROPS = [
    "No-cost EMI",
    "Placement Assistance",
    "Scholarship",
    "Certification",
    "Level",
    "Delivery Mode",
];
const courses = [
    {
        providerlogo: "/assets/images/SimplilearnLogo.png",
        institutelogo: "/assets/images/SimplilearnLogo.png",

        zerocostemi: "Available",
        fees: "₹ 153,400",
        deliverymode: "Online",
        ratings: 4,
        prerequisite: "2-3 GPA (40-60%)",
        level: "Beginner",
        certification: "Certificate",
        whatwillyoulearn: "Deep Learning,Reinforcement Learning",
        instructors: `Professor Amey Karkare,Department of Computer Science and Engineering, IIT Kanpur
    `,
        syllabus: `Induction Session for Professional Certificate Course in AI and Machine Learning
    IITK AIML- Introduction to Artificial Intelligence
    IITK AIML - Applied Data Science with Python
    IITK AIML - Machine Learning
    IITK AIML - Deep Learning with Keras and TensorFlow
    IITK AIML- Advanced Deep Learning and Computer Vision
    Electives:
    IITK AIML - Programming Refresher
    IITK AIML- Statistics Essentials For Data Science
    IITK AIML - NLP and Speech Recognition
    IITK AIML- Reinforcement Learning
    AI and Machine learning - Academic Masterclass by IIT Kanpur
    IITK AIML - Use cases of ChatGPT
    `,
        learningmode: "Self Paced",
        scholarship: "No",
        placementassistance: "No",
    },
    {
        providerlogo: "assets/images/SimplilearnLogo.png",
        institutelogo: "assets/images/SimplilearnLogo.png",
        zerocostemi: "Available",
        fees: "₹ 14,899",
        deliverymode: "Online",
        ratings: 4,
        prerequisite: "NA",
        level: "Beginner",
        certification: "Certificate",
        whatwillyoulearn:
            "Introduction to Machine Learning,Regression Analysis,Clustering Algorithms",
        instructors: `NA`,
        syllabus: `About This Course
        Module 1: Introduction to Machine Learning
        Module 2: Regression
        Module 3: Classification
        Module 4: Clustering
        Module 5: Recommender Systems
        Module 6: Final Project
        Certificate`,
        learningmode: "Self Paced",
        scholarship: "No",
        placementassistance: "No",
    },
    {
        providerlogo: "assets/images/SimplilearnLogo.png",
        institutelogo:
            "https://upload.wikimedia.org/wikipedia/en/1/1e/Golden_Gate_University_Seal.jpg",
        zerocostemi: "Available",
        fees: "₹ 700,000",
        deliverymode: "Hybrid",
        ratings: 4,
        prerequisite: `B.Tech
        3-4 GPA (60-80%)`,
        level: "Advanced",
        certification: "Masters Degree",
        whatwillyoulearn: "Deep Learning",
        instructors: `Dr Dakshinamurthy V Kolluru,Dean – GGU-INSOFE Institute of technology
        Dr Venkatesh Sunkad,Vice Dean – GGU-INSOFE Institute of technology
        Dr Shonraj Ballae Ganeshrao
        Dr Thejus R Kartha,Associate Professor,GGU-INSOFE Institute of technology
        Dr Uma Ranjan
        `,
        syllabus: `Statistics and Programming Foundations for Data Science
        Statistics and Probability in Decision Modeling
        Data Visualizations and Machine Learning
        AI and Deep Learning Applications for NLP
        Databases, Data Warehousing and Advanced Python
        Data Structures and Algorithms
        Computer Vision Fundamental and Deep Learning Applications
        Capstone Project
        Applying ML to Big Data Using Hadoop and Spark Ecosystem
        Capstone Project
        DevOps and MLOps
        Capstone Project
        Data Engineering Services on Cloud
        Capstone Project`,
        learningmode: "Instructor - Live",
        scholarship: "No",
        placementassistance: "No",
    },
];

export default function ComparisonTile({
    showCompTile = false,
    setShowCompTile = () => {},
    count = 0,
    setCount = () => {},
}) {
    const [showComparison, setShowComparison] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setCount(0);
    }, [setCount]);

    useEffect(() => {
        if (showCompTile) {
            setShow(true);
            return;
        }
        setCount(0);
        setShow(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showCompTile]);
    if (show)
        return (
            <div
                className={
                    showComparison
                        ? styles.comparisonTileContainer
                        : `${styles.comparisonTileContainer} ${styles.hideComparisonContainer}`
                }
            >
                <div
                    className={
                        showComparison
                            ? `${styles.blurComp}`
                            : `${styles.hideComparison}`
                    }
                />

                <div
                    className={
                        showComparison
                            ? styles.hideComparison
                            : styles.cardsHead
                    }
                >
                    {count > 0 ? (
                        <div className={styles.tile}>
                            <div className={styles.courseParent}>
                                <p>1</p>
                                <div className={styles.course}>
                                    {" "}
                                    Professional Certificate Course in AI and
                                    Machine Learning
                                </div>
                                <button type="button">
                                    <Image
                                        src={Close}
                                        alt="close_icon"
                                        // className={styles.providerLogo}
                                    />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.tile}>
                            <div className={styles.emptyParent}>
                                <Image
                                    src={Book}
                                    alt="book_icon"
                                    // className={styles.providerLogo}
                                />

                                <div className={styles.emptyText}>
                                    Add a course from the listing
                                </div>
                            </div>
                        </div>
                    )}
                    {count > 1 ? (
                        <div className={styles.tile}>
                            <div className={styles.courseParent}>
                                <p>2</p>
                                <div className={styles.course}>
                                    {" "}
                                    Machine Learning with Python: A Practical
                                    Introduction
                                </div>
                                <button type="button">
                                    <Image
                                        src={Close}
                                        alt="close_icon"
                                        // className={styles.providerLogo}
                                    />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.tile}>
                            <div className={styles.emptyParent}>
                                <Image
                                    src={Book}
                                    alt="book_icon"
                                    // className={styles.providerLogo}
                                />

                                <div className={styles.emptyText}>
                                    Add a course from the listing
                                </div>
                            </div>
                        </div>
                    )}
                    {count > 2 ? (
                        <div className={styles.tile}>
                            <div className={styles.courseParent}>
                                <p>3</p>
                                <div className={styles.course}>
                                    {" "}
                                    MS in Full Stack AI and ML
                                </div>
                                <button type="button">
                                    <Image
                                        src={Close}
                                        alt="close_icon"
                                        // className={styles.providerLogo}
                                    />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.tile}>
                            <div className={styles.emptyParent}>
                                <Image
                                    src={Book}
                                    alt="book_icon"
                                    // className={styles.providerLogo}
                                />

                                <div className={styles.emptyText}>
                                    Add a course from the listing
                                </div>
                            </div>
                        </div>
                    )}
                    <div className={styles.compareBtn}>
                        <Button
                            variant="primary"
                            widthStyle="long"
                            style={{ backgroundColor: "#50495A" }}
                            onClick={() => setShowComparison(true)}
                        >
                            Compare
                            <Image src={ArrowUp} alt="compare_btn_icon" />
                        </Button>
                    </div>
                    <button
                        type="button"
                        className={styles.crossBtn}
                        onClick={() => setShowCompTile(false)}
                    >
                        <Image
                            src={Close}
                            alt="close_comparison_icon"
                            width={35}
                            height={35}
                        />
                    </button>
                </div>
                <div
                    className={
                        showComparison
                            ? styles.detailedComparisonHead
                            : `${styles.detailedComparisonHead} ${styles.hideComparison}`
                    }
                >
                    <div className={styles.tile}>
                        <div className={styles.courseParent}>
                            <p>1</p>
                            <div className={styles.course}>
                                {" "}
                                Professional Certificate Course in AI and
                                Machine Learning
                            </div>
                            <button type="button">
                                <Image
                                    src={Close}
                                    alt="close_icon"
                                    // className={styles.providerLogo}
                                />
                            </button>
                        </div>
                        <Button
                            variant="primary"
                            widthStyle="long"
                            style={{
                                backgroundColor: "#50495A",
                                padding: "7px 18px",
                                color: "#F5F4F6",
                            }}
                            className={styles.enrollBtn}
                            // onClick={onClickViewDetails}
                        >
                            Enroll now
                        </Button>
                    </div>
                    <div className={styles.tile}>
                        <div className={styles.courseParent}>
                            <p>2</p>
                            <div className={styles.course}>
                                {" "}
                                Machine Learning with Python: A Practical
                                Introduction
                            </div>
                            <button type="button">
                                <Image
                                    src={Close}
                                    alt="close_icon"
                                    // className={styles.providerLogo}
                                />
                            </button>
                        </div>
                        <Button
                            variant="primary"
                            widthStyle="long"
                            style={{
                                backgroundColor: "#50495A",
                                padding: "7px 18px",
                                color: "#F5F4F6",
                            }}
                            className={styles.enrollBtn}
                            // onClick={onClickViewDetails}
                        >
                            Enroll now
                        </Button>
                    </div>
                    <div className={styles.tile}>
                        <div className={styles.courseParent}>
                            <p>3</p>
                            <div className={styles.course}>
                                {" "}
                                MS in Full Stack AI and ML
                            </div>
                            <button type="button">
                                <Image
                                    src={Close}
                                    alt="close_icon"
                                    // className={styles.providerLogo}
                                />
                            </button>
                        </div>
                        <Button
                            variant="primary"
                            widthStyle="long"
                            style={{
                                backgroundColor: "#50495A",
                                padding: "7px 18px",
                                color: "#F5F4F6",
                            }}
                            className={styles.enrollBtn}
                            // onClick={onClickViewDetails}
                        >
                            Enroll now
                        </Button>
                    </div>
                    <button
                        type="button"
                        className={styles.dismissBtn}
                        onClick={() => setShowComparison(false)}
                    >
                        Dismiss{" "}
                        <Image
                            src={ArrowDown}
                            alt="dismiss_comparison_icon"
                            width={20}
                            height={20}
                        />
                    </button>
                </div>
                <div
                    className={
                        showComparison
                            ? styles.comparisons
                            : `${styles.comparison} ${styles.hideComparison}`
                    }
                >
                    {COMPARISON_ATTRIBUTES.map((item) => {
                        const k = item.spec
                            .trim()
                            .replace(/\s/g, "")
                            .toLowerCase();

                        return (
                            <div className={styles.comparisonRow}>
                                <div className={styles.specName}>
                                    {item.spec}
                                </div>
                                <div className={styles.specValue}>
                                    {item.spec === "Ratings" && (
                                        <Rating rating={courses[0][k]} />
                                    )}
                                    {SEAL_CHECKED_PROPS.includes(item.spec) && (
                                        <Image
                                            src={SealCheck}
                                            alt="seal_checked"
                                            className={styles.check}
                                        />
                                    )}

                                    {typeof courses[0][k] === "string" &&
                                    courses[0][k].includes(".png") ? (
                                        <Image
                                            src={Simpli}
                                            width={123}
                                            height={17}
                                            alt={courses[0][k]}
                                            className={styles.logo}
                                        />
                                    ) : (
                                        item.spec !== "Ratings" && courses[0][k]
                                    )}
                                </div>
                                <div className={styles.specValue}>
                                    {item.spec === "Ratings" && (
                                        <Rating rating={courses[1][k]} />
                                    )}
                                    {SEAL_CHECKED_PROPS.includes(item.spec) && (
                                        <Image
                                            src={SealCheck}
                                            alt="seal_checked"
                                            className={styles.check}
                                        />
                                    )}
                                    {typeof courses[1][k] === "string" &&
                                    courses[1][k].includes(".png") ? (
                                        <Image
                                            src={SkillUp}
                                            width={123}
                                            height={17}
                                            alt={courses[1][k]}
                                            className={styles.logoUp}
                                        />
                                    ) : (
                                        item.spec !== "Ratings" && courses[1][k]
                                    )}
                                </div>
                                <div className={styles.specValue}>
                                    {item.spec === "Ratings" && (
                                        <Rating rating={courses[2][k]} />
                                    )}
                                    {SEAL_CHECKED_PROPS.includes(item.spec) && (
                                        <Image
                                            src={SealCheck}
                                            alt="seal_checked"
                                            className={styles.check}
                                        />
                                    )}
                                    {typeof courses[2][k] === "string" &&
                                    (courses[2][k].includes(".png") ||
                                        courses[2][k].includes(".jpg")) ? (
                                        <Image
                                            src={Upgrad}
                                            width={123}
                                            height={17}
                                            alt={courses[2][k]}
                                            className={styles.logoUp}
                                        />
                                    ) : (
                                        item.spec !== "Ratings" && courses[2][k]
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
}
