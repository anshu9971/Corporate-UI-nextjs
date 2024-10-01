"use client";

import Image from "next/image";
import cancel from "assets/svgs/cancel.svg";
// import {  motion } from "framer-motion";
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactPlayer from "react-player";
// import PauseIcon from "../../assets/svgs/pauseIcon.svg";
import styles from "./IframePLayer.module.scss";

export default function IframePlayer(ifParams) {
    const { ytsource, setvideo, video } = ifParams;

    // On closing video player
    function onClose() {
        setvideo(false);
    }

    if (video) {
        return (
            <div className={styles.iframeplayerContainer}>
                {/* <iframe
                    width="860"
                    height="515"
                    src="https://www.youtube.com/watch?v=W8uEstDRVCw"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                /> */}

                <ReactPlayer
                    url={ytsource}
                    playing
                    // muted
                    volume={1}
                    width="100%"
                    height="100%"
                    progressInterval={1000}
                    playsinline
                    // fallback={() => {}}
                    // playIcon
                    config={{
                        youtube: {
                            playerVars: { showinfo: 1 },
                        },
                        facebook: {
                            appId: "12345",
                        },
                    }}
                />

                <div className={styles.headerControls}>
                    <Image
                        src={cancel}
                        alt="close"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                    />
                </div>
            </div>
        );
    }
}
