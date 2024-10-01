import Image from "next/image";
import SkillMesh from "assets/images/skillMesh.png";
import Keyboard from "assets/images/keyboard.png";
import ArrowDown from "assets/svgs/arrow-down.svg";
import CloseIcon from "assets/svgs/close_icon.svg";
import { Button } from "components/Button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./QuizCover.module.scss";

export default function QuizCover({ quizData, startQuizHandler, onClose }) {
    const [showViewMore, setShowViewMore] = useState(false);

    useEffect(() => {
        const pageHeight = document.getElementById("container")?.offsetHeight;
        if (pageHeight > window.innerHeight) {
            setShowViewMore(true);
        }
        const wrapper = document.getElementById("wrapper");
        const onScroll = () => {
            if (pageHeight - (wrapper.scrollTop + wrapper.offsetHeight) <= 40) {
                setShowViewMore(false);
            } else {
                setShowViewMore(true);
            }
        };
        wrapper.addEventListener("scroll", onScroll);
        return () => wrapper.removeEventListener("scroll", onScroll);
    }, [quizData]);

    const handlePageDown = () => {
        const pageHeight = document.getElementById("container")?.offsetHeight;
        const divElement = document.getElementById("wrapper");
        divElement.scroll({
            top: pageHeight,
            behavior: "smooth",
        });
        setShowViewMore(false);
    };
    const isMsdemo = useSelector(
        ({ global }) => global?.corporateData?.isMsdemo,
    );

    const quizLevel = isMsdemo
        ? ""
        : quizData?.quizLevels?.find(
              ({ id } = {}) => id === quizData?.next_quiz_id,
          )?.name ??
          quizData?.currentLevel ??
          "";

    const getActiveTraits = () => {
        if (quizData?.excludedTraits?.length) {
            let allTraits = quizData?.traits ?? [];
            quizData?.excludedTraits?.forEach((el) => {
                allTraits = allTraits?.filter((trait) => trait?.id !== el?.id);
            });
            return allTraits;
        }
        return quizData?.traits;
    };

    return (
        <div id="wrapper" className={styles.quizCoverWrapper}>
            <Image
                className={styles.closeIcon}
                onClick={onClose}
                src={CloseIcon}
                alt="close"
            />
            <div id="container" className={styles.quizContainer}>
                <div className={styles.quizHeader}>
                    <div className={styles.heading}>
                        <motion.h1
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    duration: 0.3,
                                },
                            }}
                        >
                            {quizData?.skill_name} {quizLevel?.toUpperCase()}
                        </motion.h1>
                        <motion.p
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    duration: 0.3,
                                },
                            }}
                        >
                            {quizData?.quizDescription}
                        </motion.p>
                        {/* <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    duration: 0.3,
                                },
                            }}
                            className={styles.timeContainer}
                        >

                            <div>
                                <p>Time</p>
                                <p>
                                    {((quizData?.timer || 0) / 60).toFixed(0)}
                                    <span>min</span>
                                </p>
                            </div>
                        </motion.div> */}
                        <Button
                            className={styles.cta}
                            variant="primary"
                            onClick={startQuizHandler}
                        >
                            Continue
                        </Button>
                    </div>
                    <div className={styles.meshBackground}>
                        <Image
                            className={styles.backgroundImg}
                            src={SkillMesh}
                            alt="skillMesh"
                            width={550}
                            height={450}
                        />
                        <Image
                            className={styles.keyboard}
                            src={Keyboard}
                            alt="skill"
                            width={350}
                            height={450}
                        />
                    </div>
                </div>
                {quizData?.traits?.length > 0 && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                            },
                        }}
                        className={styles.content}
                    >
                        <h1>What you will be tested upon</h1>
                        <div className={styles.traitsContainer}>
                            {getActiveTraits()?.map(({ name, id }) => (
                                <div key={id} className={styles.traitBox}>
                                    {name}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
                {showViewMore && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                            },
                        }}
                        className={styles.footer}
                    >
                        <Button
                            className={styles.cta}
                            variant="primary"
                            onClick={handlePageDown}
                        >
                            View More
                            <Image
                                src={ArrowDown}
                                alt="arrow"
                                width={25}
                                height={25}
                            />
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
