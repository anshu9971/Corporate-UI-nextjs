import { BackgroundVideo } from "components/BackgroundVideo";
import { Button } from "components/Button";
import { createSlug } from "utils/helpers";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./index.module.scss";

const CARD_DATA = [
    {
        tag: "Career",
        tagText: "Mental Make-up Assessment",
        heading: "Discover your Mental Make-up",
        description:
            "Discover your strengths by playing a bunch of engaging games.",
        buttonLabel: "Play Now",
        route: "/discover/career-discovery",
        tagline: "Exciting games inside!",
        initialStyles: {
            rotate: "-13deg",
        },
        styles: {
            rotate: "3deg",
            mobileRotate: "3deg",
        },
        videoName: "boyblock",
    },
    {
        tag: "Expertise",
        tagText: "Skill Level Assessment",
        heading: "Unlock your skill fitment",
        description:
            "Answer a few questions and know your skill level fitment.",
        buttonLabel: "Take the Quiz",
        route: "/discover/expertise-discovery",
        tagline: "Assess over 200 skills!",
        initialStyles: {
            rotate: "0deg",
        },
        styles: {
            rotate: "-7deg",
            mobileRotate: "-2deg",
        },
        videoName: "discoverball",
    },
];

export function DiscoverAnimation() {
    const [hoverClass, setHoverClass] = useState("");
    const ref = useRef(null);
    const isInView = useInView(ref);
    const { push } = useRouter();
    const [isEntryAnimationCompleted, setIsEntryAnimationCompleted] =
        useState(false);

    let isMobile = false;
    if (typeof window !== "undefined") {
        isMobile = window.innerWidth < 1280;
    }

    const getInViewStyles = (data) => {
        if (isMobile) {
            return data.styles.mobileRotate;
        }
        return data.styles.rotate;
    };

    return (
        <motion.div
            ref={ref}
            className={styles.discoverAnimation}
            animate={{
                y: isInView ? 0 : "50%",
                transition: {
                    duration: 0.45,
                },
            }}
        >
            <div className={styles.mobileBg} />
            {CARD_DATA.map((data) => (
                <motion.div
                    key={data.tag}
                    className={`${styles[data.tag.toLowerCase()]} ${
                        styles.static
                    }`}
                    data-hover-class={hoverClass}
                    initial={{
                        y: "600px",
                    }}
                    animate={{
                        y: isInView ? 0 : "600px",
                        rotate: isInView
                            ? getInViewStyles(data)
                            : data.initialStyles.rotate,
                        transition: {
                            duration: 0.45,
                        },
                    }}
                    style={{
                        transform: "translateY(0vh) rotate(0deg)",
                        transition: `0.3s all ${
                            isEntryAnimationCompleted
                                ? "ease-in-out"
                                : "ease-out"
                        }`,
                    }}
                    onMouseOver={() => setHoverClass(data.tag.toLowerCase())}
                    onFocus={() => setHoverClass(data.tag.toLowerCase())}
                    onMouseOut={() => setHoverClass(null)}
                    onBlur={() => setHoverClass(null)}
                >
                    <motion.div
                        key={data.tag}
                        className={`${styles[data.tag.toLowerCase()]} ${
                            styles.card
                        }`}
                        initial={{
                            y: "600px",
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
                            y: isInView ? 0 : "600px",
                            rotate: isInView
                                ? getInViewStyles(data)
                                : data.initialStyles.rotate,
                            transition: {
                                duration: 0.45,
                            },
                        }}
                        style={{
                            transform: "translateY(0vh) rotate(0deg)",
                            transition: `0.3s all ${
                                isEntryAnimationCompleted
                                    ? "ease-in-out"
                                    : "ease-out"
                            }`,
                        }}
                        // data-hover-class={hoverClass}
                    >
                        <div>
                            <h4 className={styles.tag}>{data.tagText}</h4>
                            <h2 className={styles.heading}>{data.heading}</h2>
                            <p className={styles.description}>
                                {data.description}
                            </p>
                        </div>
                        <div>
                            <Button
                                variant="primary"
                                widthStyle="long"
                                className={styles.button}
                                onClick={() => push(createSlug(data.route))}
                            >
                                {data.buttonLabel}
                            </Button>
                            <p className={styles.tagline}>{data.tagline}</p>
                        </div>
                        <BackgroundVideo
                            className={styles.bgVideo}
                            videoName={data.videoName}
                        />
                    </motion.div>
                </motion.div>
            ))}
        </motion.div>
    );
}
