/* eslint-disable no-nested-ternary */
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { StepContext } from "context/StepContext";
import Image from "next/image";
import MapPin from "assets/svgs/mapPin.svg";
import CheckIcon from "assets/svgs/check_circle.svg";
import ErrorIcon from "assets/svgs/error_exclamation_circle_red.svg";
import CloseIcon from "assets/svgs/close_icon.svg";
import BackIcon from "assets/svgs/back_icon_1.svg";
import { useFormData } from "context/FormContext";
import {
    useFindLocationMutation,
    useGetPreferredLearningModeMutation,
    useSaveUserChoiceMutation,
    useVerifyPincodeMutation,
} from "services/onboarding";
import { useDispatch, useSelector } from "react-redux";
import WizrLogo from "assets/gifs/wizrLogoCharcoalTransparent.gif";
import BottomRightFold from "assets/svgs/right_corner_right_arrow_icon.svg";
import NotAllowedIcon from "assets/images/notAllowedIcon.png";
import { Input, Modal, Tooltip } from "@mantine/core";
import { Button } from "components/Button";
import { setUserData } from "redux/store/authSlice";
import { Error } from "../../../Error";
import { LEARNING_MODES } from "../../constants";
import styles from "./OnboardingStep4.module.scss";

export function OnboardingStep4() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [location, setLocation] = useState({});
    const [isPinCodeModalVisible, setIsPinCodeModalVisible] = useState(false);
    const auth = useSelector((state) => state.auth);
    const [pincode, setPincode] = useState(auth?.user?.pincode || "");
    const { prevStep, nextStep } = useContext(StepContext);
    const { data: formData, setFormValues } = useFormData();
    const dispatch = useDispatch();
    const [performGetPreferredLearningModeMutation] =
        useGetPreferredLearningModeMutation();
    const [performSaveUserChoiceMutation] = useSaveUserChoiceMutation();
    const [areCoursesAvailableOnPincode, setAreCoursesAvailableOnPincode] =
        useState();
    const [verifyCourseAvailabilityOnPincode] = useFindLocationMutation();
    const isMobile = window.innerWidth < 780;
    const isLoggedIn = auth?.user?.id;

    const getLearningModes = useCallback(async () => {
        const res = await performGetPreferredLearningModeMutation({
            payload: {
                subject_id: formData.subjectId,
                skill_id: formData.skillId,
                comfort_level: formData.comfortLevel,
                customer_id: auth?.user?.id,
                id: formData.insertionId,
            },
        });
        const arr = Object.entries(LEARNING_MODES).map((item) => {
            const obj = { ...item[1], label: item[0], isActive: false };
            if (res?.data?.data?.data?.length) {
                res?.data?.data?.data?.forEach((apiItem) => {
                    if (apiItem?.course_delivery_mode__c === item[0]) {
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
        getLearningModes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const saveData = useCallback(
        async (obj, savePincode = false) => {
            const payload = {
                id: formData.insertionId,
                customer_id: auth?.user?.id,
                key: "preferred_learning",
                value: LEARNING_MODES[obj.label].key,
            };
            const pincodeSavePayload = {
                id: formData.insertionId,
                customer_id: auth?.user?.id,
                key: "pincode",
                value: pincode,
            };

            const res = await Promise.all([
                performSaveUserChoiceMutation({ payload }),
                savePincode
                    ? performSaveUserChoiceMutation({
                          payload: pincodeSavePayload,
                      })
                    : new Promise((resolve) =>
                          // eslint-disable-next-line  no-promise-executor-return
                          resolve({
                              data: {
                                  data: {
                                      status: "success",
                                  },
                              },
                          }),
                      ),
            ]);
            const isSaveSuccessful = res?.every(
                (item) => item?.data?.data?.status === "success",
            ); // if both calls are successful
            if (isSaveSuccessful) {
                setFormValues({
                    learningMode: obj.label,
                    pincode,
                });
                dispatch(
                    setUserData({
                        pincode,
                    }),
                );
                nextStep(
                    ["Offline", "flexible"].includes(
                        LEARNING_MODES[obj.label].key,
                    )
                        ? 6
                        : null,
                );
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [auth, formData, pincode],
    );
    const [performVerifyPincodeMutation, { isLoading }] =
        useVerifyPincodeMutation();

    const verifyPincode = useCallback(
        async (code) => {
            const res = await performVerifyPincodeMutation({
                payload: {
                    pincode: code,
                },
            });
            if (res?.data?.data?.status === "success") {
                setLocation(res.data.data);
                const { data: availabilityData } =
                    await verifyCourseAvailabilityOnPincode({
                        payload: {
                            pincode: code,
                            interest_id: formData.insertionId,
                        },
                    });
                if (
                    res.data.data?.city &&
                    availabilityData?.data.no_products_presents > 0
                ) {
                    setError(false);
                    setAreCoursesAvailableOnPincode(true);
                } else if (res.data.data?.city) {
                    setError(
                        `No offline courses available on this pincode, please try a different one.`,
                    );
                    setAreCoursesAvailableOnPincode(false);
                }
            } else {
                setError("Please Enter a valid pincode");
                setAreCoursesAvailableOnPincode(false);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [location],
    );
    const withTooltipIfDisabled = (item, label, children) => {
        const isDisabled = !item?.isActive;
        if (isDisabled)
            return (
                <>
                    <Tooltip.Floating label={label}>
                        {children}
                    </Tooltip.Floating>
                    {isMobile && item.key === "Offline" && (
                        <div className={styles.pinChangeContainerMobile}>
                            {!areCoursesAvailableOnPincode && (
                                <span>
                                    Courses not available in your pincode
                                </span>
                            )}
                            <button
                                type="button"
                                className="unstyledButton"
                                onClick={() => setIsPinCodeModalVisible(true)}
                            >
                                Change Pincode
                            </button>
                        </div>
                    )}
                </>
            );
        return children;
    };
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
    const onSelectOption = (item) => {
        if (item.isActive) {
            if (!isLoggedIn && item?.key === "Offline") {
                setIsPinCodeModalVisible(true);
            } else {
                setTimeout(() => saveData(item), 300);
            }
        }
    };
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
                                item,
                                "Courses not available currently",

                                <motion.div
                                    key={item.id}
                                    className={`${styles.levelCard} ${
                                        item.isActive ? "" : styles.disabled
                                    }`}
                                    onClick={() => onSelectOption(item)}
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transition: {
                                            duration: 0.5,
                                            delay: 0.2 + index * 0.08,
                                        },
                                    }}
                                >
                                    <Image
                                        src={LEARNING_MODES[item.label].icon}
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
                                                <p
                                                    className={styles.desc}
                                                    style={{
                                                        marginTop: 0,
                                                    }}
                                                >
                                                    <Image
                                                        width={20}
                                                        height={20}
                                                        style={{
                                                            marginRight: 5,
                                                        }}
                                                        src={NotAllowedIcon}
                                                        alt="not-allowed"
                                                    />{" "}
                                                    Courses not available
                                                    currently
                                                </p>
                                            </div>
                                        ) : (
                                            <p className={styles.desc}>
                                                {
                                                    LEARNING_MODES[item.label]
                                                        .desc
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

                    {!isMobile && isLoggedIn && (
                        <div className={styles.pinChangeContainerDesktop}>
                            {!areCoursesAvailableOnPincode && (
                                <span>
                                    Courses not available in your pincode
                                </span>
                            )}
                            <button
                                type="button"
                                className="unstyledButton"
                                onClick={() => setIsPinCodeModalVisible(true)}
                            >
                                Change Pincode
                            </button>
                        </div>
                    )}
                </div>
                {/* <HelpSection label="Take our Skill Assessment" /> */}
                <Modal
                    opened={isPinCodeModalVisible}
                    onClose={() => setIsPinCodeModalVisible(false)}
                    destroyOnClose
                    className={styles.pincodeModal}
                    withCloseButton={false}
                    centered
                    size={isMobile ? "auto" : "sm"}
                    transitionProps={{ transition: "slide-up", duration: 250 }}
                    lockScroll={false}
                >
                    <div className={styles.pincodeModalContent}>
                        <Image
                            src={CloseIcon}
                            className={styles.closeIcon}
                            onClick={() => {
                                // setPincode("");
                                setIsPinCodeModalVisible(false);
                            }}
                        />
                        <h2>
                            {isLoggedIn
                                ? "Enter another pincode"
                                : "Please enter your pincode"}
                        </h2>
                        <Input
                            className={`${styles.input} ${
                                error
                                    ? styles.error
                                    : areCoursesAvailableOnPincode
                                    ? styles.success
                                    : ""
                            }`}
                            rightSection={
                                error ? (
                                    <Image src={ErrorIcon} />
                                ) : areCoursesAvailableOnPincode ? (
                                    <Image src={CheckIcon} />
                                ) : null
                            }
                            value={pincode}
                            onChange={(e) => {
                                const value = e.target.value || "";
                                const pattern = /^\d{0,6}$/;
                                if (pattern.test(value)) {
                                    setPincode(e.target.value);
                                }
                            }}
                            inputMode="numeric"
                        />

                        {error ? (
                            <Error
                                style={{
                                    margin: "0 !important",
                                    textAlign: "center",
                                }}
                                message={error}
                                className={styles.label}
                            />
                        ) : areCoursesAvailableOnPincode ? (
                            <div className={styles.locationContainer}>
                                <p className={styles.availableText}>
                                    Courses available
                                </p>
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
                            </div>
                        ) : null}
                        <Button
                            variant="primary"
                            disabled={pincode.length < 6 || error || isLoading}
                            className={styles.button}
                            onClick={() => {
                                setIsPinCodeModalVisible(false);
                                setTimeout(
                                    () =>
                                        saveData(
                                            data?.find(
                                                ({ key }) => key === "Offline",
                                            ),
                                            true,
                                        ),
                                    300,
                                );
                            }}
                        >
                            {" "}
                            Continue
                        </Button>
                    </div>
                </Modal>
            </div>
        </AnimatePresence>
    );
}
