import { Button } from "components/Button";
import { Text } from "components/Text";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import NSDC from "assets/svgs/NSDC.svg";
import Image from "next/image";
import { createSlug } from "utils/helpers";
import styles from "./page.module.scss";

const nsdcParnerShipButton = (
    <button
        type="button"
        // onClick={() => push("/nsdc")}
        className={styles.nsdcParnerShipButton}
    >
        <h4>
            In partnership <br />
            with
        </h4>
        <div className={styles.partnerLogo}>
            <Image src={NSDC} alt="NSDC" />
        </div>
    </button>
);
export default function SnapScrollSection({
    sectionIndex,
    title,
    subTitle,
    description,
    route,
    animatedComponent: AnimatedComponent,
    showNsdcPartnerShipButton = false,
    secondSnapDescription = null,
    isFinanceCard,
}) {
    const { push } = useRouter();
    const serialNumber = sectionIndex + 1;
    const ref = useRef(null);
    const isInView = useInView(ref);
    return (
        <div
            className={`snap-section-${serialNumber} ${
                styles.snapScrollSection
            } ${styles[title.toLowerCase()]}`}
        >
            <div ref={ref} className={styles.sectionCard}>
                <div className={styles.contentWrapper}>
                    <motion.span
                        initial={{
                            y: "50vh",
                        }}
                        animate={{
                            y: isInView ? 0 : "50vh",
                            transition: {
                                duration: 0.6,
                                ease: "easeOut",
                            },
                        }}
                        className={styles.number}
                    >
                        {serialNumber < 10 ? `0${serialNumber}` : serialNumber}
                    </motion.span>
                    <div>
                        <motion.h2
                            initial={{
                                y: "50vh",
                            }}
                            animate={{
                                y: isInView ? 0 : "50vh",
                                transition: {
                                    duration: 0.6,
                                    ease: "easeOut",
                                },
                            }}
                            className={styles.title}
                        >
                            {title}
                        </motion.h2>
                        <motion.h3
                            initial={{
                                y: "50vh",
                            }}
                            animate={{
                                y: isInView ? 0 : "50vh",
                                transition: {
                                    duration: 0.6,
                                    ease: "easeOut",
                                },
                            }}
                            className={styles.subTitle}
                        >
                            {subTitle}
                        </motion.h3>
                        <motion.div
                            initial={{
                                y: "50vh",
                            }}
                            animate={{
                                y: isInView ? 0 : "50vh",
                                transition: {
                                    duration: 0.75,
                                    ease: "easeOut",
                                },
                            }}
                        >
                            {isFinanceCard ? (
                                <p className={styles.description}>
                                    Break free from financial limitations!
                                    Unlock your success with
                                    {
                                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                                        <span
                                            // onClick={() => push("/faqs")}
                                            className={styles.hyperLink}
                                        >
                                            {" "}
                                            No-cost EMI
                                        </span>
                                    }{" "}
                                    to pay your course fees.
                                </p>
                            ) : (
                                <Text
                                    className={styles.description}
                                    text={description}
                                />
                            )}

                            {secondSnapDescription && (
                                <Text
                                    className={`${styles.description} ${styles.secondSnapDescription}`}
                                    text={secondSnapDescription}
                                />
                            )}
                        </motion.div>
                        {route && (
                            <Button
                                style={{ marginTop: 40 }}
                                variant="primary"
                                onClick={() => push(createSlug(route))}
                            >
                                Explore
                            </Button>
                        )}
                    </div>
                </div>
                <div>{!!AnimatedComponent && <AnimatedComponent />}</div>
                {showNsdcPartnerShipButton && nsdcParnerShipButton}
            </div>
        </div>
    );
}
