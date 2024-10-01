import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { StepContext } from "context/StepContext";
import Image from "next/image";
import BackIcon from "assets/svgs/back_icon_1.svg";
import { useSelector } from "react-redux";
import {
    useGetComfortLevelMutation,
    useSaveUserChoiceMutation,
} from "services/onboarding";
import { useFormData } from "context/FormContext";
import BottomRightFold from "assets/svgs/right_corner_right_arrow_icon.svg";
import WizrLogo from "assets/gifs/wizrLogoCharcoalTransparent.gif";
import NotAllowedIcon from "assets/images/notAllowedIcon.png";
import { Tooltip } from "@mantine/core";
import styles from "./OnboardingStep3.module.scss";
import { DIFFICULTY_LEVELS } from "../../constants";

export function OnboardingStep3() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { prevStep, nextStep } = useContext(StepContext);
    const appConfig = useSelector((state) => state.config);
    const auth = useSelector((state) => state.auth);
    const { data: formData, setFormValues } = useFormData();
    const [performGetComfortLevelMutation] = useGetComfortLevelMutation();
    const [performSaveUserChoiceMutation] = useSaveUserChoiceMutation();

    const getComfortLevels = useCallback(async () => {
        const res = await performGetComfortLevelMutation({
            payload: {
                subject_id: formData.subjectId,
                skill_id: formData.skillId,
            },
        });
        // if (res?.data?.data?.status === "success") {
        const apiData = res?.data?.data?.data || [];
        const arr = Object.entries(DIFFICULTY_LEVELS).map((item) => {
            const obj = { ...item[1], label: item[0], isActive: false };
            if (apiData?.length) {
                apiData?.forEach((apiItem) => {
                    if (apiItem?.course_level__c === item[0]) {
                        obj.isActive = true;
                    }
                });
            }
            return obj;
        });
        setData(arr);
        // }
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    useEffect(() => {
        getComfortLevels();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const saveData = useCallback(
        async (obj) => {
            const payload = {
                id: formData.insertionId,
                customer_id: auth?.user?.id,
                key: "comfort_level",
                value: obj.label,
            };
            const res = await performSaveUserChoiceMutation({ payload });
            if (res?.data?.data?.status === "success") {
                setFormValues({
                    comfortLevel: obj.label,
                });
                nextStep();
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [auth, formData],
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
                    What is your current comfort level in{" "}
                    {appConfig.skillReco?.name}?
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
                <div className={styles.levelContainer}>
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
                                    key={item.id}
                                    initial={{
                                        opacity: 0,
                                    }}
                                    className={
                                        item.isActive ? "" : styles.disabled
                                    }
                                    animate={{
                                        opacity: 1,
                                        transition: {
                                            duration: 0.5,
                                            delay: 0.2 + index * 0.08,
                                        },
                                    }}
                                    onClick={() => {
                                        if (item.isActive)
                                            setTimeout(
                                                () => saveData(item),
                                                700,
                                            );
                                    }}
                                >
                                    <Image
                                        src={DIFFICULTY_LEVELS[item.label].icon}
                                        alt={item.label}
                                    />
                                    <div>
                                        <p>{item.label}</p>
                                        {!item.isActive ? (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <p className={styles.desc}>
                                                    <Image
                                                        width={20}
                                                        height={20}
                                                        style={{
                                                            marginRight: 5,
                                                        }}
                                                        src={NotAllowedIcon}
                                                        alt="not-allowed"
                                                    />
                                                    Courses not available
                                                    currently
                                                </p>
                                            </div>
                                        ) : (
                                            <p className={styles.desc}>
                                                {
                                                    DIFFICULTY_LEVELS[
                                                        item.label
                                                    ].desc
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <Image
                                        className={styles.fold}
                                        src={BottomRightFold}
                                        alt=""
                                    />
                                </motion.div>,
                            ),
                        )
                    ) : (
                        <h3>No data present</h3>
                    )}
                </div>
                {/* <HelpSection label="Take our Skill Assessment" /> */}
            </div>
        </AnimatePresence>
    );
}
