"use client";

import { WizrLogo } from "assets/svgs";
import { Button } from "components/Button";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import IframePlayer from "components/IframePlayer";
import { createSlug } from "utils/helpers";
import { useRef, useState } from "react";
import { Blogs } from "./Blogs";
import { Podcasts } from "./Podcasts";
import { Stories } from "./Stories";
import styles from "./index.module.scss";

const DATA = [
    {
        title: `Learners`,
        description: `Listen to skilling certification holders share their transformative stories.`,
        buttonLabel: `Watch More`,
        buttonRedirectionLink: `/learners`,
        logoColor: "#BCBB9D",
        animatedComponent: Stories,
    },
    {
        title: `Voices`,
        description: `Listen to our podcast, where successful people share their highs and lows, pivotal choices, and path to victory.`,
        buttonLabel: `Listen More`,
        buttonRedirectionLink: `/voices`,
        logoColor: "#292F1E",
        animatedComponent: Podcasts,
    },
    {
        title: `Insights`,
        description: `Get access to valuable resources and insights to enhance your skills and fast-track your growth.`,
        buttonLabel: `Explore blogs`,
        buttonRedirectionLink: `/insights`,
        logoColor: "#292F1E",
        animatedComponent: Blogs,
    },
];

function Folder({ className, label, children, ...props }) {
    return (
        <motion.div
            {...props}
            className={`${styles.folder} ${
                styles[label.toLowerCase()]
            } ${className}`}
        >
            <div className={styles.tab}>
                <div className={styles.circle} />
                WiZR {label}
            </div>
            {children}
        </motion.div>
    );
}

function HeadingWithLogo({ title, logoColor }) {
    return (
        <div className={styles.heading}>
            <WizrLogo color={logoColor} />
            <h2>{title}</h2>
        </div>
    );
}

export default function GrowAnimation() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [video, setvideo] = useState(false);
    const [source, setSource] = useState("");
    const router = useRouter();

    return (
        <div className={styles.GrowAnimation} ref={ref}>
            {DATA.map(
                ({ animatedComponent: AnimatedComponent, ...item }, index) => (
                    <Folder
                        label={item.title}
                        key={item.title}
                        className={`grow-card-${index + 1}`}
                        animate={
                            index === 0
                                ? {
                                      y: isInView ? 0 : "100%",
                                      transition: {
                                          duration: 0.45,
                                      },
                                  }
                                : {}
                        }
                    >
                        {!!AnimatedComponent && (
                            <AnimatedComponent
                                setSource={setSource}
                                setvideo={setvideo}
                            />
                        )}
                        <div className={styles.infoWrapper}>
                            <div className={styles.header}>
                                <HeadingWithLogo
                                    title={item.title}
                                    logoColor={item.logoColor}
                                />
                                <Button
                                    className={styles.btn}
                                    variant="primary"
                                    widthStyle="long"
                                    onClick={() =>
                                        router.push(
                                            createSlug(
                                                item.buttonRedirectionLink,
                                            ),
                                        )
                                    }
                                >
                                    {item.buttonLabel}
                                </Button>
                            </div>
                            <p className={styles.description}>
                                {item.description}
                            </p>
                        </div>
                    </Folder>
                ),
            )}

            {video && (
                <div className={styles.iframe}>
                    <IframePlayer
                        ytsource={source && source}
                        setvideo={setvideo}
                        video={video}
                    />
                </div>
            )}
        </div>
    );
}
