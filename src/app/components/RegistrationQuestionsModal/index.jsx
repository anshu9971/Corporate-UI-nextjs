import React, { useContext, useState } from "react";
import Modal from "components/Modal";
// import CloseIcon from "assets/svgs/close_icon.svg";
import Image from "next/image";
import Logo from "assets/svgs/wizrLogo.svg";
import BackIcon from "assets/svgs/back-icon.svg";
import { StepContext } from "context/StepContext";
import styles from "./RegistrationQuestionsModal.module.scss";
import TestimonialCard from "../TestimonialCard";
// import { Questions } from "./Questions";
import { Step1 } from "./Questions/Step1";

export function RegistrationQuestionsModal({
    isVisible,
    closeModal,
    modalClassName,
    contentClassName,
    // stepOneCTAText,
    testimonials,
    // showInactiveAccountModal,
    // fromHeader,
    // stepTwoCTAText,
}) {
    const {
        currentStep,
        prevStep,
        // resetStep
    } = useContext(StepContext);
    const [testimonial, setTestimonial] = useState(null);
    return (
        <Modal
            className={`${styles.registration} ${modalClassName}`}
            opened={isVisible}
            withCloseButton={false}
            centered
            size="80vw"
            transitionProps={{ transition: "slide-up", duration: 250 }}
            lockScroll={false}
        >
            <div
                className={`${styles.registrationContent} ${contentClassName}`}
            >
                <div className={styles.header}>
                    <Image className={styles.icon} src={Logo} alt="WiZR" />
                    {/* <Image
                        onClick={() => {
                            closeModal(false, false);
                            setTimeout(() => resetStep(), 400);
                        }}
                        className={styles.icon}
                        src={CloseIcon}
                    /> */}
                    {currentStep !== 1 && (
                        <Image
                            onClick={prevStep}
                            className={styles.icon}
                            src={BackIcon}
                            alt="back"
                        />
                    )}
                </div>
                <div>
                    <div className={styles.left}>
                        {/* <Questions
                            fromHeader={fromHeader}
                            showInactiveAccountModal={showInactiveAccountModal}
                            closeModal={closeModal}
                            stepOneCTAText={stepOneCTAText}
                            setTestimonial={setTestimonial}
                            stepTwoCTAText={stepTwoCTAText}
                        /> */}
                        <Step1
                            closeModal={closeModal}
                            setTestimonial={setTestimonial}
                        />
                    </div>
                    <div className={styles.right}>
                        {testimonial && (
                            <TestimonialCard {...testimonials[testimonial]} />
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
}
