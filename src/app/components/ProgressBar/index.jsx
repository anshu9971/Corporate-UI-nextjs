import Image from "next/image";
import ProgressBarContainer from "assets/svgs/progress_bar.svg";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./ProgressBar.module.scss";

export function ProgressBar({ progressTo = 0 }) {
    const controls = useAnimationControls();
    const [currentProgress, setCurrentProgress] = useState(progressTo);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentProgress < progressTo) {
                // increase progress
                setCurrentProgress((prevProgress) => prevProgress + 1);
            } else if (currentProgress > progressTo) {
                // decrease progress
                setCurrentProgress((prevProgress) => prevProgress - 1);
            } else {
                clearInterval(interval);
            }
        }, 15); // Update every second (adjust as needed)

        return () => {
            clearInterval(interval); // Clean up the interval on unmount
        };
    }, [currentProgress, progressTo]);

    useEffect(() => {
        controls.start({
            width: `${progressTo}%`,
            transition: { type: "spring" },
        });
    }, [progressTo, controls]);

    if (progressTo <= 0) return null;
    return (
        <div className={styles.progressBarContainer}>
            <motion.div
                initial={{
                    width: 0,
                }}
                animate={controls}
                className={styles.progressBar}
            >
                <div
                    className={`${styles.progress} ${
                        progressTo >= 100 ? styles.progressFlip : ""
                    }`}
                >
                    {progressTo > 0 && (
                        <>
                            <span>{currentProgress}%</span>
                            <Image src={ProgressBarContainer} alt="progress" />
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
