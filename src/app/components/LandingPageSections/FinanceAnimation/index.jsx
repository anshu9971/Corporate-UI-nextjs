// import Percentage from "assets/svgs/percentage.svg";
// import ShoppingCart from "assets/svgs/shoppingCart.svg";
// import WizrCred from "assets/svgs/wizrCredLogo.svg";
import Sparkle from "assets/svgs/sparkle.svg";
import Lightning from "assets/svgs/lightning.svg";
// import Info from "assets/svgs/info-white.svg";
// import Laptop from "assets/svgs/laptop.svg";
// import FingerSnap from "assets/svgs/fingerSnap.svg";
// import ShoppingCart from "assets/svgs/shoppingCart.svg";
import { Button } from "components/Button";
import { Text } from "components/Text";
// import { Tooltip } from "@mantine/core";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import FetchCreditModal from "components/FetchCreditModal";
import { useSelector } from "react-redux";
import { useReadUserQuery } from "services/readUser";
import { ShareViaEmailModal } from "discover/career-discovery/report/ShareViaEmailModal";
import { notifications } from "@mantine/notifications";
import {
    useCreateFinanceLeadMutation,
    useSavePersonalEmailMutation,
} from "services/users";
import { ViewCreditLimitFinanceCard } from "./components/ViewCreditLimitCard/ViewCreditLimitCard";
import styles from "./index.module.scss";

const CARD_DATA = [
    {
        label: `Credit Line`,
        classLabel: `No Cost EMI`,
        heading: `Access your exclusive credit limit as an Aditya Birla Capital Employee!`,
        description: `Unlock financial flexibility and convenience with a credit line - get access to funds whenever you need them!`,
        buttonLabel: `Check Now`,
        // pathToPage: "/finance",
        // wizrCredLogo: WizrCred,
        firstBox: {
            icon: Lightning,
            title: "Enroll in a course to avail No-cost EMI",
        },
        // secondBox: {
        //     // icon: FingerSnap,
        //     label: "Avail upto",
        //     title: "₹ 4,03L",
        // },
    },
    // {
    //     label: ``,
    //     classLabel: `No Cost EMI`,
    //     heading: `Know your \nCredit Line`,
    //     description: `Unlock financial flexibility and convenience with a credit line - get access to funds whenever you need them!`,
    //     buttonLabel: `Explore Courses`,
    //     pathToPage: "/collections/no-cost-emi-courses",
    //     firstBox: {
    //         icon: Percentage,
    //         title: "Instant Credit Line",
    //     },
    //     secondBox: {
    //         label: "No. of Courses",
    //         // title: "₹ 4,03L",
    //         title: "5000+",
    //     },
    // },

    // {
    //     label: `Marketplace`,
    //     classLabel: `Marketplace`,
    //     heading: `Explore our \nproduct Marketplace`,
    //     description: `Explore our marketplace for laptops, EVs & more buy now with your credit line and elevate your productivity!`,
    //     buttonLabel: `Coming Soon`,
    //     disabled: true,
    //     firstBox: {
    //         icon: Laptop,
    //         title: "Buy gadgets with credit line",
    //     },
    //     secondBox: {
    //         icon: ShoppingCart,
    //         label: "Available products",
    //         title: "20K+ ",
    //     },
    // },
];

