import React, { useCallback, useEffect, useState } from "react";
import { StepProvider } from "context/StepContext";
// import { ProgressBar } from "../ProgressBar";
import styles from "./OnboardingQuestions.module.scss";
import { OnboardingSteps } from "./OnboardingSteps";

export function OnboardingQuestions({ hideOnboarding }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        document.querySelector("body").style.backgroundColor =
            window.innerWidth <= 700 ? "#fff" : "#F4F3F5";
        const header = document.querySelector(".global-header");
        if (header)
            header.style.backgroundColor =
                window.innerWidth <= 700 ? "#fff" : "transparent";

        return () => {
            document.querySelector("body").style.backgroundColor = "";
            if (header) header.style.backgroundColor = "";
        };
    }, []);

    const handleProgress = useCallback(setProgress, [setProgress]);

    return (
        <div
            style={{
                backgroundColor: progress === 100 ? "transparent" : "#fff",
                paddingBottom: progress === 100 ? 0 : "10px",
            }}
            className={styles.onboardingQuestions}
        >
            {/* <ProgressBar progressTo={progress} /> */}
            <div className={styles.onboardingContent}>
                <StepProvider>
                    <OnboardingSteps
                        handleProgress={handleProgress}
                        hideOnboarding={hideOnboarding}
                    />
                </StepProvider>
            </div>
        </div>
    );
}
