import MagGuy from "assets/images/expertise-discovery/magGuy.png";
import CertifiedIcon from "assets/svgs/certified-icon.svg";
import CurledArrow from "assets/svgs/curled-arrow.svg";
import { Button } from "components/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import Breadcrumbs from "components/Breadcrumbs";
import CertificatePreviewModal from "components/CertificatePreviewModal";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./QuizMainCover.module.scss";

const HIGHLIGHTS = [
    {
        label: "Pick a skill assessment",
        description: "",
    },
    {
        label: "Assess your fitment",
        description: "",
    },
    {
        label: (
            <>
                Review your results and start <br /> learning to bridge your
                skill-gap
            </>
        ),
        description: "",
    },
];

export default function QuizMainCover({ getStartedHandler, breadcrumbs = [] }) {
    const [showCertificate, setShowCertificate] = useState(false);
    const corporate = useSelector(({ global }) => global?.corporateData);
    const closeCertificatePreview = useCallback(() => {
        setShowCertificate(false);
    }, []);

    useEffect(() => {
        document?.querySelector("body")?.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.mainCover}>
            <div className={styles.content}>
                {breadcrumbs?.length > 0 && (
                    <Breadcrumbs items={breadcrumbs} withJsonLd />
                )}
                <div className={styles.foldWrapper}>
                    <div className={styles.leftFold}>
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
                            className={styles.title}
                        >
                            Start your upskilling journey by assessing your
                            skill fitment
                        </motion.p>
                        {/* <motion.p
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    duration: 0.3,
                                    delay: 0.1,
                                },
                            }}
                            className={styles.desc}
                        >
                            Skill Expertise Assessment will enable you to
                            understand your expertise level. It can assist you
                            in identifying gaps in learning and focus on areas
                            where you need more upskilling.
                        </motion.p> */}

                        <div className={styles.bulletPills}>
                            {HIGHLIGHTS.map((item, index) => (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transition: {
                                            duration: 0.5,
                                            delay: 0.1 + index * 0.09,
                                        },
                                    }}
                                    className=""
                                >
                                    <div>{index + 1}</div>
                                    <div>
                                        <h3>{item.label}</h3>
                                        {!!item.description && (
                                            <p>{item.description}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            className={styles.buttonContainer}
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
                            <Button
                                onClick={getStartedHandler}
                                variant="primary"
                                className={styles.webButton}
                            >
                                Get Started
                            </Button>
                        </motion.div>
                    </div>
                    <div className={styles.rightFold}>
                        <motion.div
                            style={{
                                transform: "rotate(9deg)",
                            }}
                            initial={{
                                opacity: 0,
                                y: 400,
                                rotate: "9deg",
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                type: "spring",
                                damping: 7,
                                mass: 0.5,
                                stiffness: 45,
                                duration: 0.2,
                            }}
                            className={styles.card}
                        >
                            <h3>Find what you are good at now!</h3>
                            <p>
                                Stay calm and focused. <br />
                                All the best!
                            </p>
                            <Image
                                src={MagGuy}
                                className={styles.freeberryClipped}
                            />
                        </motion.div>
                        <Button
                            onClick={getStartedHandler}
                            variant="primary"
                            className={styles.mobileButton}
                        >
                            Get Started
                        </Button>

                        <div className={styles.coursePreview}>
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        delay: 0.1,
                                        type: "spring",
                                        damping: 7,
                                        mass: 0.5,
                                        stiffness: 45,
                                        duration: 0.2,
                                    },
                                }}
                            >
                                <Image
                                    className={styles.curledArrow}
                                    src={CurledArrow}
                                    alt="curled"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: {
                                        duration: 0.4,
                                        delay: 0.1,
                                    },
                                }}
                                className={styles.courseCard}
                            >
                                <div>
                                    <div className={styles.certified}>
                                        <Image
                                            src={CertifiedIcon}
                                            alt="certified"
                                        />
                                        <p>WiZR Certified</p>
                                    </div>
                                    <h3 className={styles.certificateName}>
                                        Get a
                                        {corporate?.name?.length > 0
                                            ? ` ${corporate?.name} x `
                                            : ""}
                                        WiZR Certificate and Report on
                                        completion!
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowCertificate(true)}
                                    style={{ outline: "none" }}
                                >
                                    <Image
                                        width={1000}
                                        height={800}
                                        src={
                                            corporate?.sampleUrls
                                                ?.sample_skill_certificate
                                        }
                                        className={styles.certificateImage}
                                    />
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            <CertificatePreviewModal
                modalProps={{
                    opened: showCertificate,
                    onClose: closeCertificatePreview,
                    withCloseButton: false,
                }}
                // certificate={DUMMY_CERTIFICATE}
                certificateImage={
                    corporate?.sampleUrls?.sample_skill_certificate
                }
                showShareOptions={false}
            />
        </div>
    );
}
