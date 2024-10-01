import Image from "next/image";
// import PhoneIcon from "assets/svgs/phone-icon.svg";
// import Man from "assets/svgs/Man.svg";
// import Fee from "assets/svgs/Fee.svg";
// import Clap from "assets/svgs/image.png";
// import Profile from "assets/images/profile.png";
// import Pending from "assets/images/pending.png";
// import Seat from "assets/images/seatBlock.png";
// import Payment from "assets/images/pymnt.png";
import { useRef, useState } from "react";
import Info from "assets/svgs/Info.svg";
import { motion } from "framer-motion";
// import Zero from "assets/svgs/zero_cost_sticker.svg";
// import { Popover } from "@mantine/core";
import CloseIcon from "assets/svgs/close_icon.svg";
import CheckIcon from "assets/svgs/CheckFat.svg";
import ClockIcon from "assets/svgs/ClockIcon.svg";
import { useDisclosure } from "@mantine/hooks";
import { useOnClickOutside } from "utils/hooks/useOnClickOutside";
import Cancel from "assets/svgs/cancel_black.svg";
import styles from "./Timeline.module.scss";

export function Timeline({ elements = [], isKYCCard }) {
    const emiPopupRef = useRef(null);
    const activeObject = elements
        ?.map((el, index) => ({ ...el, index }))
        ?.find(({ is_current_status: current }) => current);

    const [showModal, setShowModal] = useState(false);

    const closeInfo = () => {
        setShowModal(false);
    };
    const [infoVisible, { close: hideInfo, open: showInfo }] =
        useDisclosure(false);
    useOnClickOutside(emiPopupRef, hideInfo);

    return (
        <>
            <div
                className={`${styles.TimelineContainer} ${
                    isKYCCard && styles.kycCardContainer
                }`}
            >
                {elements?.length > 0 &&
                    elements.map((item, index) => {
                        const completed = index < activeObject?.index;
                        const active = item?.is_current_status;
                        const turnDown = item?.status === "Profile turned down";
                        return (
                            <>
                                <div
                                    className={`${
                                        styles.timeSectionContainer
                                    } ${
                                        item?.is_current_status
                                            ? styles.activeContainer
                                            : ""
                                    }`}
                                    key={item.status}
                                >
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            transition: {
                                                duration: 0.3,
                                                delay: 0.7 + index * 0.4,
                                            },
                                        }}
                                        className={`${styles.timeSection} ${
                                            active ? styles.active : ""
                                        } ${
                                            completed ? styles.completed : ""
                                        } ${turnDown ? styles.turnDown : ""}`}
                                    >
                                        {completed && (
                                            <Image
                                                src={CheckIcon}
                                                alt="check"
                                            />
                                        )}
                                        {active && (
                                            <Image
                                                src={
                                                    turnDown
                                                        ? Cancel
                                                        : ClockIcon
                                                }
                                                alt="check"
                                            />
                                        )}
                                    </motion.div>
                                    <motion.p
                                        style={
                                            isKYCCard && { maxWidth: "60px" }
                                        }
                                        initial={{
                                            opacity: 0,
                                        }}
                                        animate={{
                                            opacity:
                                                active || completed ? 1 : 0.4,
                                            transition: {
                                                duration: 0.3,
                                                delay: 1 + index * 0.4,
                                            },
                                        }}
                                    >
                                        {completed
                                            ? item?.post_action_text
                                            : item.status}
                                        {item.status ===
                                            "Seat block payment Rs. 500 pending" && (
                                            <button
                                                onClick={() =>
                                                    setShowModal(true)
                                                }
                                                type="button"
                                                className={styles.btn}
                                            >
                                                <Image
                                                    src={Info}
                                                    alt="zzero_cost_emi_sticker"
                                                    ref={emiPopupRef}
                                                    className={styles.in}
                                                    onClick={() =>
                                                        infoVisible
                                                            ? hideInfo()
                                                            : showInfo()
                                                    }
                                                />
                                            </button>
                                        )}
                                    </motion.p>
                                </div>
                                <motion.div
                                    initial={{
                                        width: 0,
                                    }}
                                    animate={{
                                        width: "var(--width)",
                                        transition: {
                                            duration: 0.5,
                                            delay: 0.7 + index * 0.5,
                                        },
                                    }}
                                    className={styles.bar}
                                />
                            </>
                        );
                    })}
            </div>

            {showModal && (
                <div className={styles.infoContainer}>
                    <ol>
                        <li>
                            This ₹500/- will be adjusted against your course fee
                            on complete payment.
                        </li>
                        <li>
                            If you are approved for a loan this ₹500/- shall be
                            considered as down payment against the loan.
                        </li>
                        <li>
                            This Rs. 500/- will be refunded in case your
                            enrolment is rejected by the institute or your loan
                            request is rejected before course enrolment.
                        </li>
                        <li>
                            This Rs. 500/- will not be refunded in case you
                            cancel your enrolment after your admission is
                            confirmed.{" "}
                        </li>
                    </ol>
                    <button onClick={closeInfo} type="button">
                        <Image
                            src={CloseIcon}
                            className={styles.closeIcon}
                            alt="close"
                            width={16}
                            height={16}
                        />
                    </button>
                </div>
            )}
        </>
    );
}
