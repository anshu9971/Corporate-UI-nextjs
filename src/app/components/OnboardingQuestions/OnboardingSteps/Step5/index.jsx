import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { StepContext } from "context/StepContext";
import Image from "next/image";
import BackIcon from "assets/svgs/back_icon_1.svg";
// import FoldIcon from "assets/images/fold.png";
import { useFormData } from "context/FormContext";
import MapPin from "assets/svgs/mapPin.svg";
import { useSelector } from "react-redux";
import {
    useGetSubPreferredLearningModeMutation,
    useSaveUserChoiceMutation,
    useVerifyPincodeMutation,
} from "services/onboarding";
import NotAllowedIcon from "assets/images/notAllowedIcon.png";
import { Tooltip } from "@mantine/core";
import { LEARNING_MODES, SUB_LEARNING_MODE } from "../../constants";
import styles from "./OnboardingStep5.module.scss";
import { TextInput } from "../../../TextInput";
import { Button } from "../../../Button";
import { Error } from "../../../Error";

export function OnboardingStep5() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [pincode, setPincode] = useState("");
    const [location, setLocation] = useState({});
    const auth = useSelector((state) => state.auth);
    const { prevStep, nextStep } = useContext(StepContext);
    const { data: formData, setFormValues } = useFormData();
    const selectedLearningMode = formData.learningMode;

    const [performGetSubPreferredLearningModeMutation] =
        useGetSubPreferredLearningModeMutation();
    const [performSaveUserChoiceMutation] = useSaveUserChoiceMutation();
    const [performVerifyPincodeMutation] = useVerifyPincodeMutation();

    const getLearningModes = useCallback(async () => {
        const res = await performGetSubPreferredLearningModeMutation({
            payload: {
                subject_id: formData.subjectId,
                skill_id: formData.skillId,
                comfort_level: formData.comfortLevel,
                preferred_learning: formData.learningMode,
                id: formData.insertionId,
            },
        });
        const apiData = res?.data?.data?.data || [];
        const arr = SUB_LEARNING_MODE.map((item) => {
            const obj = { label: item, isActive: false };
            if (apiData?.length) {
                apiData?.forEach((apiItem) => {
                    if (apiItem?.course_learning_mode__c === item) {
                        obj.isActive = true;
                    }
                });
            }
            return obj;
        });
        setData(arr);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);
    const verifyPincode = useCallback(async (code) => {
        const res = await performVerifyPincodeMutation({
            payload: {
                pincode: code,
            },
        });
        if (res?.data?.data?.status === "success") {
            setLocation(res.data.data);
            setError(false);
        } else {
            setError(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getLearningModes();
        if (auth?.user?.pincode) {
            setPincode(auth?.user?.pincode);
            verifyPincode(auth?.user?.pincode);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (pincode?.length === 6) {
            verifyPincode(pincode);
        }
        if (pincode?.length < 6) {
            setLocation({});
            setError(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pincode]);

    const saveData = useCallback(
        async (obj) => {
            let payload = {
                id: formData.insertionId,
                customer_id: auth?.user?.id,
            };
            if (LEARNING_MODES[selectedLearningMode].key === "Online") {
                payload = {
                    ...payload,
                    key: "preference_mode",
                    value: obj.label,
                };
            }
            const res = await performSaveUserChoiceMutation({ payload });
            if (res?.data?.data?.status === "success") {
                setFormValues({
                    subPreferredLearningMode: obj.label,
                });
                nextStep();
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
    const savePincode = useCallback(async () => {
        const payload = {
            id: formData.insertionId,
            customer_id: auth?.user?.id,
            key: "pincode",
            value: pincode,
        };

        const res = await performSaveUserChoiceMutation({ payload });
        if (res?.data?.data?.status === "success") {
            setFormValues({
                pincode,
            });
            nextStep();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pincode]);

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
                    What is your preferred learning mode?
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
                    {/* <div className={styles.selectedValue}>
                        <Image
                            className={styles.selectedValueIcon}
                            src={LEARNING_MODES[selectedLearningMode].icon}
                            alt={LEARNING_MODES[selectedLearningMode].key}
                        />
                        <p>
                            I want to learn{" "}
                            {LEARNING_MODES[
                                selectedLearningMode
                            ].key?.toLowerCase()}
                        </p>
                        <Image
                            className={styles.foldIcon}
                            src={FoldIcon}
                            alt="foldIcon"
                        />
                    </div> */}
                    {/* eslint-disable no-nested-ternary */}
                    {LEARNING_MODES[selectedLearningMode].key === "Online" ? (
                        <div>
                            <div className={styles.modesSection}>
                                {data.map((item, index) =>
                                    withTooltipIfDisabled(
                                        !item?.isActive,
                                        "Courses not available currently",
                                        <motion.div
                                            onClick={() => {
                                                if (item.isActive)
                                                    setTimeout(
                                                        () => saveData(item),
                                                        700,
                                                    );
                                            }}
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
                                            className={`${styles.mode} ${
                                                item.isActive
                                                    ? ""
                                                    : styles.disabled
                                            }`}
                                        >
                                            {!item.isActive && (
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
                                            <p>{item.label}</p>
                                        </motion.div>,
                                    ),
                                )}
                            </div>
                        </div>
                    ) : LEARNING_MODES[selectedLearningMode].key ===
                      "Offline" ? (
                        <>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "column",
                                }}
                            >
                                <div>
                                    <h4 style={{ marginBottom: "5%" }}>
                                        Tell us your pincode
                                    </h4>
                                    <div
                                        style={{ width: 340, marginBottom: 15 }}
                                    >
                                        <TextInput
                                            error={error}
                                            value={pincode}
                                            onChange={(e) => {
                                                const value =
                                                    e.target.value || "";
                                                const pattern = /^\d{0,6}$/;
                                                if (pattern.test(value)) {
                                                    setPincode(e.target.value);
                                                }
                                            }}
                                            inputMode="numeric"
                                        />
                                    </div>
                                    {error ? (
                                        <Error
                                            style={{
                                                margin: "0 !important",
                                                textAlign: "center",
                                            }}
                                            message="Please enter a valid pincode"
                                            className={styles.label}
                                        />
                                    ) : location.city ? (
                                        <motion.p
                                            initial={{
                                                opacity: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                transition: { duration: 0.34 },
                                            }}
                                            className={styles.locationText}
                                        >
                                            <Image src={MapPin} alt="pin" />
                                            {location.city}, {location.state}
                                        </motion.p>
                                    ) : null}
                                </div>
                            </div>
                            <Button
                                className={styles.ctaButton}
                                style={{
                                    visibility:
                                        (
                                            !location.city ||
                                            LEARNING_MODES[selectedLearningMode]
                                        ).key === "Offline"
                                            ? "visible"
                                            : "hidden",
                                }}
                                onClick={savePincode}
                                variant="primary"
                            >
                                Continue
                            </Button>
                        </>
                    ) : null}
                </div>
            </div>
        </AnimatePresence>
    );
}
