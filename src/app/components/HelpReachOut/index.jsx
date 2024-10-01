import { motion } from "framer-motion";
import styles from "./HelpReactOut.module.scss";

export function HelpReachOut() {
    const isMobile = window?.innerWidth < 640;
    const animation = {
        initial: {
            opacity: 0,
            y: "-100%",
            left: "50%",
            transform: "translate(-50%, -2%)",
        },
        animate: {
            opacity: 1,
            y: 0,
        },
    };

    return (
        <motion.div
            {...(isMobile ? {} : animation)}
            transition={{
                type: "spring",
                damping: 7,
                stiffness: 50,
                delay: 0.1,
            }}
            className={styles.helpReachOutContainer}
        >
            <p>Any questions?</p>
            <div>
                Talk to Us: <a href="tel:022-41900000">022-41900000</a>; 9 AM -
                7 PM (Mon-Fri)
            </div>
        </motion.div>
    );
}
