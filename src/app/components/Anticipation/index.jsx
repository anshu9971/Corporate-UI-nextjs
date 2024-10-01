/* eslint-disable @next/next/no-img-element */

import Play from "assets/svgs/play_btn.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import isEmpty from "lodash/isEmpty";
import VideoPlayer from "../VideoPlayer";
import styles from "./Anticipation.module.scss";
import AnticipationSalaryCard from "./AnticipationSalaryCard";
import AnticipationJobCard from "./AnticipationJobCard";

export default function Anticipation({ skillObj = {}, className = "" }) {
    const [showVideo, setShowVideo] = useState(false);
    const appConfig = useSelector((state) => state.config);

    if (isEmpty(skillObj)) return null;
    const thumbnailLink =
        skillObj.thumbnail_link || appConfig.skillReco?.thumbnailLink;
    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.left}>
                <div className={styles.content}>
                    <h1>{skillObj.skill_name || appConfig.skillReco?.name}</h1>
                    <p>
                        {skillObj.skill_definition ||
                            appConfig.skillReco?.description}
                    </p>
                </div>
                <div className={styles.cardParent}>
                    <AnticipationSalaryCard skillObj={skillObj} />
                    <AnticipationJobCard skillObj={skillObj} />

                    {(skillObj.thumbnail_link ||
                        appConfig.skillReco?.thumbnailLink) && (
                        <div className={styles.rightMobile}>
                            <button
                                type="button"
                                onClick={() => setShowVideo(true)}
                                className={styles.playBtn}
                            >
                                <Image
                                    // className={styles.testimonialMobile}
                                    src={Play}
                                    alt="play-btn"
                                />
                            </button>

                            <img
                                className={styles.testimonialImg}
                                src={thumbnailLink}
                                alt="anticipation"
                            />
                        </div>
                    )}
                </div>
            </div>
            {(skillObj.thumbnail_link ||
                appConfig.skillReco?.thumbnailLink) && (
                <div className={styles.right}>
                    <button
                        type="button"
                        onClick={() => setShowVideo(true)}
                        className={styles.playBtn}
                    >
                        <Image
                            // className={styles.testimonialMobile}
                            src={Play}
                            alt="play-btn"
                        />
                    </button>

                    <img
                        className={styles.testimonialImg}
                        src={thumbnailLink}
                        alt="anticipation"
                    />
                </div>
            )}
            <AnimatePresence>
                <VideoPlayer
                    showVideo={showVideo}
                    title=""
                    subText=""
                    url={
                        skillObj.video_link?.[0]?.video_720p ||
                        skillObj.video_link?.[0]?.video_1080p ||
                        appConfig.skillReco?.videoLink
                    }
                    onClose={() => {
                        setShowVideo(false);
                    }}
                    autoPlay
                    seoProps={{
                        thumbnailUrl: thumbnailLink,
                        videoName: skillObj?.skill_name,
                        videoDescription:
                            skillObj?.skill_description ||
                            appConfig?.skillReco?.description,
                    }}
                />
            </AnimatePresence>
        </div>
    );
}
