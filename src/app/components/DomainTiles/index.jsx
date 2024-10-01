import Image from "next/image";
import { useTrackEventMutation } from "services/tracking";
import { AnimatePresence, motion } from "framer-motion";
import DomainVid from "assets/images/domainDetail.png";
import Play from "assets/svgs/play_btn.svg";
import { Button } from "components/Button";
import SkillCardBagIllus from "assets/images/illusSkillCardBag.png";
import BottomRightFold from "assets/svgs/right_corner_right_arrow_icon.svg";
import React, { useState } from "react";
import styles from "./DomainTiles.module.scss";
import VideoPlayer from "../VideoPlayer";

export default function DomainTiles({
    onSelectItem = () => {
        console.log("function not found :: onSelectItem");
    },
    // domainId = null,
    thumbnailUrl,
    videoUrl,
    domainsData,
    domainTitle,
    domainInfo,
}) {
    const [trackEvent] = useTrackEventMutation();
    const [showVideo, setShowVideo] = useState(false);
    // const [swipeDown, setSwipeDown] = useState(false);

    const handleTrackUserSkill = async (skillId, functionId) => {
        const payload = { skill_id: skillId, function_id: functionId };
        await trackEvent({ payload });
    };

    return (
        <div className={styles.domains}>
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    flexDirection: "column",
                }}
            >
                <div className={styles.onboardingStep}>
                    <div className={styles.gridContent}>
                        <AnimatePresence>
                            <div className={styles.left}>
                                <motion.h1
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
                                    Pick a skill within{" "}
                                    {domainTitle && domainTitle}
                                </motion.h1>
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
                                    {domainInfo && domainInfo}
                                </motion.p>
                                <button
                                    className={styles.storyCard}
                                    type="button"
                                    onClick={() => setShowVideo(true)}
                                >
                                    <div className={styles.indicators}>
                                        <div className={styles.indicator} />
                                        <div className={styles.indicator} />
                                        <div className={styles.indicator} />
                                        <div className={styles.indicator} />
                                    </div>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={thumbnailUrl || DomainVid}
                                        alt="domain_vid_poster_icon"
                                    />
                                    <div className={styles.playBtnWrapper}>
                                        <div>
                                            <Image src={Play} alt="" />
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </AnimatePresence>
                        <div className={styles.right}>
                            <div className={styles.skillCardsHead}>
                                {domainsData?.length > 0 && (
                                    <h3 className={styles.heading}>
                                        {domainsData?.length}{" "}
                                        {
                                            // domainId === 20
                                            // ? `${
                                            //       domainsData?.length === 1
                                            //           ? "exam"
                                            //           : "exams"
                                            //   } `
                                            // :
                                            `${
                                                domainsData?.length === 1
                                                    ? "skill"
                                                    : "skills"
                                            } `
                                        }
                                        in this function
                                    </h3>
                                )}
                                {domainInfo && (
                                    <p className={styles.description}>
                                        {domainInfo}
                                    </p>
                                )}
                                {/* <div className={styles.description}>1/12</div> */}
                            </div>
                            {domainsData?.map((item, index) => (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (item.skill_id && item.function_id) {
                                            handleTrackUserSkill(
                                                item.skill_id,
                                                item.function_id,
                                            );
                                        }
                                        onSelectItem(item);
                                    }}
                                    id="card"
                                    className={styles.cardBtn}
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
                                        {item.core_elective_skill ? (
                                            <div
                                                className={`${
                                                    styles.skillTag
                                                } ${
                                                    item.core_elective_skill ===
                                                    "Elective"
                                                        ? styles.electiveTag
                                                        : styles.coreTag
                                                }`}
                                            >
                                                {item.core_elective_skill}
                                            </div>
                                        ) : null}
                                        <div>
                                            <h2>{item.skill_name}</h2>
                                            <p className={styles.paragraph}>
                                                {item.quizDescription}
                                            </p>
                                        </div>
                                        <Image
                                            className={styles.fold}
                                            src={BottomRightFold}
                                            alt=""
                                        />
                                        <div className={styles.images}>
                                            {item.quizIcon && (
                                                <Image
                                                    width={70}
                                                    height={70}
                                                    className={styles.penIcon}
                                                    src={item.quizIcon}
                                                    alt="skill"
                                                />
                                            )}
                                            <Image
                                                width={70}
                                                height={70}
                                                className={styles.bag}
                                                src={SkillCardBagIllus}
                                                alt="bag"
                                            />
                                            <Image
                                                width={70}
                                                height={70}
                                                className={styles.bag}
                                                src={SkillCardBagIllus}
                                                alt="bag"
                                            />
                                            <Image
                                                width={70}
                                                height={70}
                                                className={styles.bag}
                                                src={SkillCardBagIllus}
                                                alt="bag"
                                            />
                                            <Image
                                                width={70}
                                                height={70}
                                                className={styles.bag}
                                                src={SkillCardBagIllus}
                                                alt="bag"
                                            />
                                            <Image
                                                width={70}
                                                height={70}
                                                className={styles.bag}
                                                src={SkillCardBagIllus}
                                                alt="bag"
                                            />
                                        </div>
                                        <Button
                                            className={styles.cta}
                                            variant="primary"
                                            onClick={() => {}}
                                        >
                                            View Details
                                        </Button>
                                    </motion.div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                <VideoPlayer
                    title=""
                    subText=""
                    url={videoUrl}
                    onClose={() => {
                        setShowVideo(false);
                    }}
                    autoPlay
                    seoProps={{
                        thumbnailUrl,
                        videoName: domainTitle,
                        videoDescription: domainInfo,
                    }}
                    showVideo={showVideo}
                />
            </AnimatePresence>
        </div>
    );
}
