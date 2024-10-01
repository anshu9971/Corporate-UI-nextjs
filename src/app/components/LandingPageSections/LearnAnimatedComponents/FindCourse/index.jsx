import CurvedArrow from "assets/svgs/curved_arrow.svg";
import { BackgroundVideo } from "components/BackgroundVideo";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "../../../Button";
import styles from "./index.module.scss";

export function FindCourse() {
    const { push } = useRouter();
    const ref = useRef(null);
    const isInView = useInView(ref);
    const [isEntryAnimationCompleted, setIsEntryAnimationCompleted] =
        useState(false);
    return (
        <section ref={ref} className={styles.findCourseContainer}>
            <div className={styles.stepLabel}>
                <Image src={CurvedArrow} alt="arrow" />
                <p>In just 5 steps!</p>
            </div>
            <motion.div
                className={styles.staticCard}
                initial={{
                    y: "600px",
                    rotate: "-15deg",
                }}
                onAnimationStart={() => {
                    setIsEntryAnimationCompleted(false);
                }}
                onAnimationComplete={(def) => {
                    if (def.y === 0) {
                        setIsEntryAnimationCompleted(true);
                    }
                }}
                animate={{
                    y: isInView ? 10 : "600px",
                    rotate: isInView ? "-5deg" : "-15deg",
                    transition: {
                        duration: 0.45,
                    },
                }}
                style={{
                    // transform: "translateY(0vh) rotate(-3deg)",
                    transition: `0.3s all ${
                        isEntryAnimationCompleted ? "ease-in-out" : "ease-out"
                    }`,
                }}
            >
                <div className={styles.card}>
                    <div>
                        <h2>Find the perfect course</h2>
                        <p>
                            Based on your profile get unbiased course
                            recommendations.
                        </p>
                    </div>
                    <div>
                        <Button
                            onClick={() => push("/start-skilling")}
                            style={{
                                width: "fit-content",
                                padding: "0 30px",
                            }}
                            variant="primary"
                            widthStyle="long"
                            className={styles.exploreBtn}
                        >
                            Explore
                        </Button>
                        <p>In just 5 steps!</p>
                    </div>
                    <BackgroundVideo
                        className={styles.bgVideo}
                        videoName="strawgirl"
                    />
                </div>
            </motion.div>
        </section>
    );
}
