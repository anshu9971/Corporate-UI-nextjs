/* eslint-disable consistent-return */
import React, { useEffect, useMemo } from "react";
import Modal from "components/Modal";
import CloseIcon from "assets/svgs/close_icon.svg";
import CareerIcon from "assets/images/specsGuy.png";
import CourseIcon from "assets/images/student-icon.png";
import Image from "next/image";
import { createSlug } from "utils/helpers";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import styles from "./InactiveAccountModal.module.scss";
import { Button } from "../Button";

const CARDS = [
    {
        tagName: "Mental Make-up Discovery",
        icon: CareerIcon,
        title: "Discover your Mental Make-up",
        desc: "Discover your Mental Make-up by playing a bunch of engaging games.",
        btnLabel: "Play Now",
        route: "/discover/career-discovery",
    },
    {
        tagName: "Skill Level Discovery",
        icon: CourseIcon,
        title: "Know your Skill Level",
        desc: "Answer a few questions and know your skill level.",
        btnLabel: "Take the Quiz!",
        route: "/discover/expertise-discovery",
    },
    {
        tagName: "Course Discovery",
        icon: CourseIcon,
        title: "Find the perfect course",
        desc: "Based on your profile get unbiased course recommendations.",
        btnLabel: "Explore",
        route: "/start-skilling",
    },
];

export function InactiveAccountModal({
    onLoginSuccess = () => {},
    startOnboardingProcess = () => {},
    isVisible,
    closeModal,
    modalClassName = "",
    contentClassName = "",
}) {
    const { push } = useRouter();
    const auth = useSelector((state) => state.auth);
    const isLoggedIn = useMemo(() => !!auth.token, [auth]);

    useEffect(() => {
        // if already logged in, then open the profile modal
        if (isVisible && isLoggedIn) {
            if (auth.user?.first_name) {
                startOnboardingProcess();
            } else {
                onLoginSuccess();
            }
        }
    }, [isLoggedIn, auth, onLoginSuccess, startOnboardingProcess, isVisible]);

    return (
        <div>
            <Modal
                className={`${styles.loginModal} ${modalClassName}`}
                opened={isVisible}
                withCloseButton={false}
                centered
                onClose={() => {}}
                size="80vw"
                transitionProps={{ transition: "slide-up", duration: 250 }}
                scrollLock={false}
            >
                <div className={`${styles.loginContent} ${contentClassName}`}>
                    <div className={styles.header}>
                        <Image
                            onClick={() => {
                                closeModal();
                            }}
                            className={styles.icon}
                            src={CloseIcon}
                            alt="close"
                        />
                    </div>
                    <div className={styles.content}>
                        <h3>Time to be WiZR now! Explore here:</h3>
                        <div className={styles.cardContainer}>
                            {CARDS.map((item) => (
                                <div className={styles.card}>
                                    <div className={styles.tag}>
                                        {item.tagName}
                                    </div>
                                    <div className={styles.icon}>
                                        <Image
                                            height={92}
                                            src={item.icon}
                                            alt={item.tagName}
                                        />
                                    </div>
                                    <h4>{item.title}</h4>
                                    <p>{item.desc}</p>
                                    <Button
                                        className={styles.btn}
                                        variant="primary"
                                        widthStyle="long"
                                        onClick={() => {
                                            push(createSlug(item.route));
                                            closeModal();
                                        }}
                                    >
                                        {item.btnLabel}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
