import React, { useEffect, useRef, useState } from "react";

// Components
// Styles
import "./index.scss";

// Assets
import cancel from "assets/svgs/cancel.svg";
import VolumeOn from "assets/svgs/volumeOn.svg";
import VolumeOff from "assets/svgs/volumeOff.svg";
import WizrLogo from "assets/svgs/wizrLogo.svg";
import NextButton from "assets/svgs/skip_forward_icon.svg";

// Libraries
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { isEmpty } from "lodash";
import { addOrUpdateScript } from "utils/helpers";
import PauseIcon from "../../assets/svgs/pauseIcon.svg";
import ArrowRight from "../../assets/svgs/PlayIcon.svg";

function VideoPlayer({
    url,
    onClose,
    autoPlay = false,
    title,
    subText,
    seoProps = null,
    showVideo = false,
}) {
    const video = useRef();
    const mouseMoveTriggered = useRef();
    const [currentTime, setCurrentTime] = useState("--:--:--");
    const [totalDuration, setTotalDuration] = useState("--:--:--");
    const [isLoading, setLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [fadeOutTimerRef, _setFadeOutTimerRef] = useState(null);
    const areControlsVisible = useRef(fadeOutTimerRef);
    const setFadeOutTimerRef = (v) => {
        _setFadeOutTimerRef(v);
        areControlsVisible.current = v;
    };
    const [isMuted, setIsMuted] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleControlsDisplay = () => {
        // eslint-disable-line react-hooks/exhaustive-deps
        const videoControls = document.querySelector(".videoControlsWrapper");
        if (videoControls) {
            videoControls.classList.remove("hide");
            if (fadeOutTimerRef) {
                clearTimeout(fadeOutTimerRef);
            }
            if (isPlaying && !isLoading) {
                const ref = setTimeout(() => {
                    videoControls.classList.add("hide");
                    setFadeOutTimerRef(null);
                }, 2000);
                setFadeOutTimerRef(ref);
            }
        }
    };

    const togglePlayback = (e, mode) => {
        e.stopPropagation();
        if (!mode) {
            video.current.play();
            setIsPlaying(true);
        } else {
            video.current.pause();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        if (!isEmpty(seoProps)) {
            const {
                videoName,
                videoDescription,
                thumbnailUrl,
                uploadDate = "2023-10-04",
            } = seoProps;
            const json = {
                "@context": "https://schema.org",
                "@type": "VideoObject",
                name: videoName,
                description: videoDescription,
                // duration: formatTimeInISO8601(video?.current?.duration),
                thumbnailUrl,
                uploadDate,
                contentUrl: url,
            };
            addOrUpdateScript(json, "video-ld-json");
        }
        return () => document?.getElementById("video-ld-json")?.remove();
    }, [seoProps, url]);
    /*
    const toggleFullscreen = (e) => {
        e.stopPropagation();
        const element = document.querySelector("#videoPlayerWrapper");
        const isFullscreen = element.classList.value.includes("fullscreen");
        if (isFullscreen) {
            element.classList.remove("fullscreen");
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        } else {
            element.classList.add("fullscreen");
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen(); // Firefox
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen(); // Chrome and Safari
            }
        }
    };
*/

    const toggleMute = (e) => {
        e.stopPropagation();
        video.current.muted = !video.current.muted;
        setIsMuted((prevState) => !prevState);
    };

    const formatTime = (timeInSec) => {
        const hours = Math.floor(timeInSec / (60 * 60));
        const minutes = Math.floor(timeInSec / 60 - hours * 60 * 60);
        const seconds = Math.floor(timeInSec - minutes * 60);
        return `${minutes > 9 ? minutes : `0${minutes}`}:${
            seconds > 9 ? seconds : `0${seconds}`
        }`;
    };

    const seek = (e) => {
        e.stopPropagation();
        const seekBar = document
            .querySelector("#videoProgressBar")
            .getBoundingClientRect();
        const left = e.pageX - seekBar.left;
        const totalWidth = seekBar.width;
        const percentage = left / totalWidth;
        const vidTime = video.current.duration * percentage;
        video.current.currentTime = vidTime;
    };

    useEffect(() => {
        handleControlsDisplay(); // eslint-disable-line no-use-before-define
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying, isLoading, showVideo]); // eslint-disable-line no-use-before-define
    useEffect(() => {
        const videoNode = video.current;
        if (videoNode) {
            const setSeekedState = () => {
                if (areControlsVisible.current === null) return; // prevent time state update when it's not visible
                const duration = video.current?.duration;
                const currentTime = video.current?.currentTime; // eslint-disable-line no-shadow
                const progress = (100 / duration) * currentTime;
                const durationInFormat = formatTime(duration);
                const currentTimeInFormat = formatTime(currentTime);

                const fillNode = document.querySelector("#videoFillBar");
                if (fillNode) {
                    fillNode.style.width = `${progress}%`;
                }
                setCurrentTime(currentTimeInFormat);
                setTotalDuration(durationInFormat);
            };

            videoNode.addEventListener("loadstart", () => setLoading(true));
            videoNode.addEventListener("seeking", () => setLoading(true)); // Video is seeking a new position
            videoNode.addEventListener("seeked", () => setLoading(false)); // Video found the playback position it was looking for
            videoNode.addEventListener("waiting", () => setLoading(true)); // Video is waiting for more data
            videoNode.addEventListener("playing", () => {
                setIsPlaying(true);
                setLoading(false);
            }); // Video is no longer paused
            videoNode.addEventListener("timeupdate", () => setSeekedState());
            videoNode.addEventListener("loadedmetadata", () =>
                video?.current?.duration
                    ? setTotalDuration(
                          setTotalDuration(
                              formatTime(video?.current?.duration),
                          ),
                      )
                    : null,
            );

            return () => {
                videoNode.removeEventListener("loadstart", () =>
                    setLoading(true),
                );
                videoNode.removeEventListener("seeking", () =>
                    setLoading(true),
                ); // Video is seeking a new position
                videoNode.removeEventListener("seeked", () =>
                    setLoading(false),
                ); // Video found the playback position it was looking for
                videoNode.removeEventListener("waiting", () =>
                    setLoading(true),
                ); // Video is waiting for more data
                videoNode.removeEventListener("playing", () => {
                    setIsPlaying(true);
                    setLoading(false);
                }); // Video is no longer paused
                videoNode.removeEventListener("timeupdate", () =>
                    setSeekedState(),
                );
                videoNode.removeEventListener("loadedmetadata", () =>
                    !!video?.current?.duration &&
                    !Number.isNaN(video?.current?.duration)
                        ? setTotalDuration(
                              setTotalDuration(
                                  formatTime(video?.current?.duration),
                              ),
                          )
                        : null,
                );
            };
        }
        return () => {};
    }, [showVideo]);
    // console.log("render");
    useEffect(() => {
        if (autoPlay) {
            if (showVideo) {
                video?.current?.play();
            } else {
                video?.current?.pause();
                video?.current?.load();
            }
        }
    }, [autoPlay, showVideo]);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
            className="video-player-div"
            onClick={(e) => e?.stopPropagation()}
            style={showVideo ? {} : { display: "none" }}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.45 }}
                exit={{ scale: 0 }}
                id="videoPlayerWrapper"
                onMouseMove={() => {
                    if (!mouseMoveTriggered.current) {
                        // debounce event
                        mouseMoveTriggered.current = true;
                        handleControlsDisplay();
                        setTimeout(() => {
                            mouseMoveTriggered.current = false;
                        }, 1900); // slightly less than timerRef timeout to prevent flicker
                    }
                }}
            >
                <video // eslint-disable-line jsx-a11y/media-has-caption
                    ref={video}
                    className="vid"
                    width="100%"
                    src={url}
                >
                    <p>Your browser doesn&apos;t support HTML5 video.</p>
                </video>
                <div className="videoControlsWrapper">
                    <button
                        type="button"
                        className="unstyledButton headerControls"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                    >
                        <Image src={cancel} alt="close" />
                    </button>
                    <div className="videoLoader">
                        {isLoading && <p>Loading</p>}
                    </div>

                    <div className="footerControls">
                        <div className="controls">
                            <div className="video-title">
                                <p>{title}</p>
                                <p>{subText}</p>
                            </div>
                            <div className="playback">
                                <AnimatePresence>
                                    {isPlaying &&
                                    currentTime !== totalDuration ? (
                                        <motion.button
                                            initial={{
                                                opacity: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                transition: {
                                                    duration: 0.4,
                                                },
                                            }}
                                            exit={{
                                                opacity: 0,
                                            }}
                                            type="button"
                                            onClick={(e) =>
                                                togglePlayback(e, true)
                                            }
                                            className="playBtnWrapper pause"
                                        >
                                            <div>
                                                <Image
                                                    className="pause"
                                                    src={PauseIcon}
                                                    alt=""
                                                />
                                            </div>
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            initial={{
                                                opacity: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                transition: {
                                                    duration: 0.4,
                                                },
                                            }}
                                            exit={{
                                                opacity: 0,
                                            }}
                                            type="button"
                                            onClick={(e) =>
                                                togglePlayback(e, false)
                                            }
                                            className="playBtnWrapper play"
                                        >
                                            <div>
                                                <Image
                                                    src={ArrowRight}
                                                    alt=""
                                                />
                                            </div>
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                        <button
                            type="button"
                            id="videoProgressBar"
                            style={{ cursor: "pointer" }}
                            onClick={seek}
                        >
                            <div style={{ height: "100%" }}>
                                <div id="videoFillBar" />
                            </div>
                        </button>
                        <div className="videoControls">
                            <p className="time" id="currentTime">
                                {currentTime}
                            </p>
                            <p className="time" id="totalTime">
                                {totalDuration !== "00:00:00"
                                    ? totalDuration
                                    : currentTime}
                            </p>
                        </div>
                    </div>
                    <div className="mobileControls">
                        <Image
                            className="skip-button"
                            src={NextButton}
                            alt="previous"
                        />
                        <AnimatePresence>
                            {isPlaying && currentTime !== totalDuration ? (
                                <motion.button
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transition: {
                                            duration: 0.4,
                                        },
                                    }}
                                    exit={{
                                        opacity: 0,
                                    }}
                                    type="button"
                                    onClick={(e) => togglePlayback(e, true)}
                                    className="playBtnWrapper pause"
                                >
                                    <div>
                                        <Image
                                            className="pause"
                                            src={PauseIcon}
                                            alt=""
                                        />
                                    </div>
                                </motion.button>
                            ) : (
                                <motion.button
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transition: {
                                            duration: 0.4,
                                        },
                                    }}
                                    exit={{
                                        opacity: 0,
                                    }}
                                    type="button"
                                    onClick={(e) => togglePlayback(e, false)}
                                    className="playBtnWrapper play"
                                >
                                    <div>
                                        <Image src={ArrowRight} alt="" />
                                    </div>
                                </motion.button>
                            )}
                        </AnimatePresence>
                        <Image
                            className="skip-button"
                            src={NextButton}
                            alt="next"
                        />
                    </div>
                    <Image
                        className="volume-btn"
                        src={isMuted ? VolumeOff : VolumeOn}
                        alt="volume"
                        onClick={toggleMute}
                    />
                    <div className="logo">
                        <Image src={WizrLogo} alt="wizr" />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default VideoPlayer;
