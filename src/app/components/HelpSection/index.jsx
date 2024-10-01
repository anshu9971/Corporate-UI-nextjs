import { motion } from "framer-motion";
import React from "react";
import styles from "./HelpSection.module.scss";

export function HelpSection({ label = "Take our Skill Assessment" }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
                transition: {
                    delay: 1.2,
                    duration: 0.5,
                },
            }}
            className={styles.helpSectionContainer}
        >
            <div className={styles.helpSection}>
                <p>Not sure?</p>
                <div className={styles.label}>
                    <p>{label}</p>
                </div>
            </div>
        </motion.div>
    );
}
