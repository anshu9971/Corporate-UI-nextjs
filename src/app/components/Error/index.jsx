import { motion } from "framer-motion";
import styles from "./index.module.scss";

export function Error({
    message,
    style = {},
    hideOnMobile = false,
    hideOnDesktop = false,
    className = "",
}) {
    if (!message) return null;
    return (
        <motion.p
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            className={`${styles.error} ${
                hideOnMobile ? styles.hideOnMobile : ""
            } ${hideOnDesktop ? styles.hideOnDesktop : ""} ${className}`}
            style={style}
        >
            {message}
        </motion.p>
    );
}
