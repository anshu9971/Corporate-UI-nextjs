"use client";

import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import styles from "./CourseInterestTimeline.module.scss";

function TimerComp({ responseTime, merchantSfid, setTimeElapsedMsg }) {
    const expiryTimestamp = new Date();

    const {
        seconds,
        minutes,
        restart,
        // eslint-disable-next-line no-console
    } = useTimer({
        expiryTimestamp,
        onExpire: () => {
            setTimeElapsedMsg(true);
            const element = document.getElementById(merchantSfid);
            if (element) {
                element.style.opacity = 0;
            }
        },
    });

    useEffect(() => {
        if (responseTime) {
            expiryTimestamp.setSeconds(
                expiryTimestamp.getSeconds() + responseTime,
            );
            restart(expiryTimestamp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [responseTime]);

    return (
        responseTime && (
            <>
                <span className={styles.min}>{minutes}</span>:
                <span className={styles.sec}>
                    {String(seconds).padStart(2, "0")}
                </span>
            </>
        )
    );
}

export default TimerComp;
