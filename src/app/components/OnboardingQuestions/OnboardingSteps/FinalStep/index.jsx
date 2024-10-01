import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AnimatedLogo from "assets/gifs/wizrLogoCharcoalTransparent.gif";
import styles from "./FinalStep.module.scss";

export function FinalStep() {
    const { replace } = useRouter();
    return (
        <AnimatePresence>
            <div className={styles.onboardingStep}>
                <Image className={styles.logo} src={AnimatedLogo} alt="logo" />
                <div>
                    <p>You&apos;re all set!</p>
                    <p>
                        We are putting together top course recommendations for
                        you...
                    </p>
                </div>
                <Image
                    className={styles.animatedLogo}
                    src={AnimatedLogo}
                    alt="logo"
                />
                <div className={styles.progressContainer}>
                    <motion.div
                        onAnimationComplete={() => {
                            replace("/course-recommendations");
                        }}
                        initial={{
                            width: 0,
                        }}
                        animate={{
                            width: "100%",
                            transition: {
                                type: "ease",
                                duration: 2,
                                delay: 0.6,
                            },
                        }}
                        className={styles.progress}
                    />
                </div>
            </div>
        </AnimatePresence>
    );
}
