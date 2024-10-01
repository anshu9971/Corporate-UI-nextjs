import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { StepContext } from "context/StepContext";
import Image from "next/image";
import BackIcon from "assets/svgs/back_icon_1.svg";
import { useSelector } from "react-redux";
import { useFormData } from "context/FormContext";
import {
    useGetLearningTimeSpentMutation,
    useSaveUserChoiceMutation,
} from "services/onboarding";
import { Tooltip } from "@mantine/core";
import { LEARNING_TIME } from "components/OnboardingQuestions/constants";
import WizrLogo from "assets/gifs/wizrLogoCharcoalTransparent.gif";
import NotAllowedIcon from "assets/images/notAllowedIcon.png";
import styles from "./OnboardingStep6.module.scss";

export function OnboardingStep6() {
    const [selectedOption, setSelectedOption] = useState(null);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useSelector((state) => state.auth);
    const { prevStep: prev, nextStep } = useContext(StepContext);
    const { data: formData } = useFormData();
    const selectedLearningMode = formData.learningMode;
    const prevStep = () =>
        ["In-person (Offline)", "Hybrid"].includes(formData?.learningMode)
            ? nextStep(4)
            : prev();
    const [performGetLearningTimeSpentMutation] =
        useGetLearningTimeSpentMutation();
    const [performSaveUserChoiceMutation] = useSaveUserChoiceMutation();

    const getTimeSpentData = useCallback(async () => {
        const res = await performGetLearningTimeSpentMutation({
            payload: {
                subject_id: formData.subjectId,
                skill_id: formData.skillId,
                comfort_level: formData.comfortLevel,
                preferred_learning: formData.learningMode,
                sub_preferred_learning: formData.subPreferredLearningMode,
                customer_id: auth?.user?.id,
                id: formData.insertionId,
                ...(formData?.pincode?.length === 6
                    ? { pincode: formData.pincode }
                    : {}),
            },
        });
        const apiData = res?.data?.data?.data || [];
        const arr = Object.entries(LEARNING_TIME).map((item) => {
            const obj = { ...item[1], label: item[0], isActive: false };
            if (apiData?.length) {
                apiData?.forEach((apiItem) => {
                    if (apiItem?.fulltime_parttime__c === item[0]) {
                        obj.isActive = true;
                    }
                });
            }
            return obj;
        });
        setData(arr);
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    useEffect(() => {
        getTimeSpentData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const saveData = useCallback(
        async (obj) => {
            const payload = {
                id: formData.insertionId,
                customer_id: auth?.user?.id,
                key: "learning_time_spend",
                value: obj.label,
            };
            const res = await performSaveUserChoiceMutation({ payload });
            if (res?.data?.data?.status === "success") {
                setTimeout(() => {
                    nextStep();
                }, 900);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [auth, formData, selectedLearningMode],
    );

    const withTooltipIfDisabled = (isDisabled, label, children) =>
        isDisabled ? (
            <Tooltip.Floating label={label}>{children}</Tooltip.Floating>
        ) : (
            children
        );
    return (
        <AnimatePresence>
            <div className={styles.onboardingStep}>
                <div className={styles.subHeader}>
                    <button
                        type="button"
                        className={styles.back}
                        onClick={prevStep}
                    >
                        <Image src={BackIcon} alt="back" />
                        <span>Back</span>
                    </button>
                    {/* <button
                        type="button"
                        className={styles.skipBtn}
                        onClick={nextStep}
                    >
                        <p>Skip This</p>
                    </button> */}
                </div>
                <motion.h2
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            duration: 0.5,
                            delay: 0.1,
                        },
                    }}
                >
                    How much time would you be able to spend for learning?
                </motion.h2>
                <motion.p
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            duration: 0.5,
                            delay: 0.4,
                        },
                    }}
                >
                    Before we can recommend you the right course, we’d like to
                    know you better.
                </motion.p>
                <div className={styles.timeSpentContainer}>
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {loading ? (
                        <Image
                            className={styles.loader}
                            src={WizrLogo}
                            alt="loading"
                        />
                    ) : data?.length ? (
                        data.map((item, index) =>
                            withTooltipIfDisabled(
                                !item?.isActive,
                                "Courses not available currently",

                                <motion.div
                                    // whileTap={{ scale: 0.9 }}
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transition: {
                                            duration: 0.5,
                                            delay: 0.6 + index * 0.08,
                                        },
                                    }}
                                    className={`${styles.timeRow} ${
                                        selectedOption === item
                                            ? styles.rowActive
                                            : ""
                                    } ${item.isActive ? "" : styles.disabled}`}
                                    onClick={() => {
                                        if (!item.isActive) return;
                                        setSelectedOption(item);
                                        setTimeout(() => {
                                            saveData(item);
                                        }, 700);
                                    }}
                                >
                                    {selectedOption === item && (
                                        <motion.div
                                            layoutId="outline"
                                            transition={{
                                                duration: 10,
                                                type: "spring",
                                                damping: 10,
                                                mass: 0.5,
                                                stiffness: 100,
                                            }}
                                            className={styles.rowOutline}
                                        />
                                    )}
                                    {item.isActive ? (
                                        <div
                                            className={`${styles.radio} ${
                                                selectedOption === item
                                                    ? styles.active
                                                    : ""
                                            }`}
                                        />
                                    ) : (
                                        <Image
                                            width={20}
                                            height={20}
                                            style={{
                                                marginRight: 5,
                                            }}
                                            src={NotAllowedIcon}
                                            alt="not-allowed"
                                        />
                                    )}
                                    <div>
                                        <p>{item.label}</p>
                                        <p>{LEARNING_TIME[item.label] ?? ""}</p>
                                    </div>
                                </motion.div>,
                            ),
                        )
                    ) : (
                        <h3>No data present</h3>
                    )}
                </div>
            </div>
        </AnimatePresence>
    );
}
