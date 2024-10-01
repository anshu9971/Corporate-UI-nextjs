import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useContext, useMemo } from "react";
import { StepContext } from "context/StepContext";
import Image from "next/image";
import BackIcon from "assets/svgs/back_icon_1.svg";
import { useFormData } from "context/FormContext";
import { useTrackEventMutation } from "services/tracking";
// import {
//     // useGetSubjectsQuery,
//     useSaveUserChoiceMutation,
// } from "services/onboarding";
import { useGetFunctionsQuery } from "services/microsite/master";
import {
    // useDispatch,
    useSelector,
} from "react-redux";
// import {
//     setInsertionId,
//     setSubjectRecommendation,
// } from "redux/store/configSlice";
import styles from "./OnboardingStep1.module.scss";

export function OnboardingStep1() {
    const { prevStep, nextStep } = useContext(StepContext);
    // const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const { setFormValues } = useFormData();
    const { data } = useGetFunctionsQuery();
    const [trackEvent] = useTrackEventMutation();
    // const [performSaveUserChoiceMutation] = useSaveUserChoiceMutation();
    const functionsData = useMemo(
        () => data?.data?.data || [],
        [data?.data?.data],
    );
    const saveData = useCallback(
        async (obj) => {
            // const payload = {
            //     customer_id: auth?.user?.id,
            //     key: "function_id",
            //     value: obj.function_id,
            // };
            setFormValues({
                customer_id: auth?.user?.id,
                selectedFunction: obj,
            });
            nextStep();
            // const res = await performSaveUserChoiceMutation({ payload });
            //     console.log("saveUserChoice res", res);
            //     if (res?.data?.data?.status === "success") {
            //         setFormValues({
            //             functionId: obj.function_id,
            //             functionName: obj.function_name,
            //             thumbnail_link: obj.thumbnail_link,
            //             functionVideoLink:
            //                 obj.video_link?.[0]?.video_720p ||
            //                 obj.video_link?.[0]?.video_1080p,
            //             insertionId: res.data.data.record_id, // needed by BE as this is a PK
            //         });
            //         dispatch(
            //             setSubjectRecommendation({
            //                 id: obj.id,
            //                 name: obj.subject_name,
            //             }),
            //         );
            //         dispatch(setInsertionId(res.data.data.record_id));
            //         nextStep();
            //     }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [auth],
    );

    const handleTrackUserFunction = async (id) => {
        const payload = { function_id: id };
        await trackEvent({ payload });
    };

    return (
        <AnimatePresence>
            <div className={styles.onboardingStep}>
                <button
                    type="button"
                    className={styles.back}
                    onClick={prevStep}
                >
                    <Image src={BackIcon} alt="back" />
                    <span>Back</span>
                </button>
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
                    Choose your function for skilling
                </motion.h2>
                <div className={styles.subjectContainer}>
                    {functionsData.map((item) => (
                        <motion.div
                            key={item.function_id}
                            className={
                                item.slug
                                    ? styles.activeStep
                                    : styles.inActiveStep
                            }
                            style={{
                                ...(item?.function_id ===
                                auth?.user?.function_id
                                    ? {
                                          backgroundColor:
                                              "var(--primary-accent-1)",
                                      }
                                    : {}),
                            }}
                            onClick={() => {
                                handleTrackUserFunction(item.function_id);
                                if (item.slug && item.slug !== null) {
                                    setTimeout(() => saveData(item), 200);
                                }
                            }}
                            whileTap={{
                                transform: "rotate(-2deg)",
                                transition: {
                                    type: "spring",
                                    damping: 5,
                                    mass: 0.75,
                                    stiffness: 200,
                                },
                            }}
                            whileHover={
                                item.slug
                                    ? {
                                          transform: "rotate(-2deg)",
                                          transition: {
                                              type: "spring",
                                              damping: 5,
                                              mass: 0.75,
                                              stiffness: 200,
                                          },
                                      }
                                    : null
                            }
                            initial={{
                                y: 10 * (Math.random() < 0.5 ? -1 : 1),
                                opacity: 0,
                            }}
                            animate={{
                                y: 0,
                                opacity: 1,
                                transition: {
                                    type: "spring",
                                    delay: Math.random() / 1.4 + 0.3,
                                    damping: 5,
                                    mass: 0.75,
                                    stiffness: 100,
                                },
                            }}
                        >
                            <p>{item.function_name}</p>
                        </motion.div>
                    ))}
                </div>
                {/* <HelpSection label="Take our Career Discovery Quiz" /> */}
            </div>
        </AnimatePresence>
    );
}
