"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef } from "react";
import ArrowRightGreen from "assets/svgs/PlayIcon.svg";
import AudioGraphIcon from "assets/svgs/audio-graph-icon.svg";
import { motion, useInView } from "framer-motion";
import { Button } from "../Button";
import { WizrLogo } from "../../assets/svgs";
import styles from "./Blog.module.scss";

export function Blog({ item = {}, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const textColor = useMemo(
        () =>
            ["text", "story"].includes(item.type)
                ? "var(--primary-light-1)"
                : "var(--primary-dark-1)",
        [item.type],
    );
    const renderButton = useCallback((blogType) => {
        switch (blogType) {
            case "text":
                return (
                    <div className={styles.ctaContainer}>
                        <Button
                            className={styles.cta}
                            style={{
                                width: "50%",
                            }}
                            onClick={() => {}}
                            variant="primary"
                        >
                            Read More
                        </Button>
                    </div>
                );
            case "audio":
                return (
                    <div className={styles.ctaContainer}>
                        <Button
                            style={{
                                width: "auto",
                            }}
                            className={styles.cta}
                            onClick={() => {}}
                            variant="primary"
                        >
                            Listen <Image src={ArrowRightGreen} alt="play" />
                        </Button>
                        <Image src={AudioGraphIcon} alt="audio" />
                    </div>
                );
            case "story":
                return (
                    <div className={styles.ctaContainer}>
                        <Button
                            style={{
                                width: "auto",
                            }}
                            className={styles.cta}
                            onClick={() => {}}
                            variant="primary"
                        >
                            Listen from more
                        </Button>
                    </div>
                );
            default:
                return <div />;
        }
    }, []);
    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                x: 50 + index * 40,
            }}
            animate={{
                opacity: index >= 3 || isInView ? 1 : 0,
                x: index >= 3 || isInView ? 0 : "unset",
                transition: {
                    type: "spring",
                    damping: 7,
                    mass: 0.5,
                    stiffness: 45,
                    delay: 0.1 + index * 0.07,
                },
            }}
            className={styles.blogCard}
        >
            {item.illustration && (
                <Image
                    className={styles.bgImage}
                    src={item.illustration}
                    alt={item.title}
                    fill
                />
            )}
            <div className={styles.heading}>
                <WizrLogo color={textColor} />
                <p
                    style={{
                        color: textColor,
                    }}
                >
                    {item.heading}
                </p>
            </div>
            <div className={styles.content}>
                <p
                    style={{
                        color: textColor,
                    }}
                >
                    {item.createdAt}
                </p>
                <p
                    style={{
                        color: textColor,
                    }}
                >
                    {item.title}
                </p>
                {renderButton(item.type)}
            </div>
        </motion.div>
    );
}
