/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import SkillCardBagIllus from "assets/images/illusSkillCardBag.png";
import { AnimatePresence, motion } from "framer-motion";
import BackIcon from "assets/svgs/back_icon_1.svg";
import React, { useCallback, useContext, useState } from "react";
import { StepContext } from "context/StepContext";
import { useFormData } from "context/FormContext";
import ArrowRight from "assets/svgs/PlayIcon.svg";
import {
    // useDispatch,
    useSelector,
} from "react-redux";
import { useTrackEventMutation } from "services/tracking";
// import { setSkillRecommendation } from "redux/store/configSlice";

import { createSlug } from "utils/helpers";
import BottomRightFold from "assets/svgs/right_corner_right_arrow_icon.svg";
import { Loader } from "components/Loader";
import { useGetQuizConfigQuery } from "services/unberry";
import { useRouter } from "next/navigation";
import VideoPlayer from "../../../VideoPlayer";
import styles from "./OnboardingStep2.module.scss";

export function OnboardingStep2() {
    // const dispatch = useDispatch();
    const { push } = useRouter();
    const auth = useSelector((state) => state.auth);
    const [showVideo, setShowVideo] = useState(false);
    const { prevStep, nextStep } = useContext(StepContext);
    const { data: formData, setFormValues } = useFormData();
    const [trackEvent] = useTrackEventMutation();
    // const [performSaveUserChoiceMutation] = useSaveUserChoiceMutation();
    const selectedFunction = {
        name: formData?.selectedFunction?.function_name,
        desc: formData?.selectedFunction?.function_definition,
        id: formData?.selectedFunction?.function_id,
        videoThumbnail: formData?.selectedFunction?.thumbnail_link,
        domainId: formData?.selectedFunction?.unberry_subject_id,
    };

    const { data: quizData, isLoading } = useGetQuizConfigQuery(
        {
            domainId: selectedFunction?.domainId,
            function_id: selectedFunction?.id,
        },
        { skip: !selectedFunction?.domainId },
    );
    const saveData = useCallback(
        async (data) => {
            const save = () => {
                setFormValues({ selectedQuiz: data });
                nextStep();
            };

            // // if score is 10/10, do not show recommendations screen
            // if (data?.overall_score >= 10) {
            //     // next level quiz is available, save data here to play quiz no next step
            //     if (data?.next_quiz_id?.length > 0) {
            //         save();
            //     } else {
            //         // next level quiz not available, redirect to courses page --- do not show recommendations ---
            //         push(createSlug(data?.slug));
            //     }
            //     return;
            // }
            // last quiz is completed, score is not 10, redirect to recommendations page
            if (
                data?.isQuizCompleted === true &&
                data?.last_completed_quiz?.length > 0
            ) {
                push(
                    `/recommendations/${data?.last_completed_quiz}?functionId=${data?.master_function_id}&skillId=${data.skill_id}`,
                );
                return;
            }
            // not a mandatory quiz, redirect to courses page
            if (data?.is_mandatory_quiz === false) {
                push(
                    `${createSlug(data?.slug)}?functionId=${
                        data?.master_function_id
                    }&skillId=${data.skill_id}`,
                );
                return;
            }
            // is a mandatory quiz, save data here to play quiz on next step
            save();
            // const payload = {
            //     id: formData?.selectedFunction?.insertionId,
            //     customer_id: auth?.user?.id,
            //     key: "skill_id",
            //     value: data.id,
            // };
            // const res = await performSaveUserChoiceMutation({ payload });
            // if (res?.data?.data?.status === "success") {
            //     setFormValues({
            //         skillId: data.id,
            //     });
            //     dispatch(
            //         setSkillRecommendation({
            //             id: data.id,
            //             name: data.skill_name,
            //             videoLink:
            //                 data.video_link?.[0]?.video_720p ||
            //                 data.video_link?.[0]?.video_1080p,
            //             description: data.skill_definition,
            //             thumbnailLink: data.thumbnail_link,
            //         }),
            //     );
            //     nextStep();
            // }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [auth, formData],
    );

    const handleTrackUserSkill = async (skillId, functionId) => {
        const payload = { skill_id: skillId, function_id: functionId };
        await trackEvent({ payload });
    };

    return (
        <div className={styles.step2Container}>
            {isLoading && <Loader isLoading={isLoading} />}
            <button type="button" className={styles.back} onClick={prevStep}>
                <Image src={BackIcon} alt="back" />
                <span>Back</span>
            </button>
            <div className={styles.onboardingStep}>
                <div className={styles.gridContent}>
                    <AnimatePresence>
                        <div className={styles.left}>
                            <motion.h2
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    transition: {
                                        duration: 0.7,
                                        delay: 0.05,
                                    },
                                }}
                            >
                                Pick a skill within {selectedFunction.name}
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
                                {selectedFunction.desc}
                            </motion.p>
                            <motion.div
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
                                className={styles.storyCard}
                            >
                                <img
                                    src={selectedFunction.videoThumbnail}
                                    alt=""
                                />
                                <div className={styles.playBtnWrapper}>
                                    <button
                                        type="button"
                                        onClick={() => setShowVideo(true)}
                                    >
                                        <Image src={ArrowRight} alt="" />
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </AnimatePresence>
                    <div className={styles.right}>
                        {quizData?.map((item, index) => (
                            <motion.button
                                key={`${item?.next_quiz_id} ${item?.last_completed_quiz} ${item?.unberryId} ${item?.domainId} ${item?.slug}`}
                                onClick={() => {
                                    if (item.skill_id && item.function_id) {
                                        handleTrackUserSkill(
                                            item.skill_id,
                                            item.function_id,
                                        );
                                    }
                                    setTimeout(() => {
                                        saveData(item);
                                    }, 750);
                                }}
                                type="button"
                            >
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transition: {
                                            delay: index * 0.1,
                                        },
                                    }}
                                    className={styles.skillCard}
                                >
                                    {item?.core_elective_skill ? (
                                        <div
                                            className={`${styles.skillTag} ${
                                                item?.core_elective_skill ===
                                                "Elective"
                                                    ? styles.electiveTag
                                                    : styles.coreTag
                                            }`}
                                        >
                                            {item?.core_elective_skill}
                                        </div>
                                    ) : null}
                                    <div>
                                        <h4>{item?.skill_name}</h4>
                                        <p className={styles.paragraph}>
                                            {item?.quizDescription}
                                        </p>
                                    </div>
                                    <Image
                                        className={styles.fold}
                                        src={BottomRightFold}
                                        alt=""
                                    />
                                    <div className={styles.images}>
                                        {item?.quizIcon && (
                                            <Image
                                                width={70}
                                                height={70}
                                                className={styles.penIcon}
                                                src={item?.quizIcon}
                                                alt="skill"
                                            />
                                        )}
                                        <Image
                                            className={styles.bag}
                                            src={SkillCardBagIllus}
                                            alt="bag"
                                        />
                                        <Image
                                            className={styles.bag}
                                            src={SkillCardBagIllus}
                                            alt="bag"
                                        />
                                        <Image
                                            className={styles.bag}
                                            src={SkillCardBagIllus}
                                            alt="bag"
                                        />
                                        <Image
                                            className={styles.bag}
                                            src={SkillCardBagIllus}
                                            alt="bag"
                                        />
                                        <Image
                                            className={styles.bag}
                                            src={SkillCardBagIllus}
                                            alt="bag"
                                        />
                                    </div>
                                </motion.div>
                            </motion.button>
                        ))}
                    </div>
                </div>
                {/* <HelpSection label="Take our Skill Assessment" /> */}
            </div>
            <AnimatePresence>
                {showVideo && (
                    <VideoPlayer
                        showVideo={showVideo}
                        title=""
                        subText=""
                        url={formData?.selectedFunction?.subjectVideoLink}
                        onClose={() => {
                            setShowVideo(false);
                        }}
                        autoPlay
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
