import Pointer from "assets/svgs/grayPointerUP.svg";
import Image from "next/image";
import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import styles from "./ScoreBar.module.scss";

export default function ScoreBar({
    score,
    baseColor = "#f2f2fB",
    color,
    scaleColor = "white",
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const scoreValue = Number.isNaN(Number(score)) ? 0 : Number(score);

    let fillPercentage = (scoreValue / 10) * 100.0;
    if (fillPercentage === 0) {
        fillPercentage = 1;
    }
    return (
        <div
            style={{ backgroundColor: baseColor }}
            className={styles.scoreBar}
            ref={ref}
        >
            <motion.div
                className={`${styles.filled} ${
                    scoreValue === 10 ? styles.full : ""
                }`}
                style={{
                    backgroundColor: color,
                    width: `${fillPercentage}%`,
                }}
                initial={{ width: 0 }}
                animate={{
                    width: isInView ? `${fillPercentage}%` : "0",
                }}
            >
                <Image src={Pointer} className={styles.pointer} />
            </motion.div>
            {new Array(11).fill(0).map((x, index) => (
                <div
                    style={{ backgroundColor: scaleColor }}
                    className={`${styles.scale} ${
                        index === 0 || index === 10 ? styles.edge : ""
                    }`}
                />
            ))}
        </div>
    );
}
