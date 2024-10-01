import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./ResendTimer.module.scss";

const ResendTimer = forwardRef(({ onResend }, ref) => {
    const [timer, setTimer] = useState(30);

    useImperativeHandle(ref, () => ({
        setTimer,
    }));
    // Timer increase
    useEffect(() => {
        if (timer === null) return;
        setTimeout(() => {
            if (timer > 0) setTimer(timer - 1);
        }, 1000);
    }, [timer]);

    return (
        <p className={styles.resentText}>
            <button
                type="button"
                onClick={() => {
                    if (timer === 0) onResend();
                }}
            >
                <span
                    className={styles.resentText}
                    style={{
                        cursor: timer === 0 ? "pointer" : "not-allowed",
                    }}
                >
                    Resend
                </span>
            </button>{" "}
            <AnimatePresence>
                {timer !== 0 ? (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                        }}
                    >
                        {`OTP in 00:${timer
                            ?.toString()
                            ?.padStart(2, "0")} seconds`}
                    </motion.span>
                ) : (
                    ""
                )}
            </AnimatePresence>
        </p>
    );
});
export default ResendTimer;
