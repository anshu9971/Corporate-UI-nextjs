"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import StudentIcon from "assets/images/student-icon.png";
import ProfessionalIcon from "assets/images/professional-icon.png";
import { AnimatePresence, motion } from "framer-motion";
import { StepContext } from "context/StepContext";
import BackIcon from "assets/svgs/back_icon.svg";
import FoldIcon from "assets/images/fold.png";
import { useUpdateUserProfessionMutation } from "services/users";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "redux/store/authSlice";
import {
    EXPERIENCE_DROPDOWN_OPTIONS,
    QUALIFICATION_DROPDOWN_VALUES,
} from "utils/constants";
import styles from "./Step2.module.scss";
import { Dropdown } from "../../../Dropdown";
import { Button } from "../../../Button";

const FORM_STATE = {
    describe: "describe",
    educationLevel: "educationLevel",
};
const DESCRIPTION = [
    {
        key: "Student",
        icon: StudentIcon,
        label: "A Student",
    },
    {
        key: "Professional",
        icon: ProfessionalIcon,
        label: "A Professional",
    },
];

export function Step2({
    closeModal,
    onFinish = () => {},
    setTestimonial,
    stepTwoCTAText = "Continue",
}) {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [performUpdateUserProfessionMutation] =
        useUpdateUserProfessionMutation();
    const [form, setForm] = useState({
        profession: undefined,
        experience: undefined,
        qualification: undefined,
    });
    const { prevStep, resetStep } = useContext(StepContext);
    const [formState, setFormState] = useState(FORM_STATE.describe);
    const [selectedOption, setSelectedOption] = useState(null);
    useEffect(
        () => setTestimonial(selectedOption?.key ?? "whatDescribesYouScreen"),
        [selectedOption, setTestimonial],
    );
    const submitDetails = async () => {
        const payload = {
            customer_id: auth.user.id,
            ...form,
        };
        const res = await performUpdateUserProfessionMutation({ payload });
        if (res?.data?.data?.status === "success") {
            dispatch(setUserData(res?.data?.data?.data));
            closeModal(
                true,
                !auth.user?.is_account_active,
                res?.data?.data?.data?.profile_completed,
            );
            resetStep();
            onFinish();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    const setFormValues = useCallback(
        (key, value) =>
            setForm((prevState) => ({ ...prevState, [key]: value })),
        [],
    );
    return (
        <div className={styles.step2}>
            <Image
                onClick={() => {
                    if (formState === FORM_STATE.educationLevel) {
                        setSelectedOption(null);
                        setFormState(FORM_STATE.describe);
                    } else {
                        prevStep();
                    }
                }}
                className={styles.backIcon}
                src={BackIcon}
                alt="back"
            />
            <AnimatePresence>
                <div>
                    {formState === FORM_STATE.describe ? (
                        <motion.div
                            key="desc"
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    duration: 0.6,
                                },
                            }}
                        >
                            <p>What describes you the best?</p>
                            <p>We will curate courses based on who you are</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="edu"
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    duration: 0.6,
                                },
                            }}
                        >
                            <p>What’s your highest education level?</p>
                            <p>We will curate courses based on who you are</p>
                        </motion.div>
                    )}
                </div>
            </AnimatePresence>
            <motion.div
                layout
                className={styles.form}
                style={{
                    marginTop: formState === FORM_STATE.describe ? "16%" : "7%",
                }}
            >
                <AnimatePresence>
                    {formState === FORM_STATE.describe ? (
                        <motion.div
                            key="options_row"
                            initial={{
                                opacity: 0,
                            }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={styles.row}
                        >
                            {DESCRIPTION.map((item) => (
                                <motion.div
                                    key={item.key}
                                    onClick={() => {
                                        setFormState(FORM_STATE.educationLevel);
                                        setSelectedOption(item);
                                        setFormValues("profession", item.key);
                                    }}
                                    transition={{
                                        transition: {
                                            duration: 0.35,
                                            ease: "easeOut",
                                        },
                                    }}
                                    exit={{ opacity: 0 }}
                                    whileHover={{
                                        scale: 1.1,
                                    }}
                                    className={styles.option}
                                >
                                    <motion.div
                                        transformTemplate={() => {
                                            // console.log(x, y, z, scaleX, scaleY);
                                            // return `translate3d(${x},${y},${z}) scale(${scaleX},${scaleY})`;
                                        }}
                                        key={item.label}
                                        transition={{ duration: 0.01 }}
                                        exit={{ opacity: 0 }}
                                        layoutId={item.key}
                                    >
                                        <Image
                                            src={item.icon}
                                            alt="professional"
                                        />
                                    </motion.div>
                                    <div>
                                        <p>I am</p>
                                        <p>{item.label}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : null}
                    {selectedOption && (
                        <>
                            <motion.div
                                initial={{
                                    backgroundColor: "rgba(214,249,99,0)",
                                }}
                                animate={{
                                    backgroundColor: "rgb(214,249,99)",
                                    transition: {
                                        duration: 1,
                                        delay: 0.05,
                                    },
                                }}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    zIndex: 0,
                                }}
                                className={styles.selectedOption}
                            >
                                <motion.div
                                    key="A Professional"
                                    layoutId={selectedOption.key}
                                    transition={{
                                        duration: 0.35,
                                        ease: "easeOut",
                                    }}
                                >
                                    <Image
                                        style={{
                                            width: 74,
                                            height: 94,
                                            marginTop: -10,
                                            objectFit: "contain",
                                        }}
                                        src={selectedOption.icon}
                                    />
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            transition: {
                                                duration: 0.55,
                                                delay: 0.65,
                                            },
                                        }}
                                        className={styles.foldIcon}
                                    >
                                        <Image src={FoldIcon} />
                                    </motion.div>
                                </motion.div>
                                <div>
                                    <p>I am</p>
                                    <p>{selectedOption.label}</p>
                                </div>
                            </motion.div>

                            {selectedOption.key === "Student" ? (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transition: {
                                            duration: 0.5,
                                        },
                                    }}
                                    style={{ marginTop: 0, top: 120 }}
                                    className={styles.dropdownContainer}
                                >
                                    <Dropdown
                                        styles={{
                                            input: {
                                                height: 50,
                                                borderRadius: 10,
                                                border: "1px solid #CAC8CD",
                                            },
                                        }}
                                        placeholder="Highest Degree"
                                        onChange={(value) => {
                                            setFormValues(
                                                "qualification",
                                                value,
                                            );
                                        }}
                                        options={QUALIFICATION_DROPDOWN_VALUES}
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transition: {
                                            duration: 0.5,
                                        },
                                    }}
                                >
                                    <div
                                        style={{ marginTop: 0, top: 120 }}
                                        className={styles.dropdownContainer}
                                    >
                                        <Dropdown
                                            styles={{
                                                input: {
                                                    height: 50,
                                                    borderRadius: 10,
                                                    border: "1px solid #CAC8CD",
                                                },
                                            }}
                                            placeholder="Highest qualification"
                                            onChange={(value) => {
                                                setFormValues(
                                                    "qualification",
                                                    value,
                                                );
                                            }}
                                            options={
                                                QUALIFICATION_DROPDOWN_VALUES
                                            }
                                        />
                                    </div>
                                    <div
                                        style={{ marginTop: 0, top: 186 }}
                                        className={styles.dropdownContainer}
                                    >
                                        <Dropdown
                                            styles={{
                                                input: {
                                                    height: 50,
                                                    borderRadius: 10,
                                                    border: "1px solid #CAC8CD",
                                                },
                                            }}
                                            placeholder="Years of work experience"
                                            onChange={(value) => {
                                                setFormValues(
                                                    "experience",
                                                    value,
                                                );
                                            }}
                                            options={
                                                EXPERIENCE_DROPDOWN_OPTIONS
                                            }
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </>
                    )}
                </AnimatePresence>
            </motion.div>
            {formState === FORM_STATE.educationLevel && (
                <Button
                    className={styles.otpCta}
                    onClick={submitDetails}
                    variant="primary"
                    style={{
                        padding: "0 30px",
                    }}
                >
                    {stepTwoCTAText}
                </Button>
            )}
        </div>
    );
}
