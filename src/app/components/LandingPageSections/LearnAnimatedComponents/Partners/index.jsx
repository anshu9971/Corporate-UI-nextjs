// import CurvedArrow from "assets/svgs/curved_arrow.svg";
// import { BackgroundVideo } from "components/BackgroundVideo";
import { useSelector } from "react-redux";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
import { useEffect, useRef, useState } from "react";
// import { useGetPartnersLogoQuery } from "services/genericServices";
import { useGetMerchantLogosQuery } from "services/microsite/master";

// import { Button } from "../../../Button";
import styles from "./index.module.scss";

function easeOutQuint(x) {
    return 1 - (1 - x) ** 4.7;
}

const bounce = {
    duration: 1,
    ease: easeOutQuint,
};

function Logo({ logo, bgColor, index, totalCount, rowIndex, getContainerRef }) {
    const isInView = useInView(getContainerRef());
    const BASE_DELAY = 0.2;
    const ROW_DELAY = (4 - 1 - rowIndex) * 0.12;
    const PILL_DELAY = 0.12 + (index ?? 1) * 0.08;
    const delay = BASE_DELAY + ROW_DELAY + PILL_DELAY; //* Math.random();
    return (
        <motion.div
            initial={{
                x: index !== undefined ? `${totalCount - index}%` : null,
                y: "-1000%",
            }}
            animate={{
                y: isInView ? "0" : "-1000%",
                transition: isInView
                    ? {
                          ...bounce,
                          delay,
                      }
                    : {
                          duration: 0,
                      },
            }}
            className={styles.logo}
            style={{
                backgroundColor: bgColor,
            }}
        >
            <Image src={logo} width={130} height={130} alt="" />
        </motion.div>
    );
}

export function Partners() {
    // const { push } = useRouter();
    const auth = useSelector((state) => state.auth);

    const ref = useRef(null);
    // const isInView = useInView(ref);
    // const [isEntryAnimationCompleted, setIsEntryAnimationCompleted] =
    useState(false);
    const logoContainer = useRef(null);
    // const { data: partnersLogo = [] } = useGetPartnersLogoQuery();
    const { data: partnersLogo = [] } = useGetMerchantLogosQuery(undefined, {
        skip: !auth?.token,
    });
    const getContainerRef = () => logoContainer;
    const isInView = useInView(logoContainer);
    const autoScrollInterval = useRef(null);

    function ScrollDiv() {
        if (
            logoContainer.current?.scrollLeft <
            logoContainer.current?.scrollWidth
        ) {
            logoContainer.current.scrollLeft += 2;
        } else if (logoContainer.current?.scrollLeft)
            logoContainer.current.scrollLeft = 0;
    }

    useEffect(() => {
        if (isInView) {
            // If condition to set repeat
            setTimeout(() => {
                autoScrollInterval.current = setInterval(ScrollDiv, 100);
            }, 3000);
        }
    }, [isInView]);

    useEffect(
        () => () => {
            clearInterval(autoScrollInterval.current);
        },
        [],
    );

    return (
        <section className={styles.partnersContainer}>
            {/* <div className={styles.stepLabel}>
                <Image src={CurvedArrow} alt="arrow" />
                <p>In just 5 steps!</p>
            </div> */}
            {/* 
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
                 */}

            <div ref={ref} className={styles.animatedSection}>
                <div className={styles.logoWrapper} ref={logoContainer}>
                    {partnersLogo?.map((logos) => (
                        <div>
                            {logos.map((item, index, items) => (
                                <Logo
                                    {...item}
                                    key={item.id}
                                    index={index}
                                    totalCount={items.length}
                                    rowIndex={index}
                                    getContainerRef={getContainerRef}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
