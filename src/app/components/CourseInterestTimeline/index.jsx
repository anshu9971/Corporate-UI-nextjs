"use client";

/* eslint-disable camelcase */

// import PhoneIcon from "assets/svgs/phone-icon.svg";
import Timer from "assets/svgs/Timer.svg";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "components/Button";
import BillingButton from "components/BillingButton";
import { useSelector } from "react-redux";
import { List } from "@mantine/core";
import { formatWithCurrency } from "utils/constants";
import { Timeline } from "../Timeline";
import styles from "./CourseInterestTimeline.module.scss";
import TimerComp from "./Timer";

export function CourseInterestTimeline({
    product = {},
    setIsLoading,
    onCreditClick,
    kycStatus,
    userInfo,
    // refetch = () => {},
}) {
    const auth = useSelector((state) => state.auth);
    const [timeElapsedMsg, setTimeElapsedMsg] = useState(false);
    const [messageToDisplay, setMessageToDisplay] = useState("");
    const activeObject = product?.user_journey?.find(
        ({ is_current_status }) => is_current_status,
    );

    const clapIcon =
        "https://wizr-cloudfront.s3.ap-south-1.amazonaws.com/assets/icons/dashboard/clap.png";

    const KYC_JOURNEY = [
        {
            id: 1,
            status: "KYC Initiated",
            label: "KYC Initiated",
            label_icon:
                "https://d7bvc5ocjh0yg.cloudfront.net/assets/icons/dashboard/phone-icon.svg",
            side_icon:
                "https://wizr-cloudfront.s3.ap-south-1.amazonaws.com/assets/icons/dashboard/Timer.svg",
            post_action_text: "KYC Initiated",
            is_payment_required: false,
            is_timer_required: false,
            is_current_status: kycStatus?.toLowerCase() === "kyc initiated",
        },
        {
            id: 2,
            status: "KYC Pending",
            label: "KYC Pending",
            label_icon:
                "https://d7bvc5ocjh0yg.cloudfront.net/assets/icons/dashboard/phone-icon.svg",
            side_icon:
                "https://wizr-cloudfront.s3.ap-south-1.amazonaws.com/assets/icons/dashboard/Timer.svg",
            post_action_text: "KYC Pending",
            is_payment_required: false,
            is_timer_required: false,
            is_current_status: kycStatus === "Pending",
        },
        {
            id: 8,
            status:
                kycStatus?.toUpperCase() === "REJECTED"
                    ? "KYC Rejected"
                    : "KYC Approved",
            label:
                kycStatus?.toUpperCase() === "REJECTED"
                    ? "KYC Rejected"
                    : "KYC Approved",
            label_icon:
                "https://wizr-cloudfront.s3.ap-south-1.amazonaws.com/assets/icons/dashboard/clap.png",
            side_icon:
                "https://wizr-cloudfront.s3.ap-south-1.amazonaws.com/assets/icons/dashboard/pymnt.png",
            post_action_text: "",
            is_payment_required: false,
            is_timer_required: false,
            is_current_status: ["APPROVED", "REJECTED"].includes(
                kycStatus?.toUpperCase(),
            ),
        },
    ];

    useEffect(() => {
        if ("timer_flag" in product) {
            if (product.timer_flag === 2) {
                setMessageToDisplay(
                    <>
                        Please call us at :{" "}
                        <a href="tel:022-41900000" className="telephone">
                            022-41900000
                        </a>{" "}
                        anytime between 9AM - 7PM ( Mon - Fri )
                    </>,
                );
            } else {
                setMessageToDisplay(
                    <>
                        We have been trying to reach you. Please call us at :{" "}
                        <a href="tel:022-41900000" className="telephone">
                            022-41900000
                        </a>
                    </>,
                );
            }
        }
    }, [product]);

    useEffect(() => {
        setTimeElapsedMsg(false);
    }, []);

    const renderActionButton = () => {
        const { user_status } = product;
        const options = {
            product,
            redirectTo: `${window.location.origin}${window.location.pathname}`,
        };
        let shouldRender = false;
        const orderCreatePayload = {
            customer_id: auth?.user?.id,
            cart_id: product?.id,
        };
        if (user_status === "Seat block payment Rs. 500 pending") {
            options.label = "Pay Booking Amount";
            shouldRender = true;
            orderCreatePayload.payment_type = "Booking fee Amount";
        }
        if (user_status === "Fee payment pending") {
            options.label = "Pay Now";
            shouldRender = true;
            orderCreatePayload.payment_type = "Full fee Amount";
        }
        return shouldRender ? (
            <BillingButton
                {...options}
                orderCreatePayload={orderCreatePayload}
                setIsLoading={setIsLoading}
                buttonClassName={styles.payButton}
            />
        ) : null;
    };

    // eslint-disable-next-line consistent-return
    const msgHead = useMemo(() => {
        if (activeObject?.is_timer_required) {
            if (!product.response_time || timeElapsedMsg) {
                return messageToDisplay;
            }
            return activeObject?.label;
        }
        return activeObject?.label;
    }, [activeObject, product, timeElapsedMsg, messageToDisplay]);

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 100,
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
                delay: 0.15,
            }}
            className={styles.courseInterestTimeline}
            key={product?.merchant_product_sfid}
        >
            <div className={styles.content}>
                <div className={styles.heading}>
                    <div>
                        {(activeObject?.label_icon || kycStatus) && (
                            <Image
                                src={activeObject?.label_icon || clapIcon}
                                alt="labelIcon"
                                width={50}
                                height={50}
                            />
                        )}
                        <div>
                            <h3
                            // style={
                            //     kycStatus && {
                            //         width: "250px",
                            //         marginBottom: "80px",
                            //         marginTop: "5px",
                            //     }
                            // }
                            >
                                {/* {((activeObject?.label === "Await our call" &&
                                    !product?.response_time) ||
                                    (timeElapsedMsg))
                                    ? messageToDisplay
                                    : activeObject.head} */}
                                {kycStatus
                                    ? "Thanks for starting your KYC journey!"
                                    : msgHead}
                            </h3>
                            {kycStatus ? (
                                <div>
                                    <List>
                                        <List.Item className={styles.list_item}>
                                            Check your personal email for a
                                            verification link.
                                        </List.Item>
                                        <List.Item className={styles.list_item}>
                                            Your WhatsApp has the mobile
                                            verification link.
                                        </List.Item>
                                        <List.Item className={styles.list_item}>
                                            After verification, you will receive
                                            the Video-KYC link.
                                        </List.Item>
                                    </List>
                                    <div
                                        className={styles.list_item}
                                        style={{ marginTop: "6px" }}
                                    >
                                        Keep your Aadhaar and PAN handy—these
                                        links are time-sensitive!
                                    </div>
                                </div>
                            ) : null}
                            <p>
                                {product?.product_name && product?.product_name}
                            </p>
                            {product?.min_emi_amount ? (
                                <p>
                                    Starting from{" "}
                                    {product?.min_emi_amount &&
                                        formatWithCurrency(
                                            product?.min_emi_amount,
                                            product?.currency_type,
                                        )}
                                    /month
                                </p>
                            ) : null}
                        </div>
                    </div>
                    {activeObject?.sideIcon && (
                        <Image
                            src={activeObject?.side_icon}
                            alt="phone"
                            className={styles.sideIcon}
                        />
                    )}

                    {activeObject?.is_timer_required &&
                        product?.timer_flag !== 2 &&
                        product?.response_time && (
                            <div
                                className={styles.timeSection}
                                id={product?.merchant_product_sfid}
                            >
                                <div className={styles.desc}>
                                    {" "}
                                    We are calling you in{" "}
                                </div>
                                <div className={styles.clock}>
                                    <Image src={Timer} alt="timer-img" />
                                </div>

                                <TimerComp
                                    responseTime={product.response_time}
                                    merchantSfid={product.merchant_product_sfid}
                                    setTimeElapsedMsg={setTimeElapsedMsg}
                                />
                            </div>
                        )}
                </div>
                <div className={styles.progressTimeline}>
                    {kycStatus ? (
                        <Timeline
                            status={kycStatus}
                            isKYCCard
                            elements={KYC_JOURNEY}
                        />
                    ) : (
                        <Timeline
                            status={
                                product?.user_status && product?.user_status
                            }
                            elements={product?.user_journey}
                        />
                    )}

                    {/* <Button
                        className={styles.cta}
                        variant="primary"
                        onClick={() => {}}
                    >
                        View Details
                    </Button> */}
                </div>
                {userInfo?.sanctioned_limit &&
                !userInfo?.kyc_status &&
                Number(product?.full_amount) > 10000 ? (
                    <div className={styles.footer}>
                        <div className={styles.row}>
                            <div>
                                <div>
                                    <p className={styles.footerHeading}>
                                        {userInfo?.first_name}, you have got a
                                        credit limit of{" "}
                                        {`₹${(
                                            userInfo.sanctioned_limit / 100000
                                        ).toFixed(2)}L`}
                                        !
                                    </p>
                                    <p>
                                        Exclusively for Aditya Birla Capital
                                        employees.
                                    </p>
                                </div>
                            </div>
                            <Button
                                className={styles.clickBtn}
                                variant="primary"
                                onClick={(e) => {
                                    e?.stopPropagation();
                                    onCreditClick(e);
                                }}
                            >
                                Be KYC ready
                            </Button>
                        </div>
                    </div>
                ) : null}
            </div>
            {renderActionButton()}
            {/* {kycStatus?.toLowerCase() === "kyc initiated" ? (
                <Button
                    onClick={(e) => {
                        refetch();
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    className={styles.kycCTA}
                    variant="primary"
                >
                    Refresh
                </Button>
            ) : null} */}
        </motion.div>
    );
}
