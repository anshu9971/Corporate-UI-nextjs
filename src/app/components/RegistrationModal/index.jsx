import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { StepProvider } from "context/StepContext";
import { LoginModal } from "../LoginModal";
import { RegistrationQuestionsModal } from "../RegistrationQuestionsModal";
import { testimonials } from "./constants";

export function RegistrationModal({
    startProcess,
    closeModal,
    modalClassName,
    contentClassName,
    stepOneCTAText,
    // showInactiveAccountModal,
    fromHeader = false,
    flow = "login",
    stepTwoCTAText,
}) {
    const [showOnboardingSteps, setShowOnboardingSteps] = useState(false);
    const router = useRouter();

    const closeLoginModal = useCallback((params) => {
        closeModal(params);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <LoginModal
                fromHeader={fromHeader}
                isVisible={startProcess}
                onLoginSuccess={(isProfileComplete = true) => {
                    if (!isProfileComplete) {
                        setShowOnboardingSteps(true);
                        setTimeout(() => {}, 0);
                    } else if (
                        ["/terms-and-conditions", "/privacy-policy"].includes(
                            window.location.pathname,
                        )
                    ) {
                        router.push("/");
                        closeModal();
                    } else {
                        closeModal();
                    }
                }}
                closeModal={closeLoginModal}
                modalClassName={modalClassName}
                contentClassName={contentClassName}
                testimonials={testimonials[flow]}
            />
            <StepProvider>
                <RegistrationQuestionsModal
                    fromHeader={fromHeader}
                    modalClassName={modalClassName}
                    contentClassName={contentClassName}
                    isVisible={showOnboardingSteps}
                    closeModal={(
                        startOnboardingProcess,
                        showInactiveModal,
                        forceLogin,
                    ) => {
                        setShowOnboardingSteps(false);
                        // if (fromHeader && showInactiveModal) {
                        //     showInactiveAccountModal();
                        // } else
                        closeModal(startOnboardingProcess, forceLogin);
                    }}
                    stepOneCTAText={stepOneCTAText}
                    testimonials={testimonials[flow]}
                    stepTwoCTAText={stepTwoCTAText}
                />
            </StepProvider>
        </div>
    );
}
