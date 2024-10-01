import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Loader } from "components/Loader";
import { ChooseSubject } from "./ChooseSubject";
import { ExploreCourses } from "./ExploreCourses";
import { Partners } from "./Partners";

// import { FindCourse } from "./FindCourse";
import styles from "./index.module.scss";

export function LearnAnimation() {
    const ref = useRef(null);
    const isInView = useInView(ref);
    const [loading, setIsLoading] = useState(true);

    return (
        <div
            className={`learn-animation-wrapper ${styles.learnAnimation}`}
            onScroll={(e) => e.stopPropagation}
            ref={ref}
        >
            {loading && <Loader isLoading={loading} />}
            <motion.div
                className={styles.crossBg}
                animate={{
                    y: isInView ? 0 : "50%",
                    transition: {
                        duration: 0.45,
                    },
                }}
            >
                {/* <Image src={CrossBG} alt="cross" />
                <Image src={CrossBG} alt="cross" /> */}
            </motion.div>
            {/* <FindCourse /> */}
            <ChooseSubject setIsLoading={setIsLoading} />
            <Partners />
            <ExploreCourses />
        </div>
    );
}