export function FinanceAnimation() {
    const ref = useRef(null);
    const isInView = useInView(ref);
    const [showModal, setShowModal] = useState(false);
    const [savePersonalEmail] = useSavePersonalEmailMutation();
    const [createFinanceLead] = useCreateFinanceLeadMutation();
    const [shareViaEmailModalProps, setShareViaEmailModalProps] = useState({
        visible: false,
        successMessage: "",
    });

    const user = useSelector(({ auth }) => auth.user);
    const { data: readUserRes, isLoading } = useReadUserQuery(
        {
            userId: user?.id,
        },
        {
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
            skip: !user?.id,
        },
    );

    let isMobile = false;
    if (typeof window !== "undefined") {
        isMobile = window.innerWidth < 1280;
    }

    const getClassName = (label) => {
        const className = label
            .split(" ")
            .reduce(
                (acc, word, index) =>
                    acc + (index === 0 ? word.toLowerCase() : word),
                "",
            );
        return className;
    };
    const { push } = useRouter();
    const handleCardClick = (nextCardNumber) => {
        const financeSnapSection = document.querySelector(".snap-section-3");
        const currentCardNumber = parseInt(
            financeSnapSection.getAttribute("data-subsnap-number") ?? 1,
            10,
        );

        if (currentCardNumber === nextCardNumber) {
            return;
        }

        // Card is already opended
        if (currentCardNumber > nextCardNumber) {
            for (let i = nextCardNumber + 1; i <= 3; i += 1) {
                const card = document.querySelector(`.finance-card-${i}`);

                const nextPositionState = isMobile
                    ? {
                          top: "100%",
                      }
                    : {
                          left: card.clientWidth - 90 * (4 - i),
                      };
                gsap.to(card, {
                    ...nextPositionState,
                    duration: 0.4,
                    ease: "back.out(0.7)",
                });
            }
        }

        // Card is in collapsed state
        if (currentCardNumber < nextCardNumber) {
            for (let i = currentCardNumber + 1; i <= nextCardNumber; i += 1) {
                const card = document.querySelector(`.finance-card-${i}`);
                if (!card) {
                    break;
                }

                const nextPositionState = isMobile
                    ? {
                          top: 50 * (i - 1),
                      }
                    : {
                          left: 90 * (i - 1),
                      };
                gsap.to(card, {
                    ...nextPositionState,
                    duration: 0.4,
                    ease: "power4.out",
                });
            }
        }

        financeSnapSection.setAttribute("data-subsnap-number", nextCardNumber);
    };
    // const handleCTA = ({ pathToPage, action = () => {} }) => {
    //     if (pathToPage) {
    //         action();
    //         push(pathToPage);
    //     }
    // };

    const handleCheckCreditLimit = () => {
        if (
            !readUserRes?.data?.data?.sanctioned_limit &&
            !readUserRes?.data?.data?.kyc_status
        ) {
            push("/start-skilling");
            return;
        }

        setShareViaEmailModalProps({
            visible: true,
            successMessage: "",
            heading: "",
            skipSkillLevelText: true,
        });
    };

    const handleModalClose = () => {
        setShowModal(false);
        push("/dashboard");
    };

    const getKYCButtonText = (kycStatus) => {
        if (!kycStatus) return "Be KYC Ready";
        if (kycStatus?.toLowerCase() === "kyc initiated")
            return "KYC Initiated";
        if (kycStatus?.toLowerCase() === "pending") return "KYC Pending";
        if (kycStatus?.toUpperCase() === "APPROVED") return "KYC Approved";
        return "KYC Rejected";
    };

    const getCtaButtonLabel = () => {
        if (isLoading) return "";
        if (
            !readUserRes?.data?.data?.sanctioned_limit &&
            !readUserRes?.data?.data?.kyc_status
        )
            return "Start Skilling";
        if (readUserRes?.data?.data?.kyc_status)
            return getKYCButtonText(readUserRes?.data?.data?.kyc_status);
        return "Be KYC Ready";
    };

    const shareModalCloseHandler = () =>
        setShareViaEmailModalProps({ visible: false });

    const shareBtnHandler = async ({ emails, otp }) => {
        const res = await savePersonalEmail({
            email: emails,
            otp: Number(otp),
        });

        if (res?.data?.data?.status === "success") {
            const response = await createFinanceLead({
                firstName: readUserRes?.data?.data?.first_name,
                lastName: readUserRes?.data?.data?.last_name,
                mobileNo: readUserRes?.data?.data?.mobile,
                email: emails,
            });

            if (response?.data?.data?.status === "success") {
                localStorage.removeItem("activeProduct");
                push("/dashboard");
            } else if (response?.error?.data?.message) {
                notifications.show({
                    id: "shareViaEmailNotif-2",
                    withCloseButton: true,
                    autoClose: 5000,
                    title: "Error!",
                    message: response?.error?.data?.message,
                    color: "red",
                    loading: false,
                });
            }
        }

        if (res?.error?.data?.message) {
            notifications.show({
                id: "shareViaEmailNotif-error",
                withCloseButton: true,
                autoClose: 5000,
                title: "Error!",
                message: res?.error?.data?.message,
                color: "red",
                loading: false,
            });
        }
        return false;
    };

    return (
        <div className={styles.financeAnimation} ref={ref}>
            {CARD_DATA.map((card, index) => (
                // Todo: @vineet Handle these eslint issues by providing proper handler and role
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                <motion.div
                    key={card.label}
                    className={`${styles.card} ${
                        styles[getClassName(card.classLabel)]
                    } finance-card-${index + 1}`}
                    onClick={() => handleCardClick(index + 1)}
                    animate={
                        index === 0 && !isMobile
                            ? {
                                  x: isInView ? 0 : "70%",
                                  transition: {
                                      duration: 0.45,
                                  },
                              }
                            : {}
                    }
                >
                    {/* <h4 className={styles.label}>
                        {index < 10 ? `0${index + 1}` : index + 1} {card.label}
                    </h4> */}
                    {!!card.img && <Image src={card.img} alt="" />}

                    <div className={styles.headingContainer}>
                        {/* <Text text={card.heading} /> */}

                        <p className={styles.heading}>
                            Access your exclusive credit limit as an Aditya
                            Birla Capital Employee!
                            {/* <sup>
                                <Tooltip
                                    label={
                                        <p style={{ color: "black" }}>
                                            WiZR or its subsidiaries/affiliates
                                            or Lending Partners or agents shall
                                            obtain your credit score from credit
                                            bureaus and may share such
                                            information with WiZR or third
                                            parties for purposes of determining
                                            loan eligibility or such other
                                            purposes as deemed appropriate.
                                        </p>
                                    }
                                    position="top-end"
                                    arrowOffset={30}
                                    arrowSize={10}
                                    withArrow={!isMobile}
                                    radius={10}
                                    multiline
                                    width={300}
                                    events={{
                                        hover: true,
                                        focus: true,
                                        touch: true,
                                    }}
                                >
                                    <Image
                                        className={styles.inlineInfo}
                                        src={Info}
                                        alt="info"
                                    />
                                </Tooltip>
                            </sup> */}
                        </p>
                    </div>

                    {!readUserRes?.data?.data?.sanctioned_limit &&
                    !readUserRes?.data?.data?.kyc_status ? (
                        <Text
                            className={styles.description}
                            text="Enroll in a course to avail No-cost EMI"
                        />
                    ) : (
                        <p className={styles.des2} />
                    )}

                    <Button
                        variant="primary"
                        widthStyle="long"
                        onClick={() => handleCheckCreditLimit(card)}
                        disabled={readUserRes?.data?.data?.kyc_status}
                    >
                        {getCtaButtonLabel()}
                    </Button>
                    <div className={styles.bgBox}>
                        {card.wizrCredLogo && (
                            <Image
                                src={card.wizrCredLogo}
                                className={styles.wizrCredLogo}
                            />
                        )}
                        {readUserRes?.data?.data?.sanctioned_limit ? (
                            <div className={`${styles.sanctionLimit}`}>
                                <ViewCreditLimitFinanceCard
                                    reduceSize
                                    creditLimit={
                                        readUserRes?.data?.data
                                            ?.sanctioned_limit
                                    }
                                />
                            </div>
                        ) : // <div className={styles.firstBox}>
                        //     <div>
                        //         <Image src={card.firstBox.icon} alt="" />
                        //         <h5>{card.firstBox.title}</h5>
                        //     </div>
                        // </div>
                        null}

                        {/* <div className={styles.secondBox}>
                            <div>
                                {!!card.secondBox.icon && (
                                    <Image src={card.secondBox.icon} alt="" />
                                )}
                                <h5>{card.secondBox.title}</h5>
                            </div>
                            <p>{card.secondBox.label}</p>
                        </div> */}
                        <div className={styles.sparkleBall}>
                            <Image src={Sparkle} alt="" />
                        </div>
                    </div>
                </motion.div>
            ))}
            {showModal && (
                <FetchCreditModal show={showModal} onClose={handleModalClose} />
            )}
            <ShareViaEmailModal
                {...shareViaEmailModalProps}
                onShare={shareBtnHandler}
                onClose={shareModalCloseHandler}
                isKYCVerificationModal
                personalEmail={readUserRes?.data?.data?.personal_email}
            />
        </div>
    );
}
