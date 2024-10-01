import Image from "next/image";
import Sparkle from "assets/svgs/sparkle_black.svg";
import { format } from "date-fns";
import { motion } from "framer-motion";
import ChevronRight from "assets/images/ChevronRight.svg";
import { useRouter } from "next/navigation";
import { Tooltip } from "@mantine/core";
import styles from "./AssessmentCard.module.scss";

export default function AssessmentCard({
    quizId,
    name,
    completedOn,
    fitScore,
    skillsAcquired,
    colorCode,
    calculatedLevel,
    nextLevel,
    sdId = null,
    onClickTakeNextLevel = () => {},
    functionId,
    skillId,
}) {
    const { push } = useRouter();
    const roundOffScore = fitScore.toFixed(1);
    // const nextLevelTexts = {
    //     Intermediate: "Take intr lvl test",
    //     Advanced: "Take adv lvl test",
    //     Advance: "Take adv lvl test",
    //     Beginner: "Take the test again",
    // };

    const getFunctionAndSkillParams = () => {
        if (functionId && skillId) {
            return `?functionId=${functionId}&skillId=${skillId}`;
        }
        if (sdId) {
            return "?";
        }

        return "";
    };

    return (
        <div className={styles.skillCard}>
            <div className={styles.cardHead}>
                <Tooltip label={name}>
                    <h2 className={styles.head}>{name ?? ""}</h2>
                </Tooltip>
                <p>{format(new Date(completedOn ?? null), "dd LLL yyyy")}</p>
            </div>
            <div className={styles.fitScore}>
                <div>
                    <motion.div
                        initial={{
                            width: 0,
                            backgroundColor: colorCode,
                        }}
                        animate={{
                            width: `${roundOffScore * 10}%`,
                        }}
                        transition={{
                            delay: 0.5,
                            duration: 1,
                            ease: "easeInOut",
                        }}
                        className={styles.progress}
                    />
                    <p style={{ display: "inline" }}>Fit Score</p>
                    <p style={{ display: "inline" }}> {roundOffScore}</p>
                    <p
                        style={{
                            position: "absolute",
                            right: "16px",
                            display: "inline",
                        }}
                    >
                        {calculatedLevel}
                    </p>
                </div>
            </div>
            <hr />
            <div className={styles.skills}>
                <div className={styles.title}>Skills acquired</div>
                <div className={styles.skillNames}>
                    {skillsAcquired.slice(0, 2).map((skill) => (
                        <Tooltip label={skill.name}>
                            <p key={skill.id}>{skill.name}</p>
                        </Tooltip>
                    ))}
                    {skillsAcquired.length > 2 && (
                        <Tooltip
                            label={skillsAcquired
                                ?.slice(2)
                                ?.map(({ name: n = "" } = {}) => n)
                                ?.join(",  ")}
                        >
                            <p>+{skillsAcquired.length - 2} more</p>
                        </Tooltip>
                    )}
                </div>
            </div>
            <div className={styles.ctaContainer}>
                {nextLevel?.length > 0 && (
                    <button
                        type="button"
                        className={`unstyledButton ${styles.takeNextLevel}`}
                        onClick={onClickTakeNextLevel}
                    >
                        <Image src={Sparkle} />
                        {/* {nextLevelTexts[nextLevel]} */}
                        {Number(roundOffScore) === 10
                            ? "Take next level test"
                            : "Take the test again"}
                        <Image
                            src={ChevronRight}
                            style={{
                                transform: "rotate(0deg)",
                                marginLeft: "4px",
                            }}
                        />
                    </button>
                )}
                <button
                    type="button"
                    className={`unstyledButton ${styles.viewReport}`}
                    onClick={() =>
                        push(
                            `/discover/expertise-discovery/report/${quizId}${getFunctionAndSkillParams()}${
                                sdId ? `?sd_id=${sdId}` : ""
                            }`,
                        )
                    }
                    onKeyDown={() =>
                        push(
                            `/discover/expertise-discovery/report/${quizId}${getFunctionAndSkillParams()}${
                                sdId ? `?sd_id=${sdId}` : ""
                            }`,
                        )
                    }
                >
                    View full report{" "}
                    <Image
                        src={ChevronRight}
                        style={{ transform: "rotate(0deg)", marginLeft: "4px" }}
                    />
                </button>
            </div>
        </div>
    );
}
