/* eslint-disable consistent-return */
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import Modal from "components/Modal";
import Logo from "assets/svgs/wizrLogo.svg";
// import CloseIcon from "assets/svgs/close_icon.svg";
import EditIcon from "assets/svgs/edit_icon.svg";
import Image from "next/image";
import { motion } from "framer-motion";
// import { useGenerateOtpMutation, useValidateOtpMutation } from "services/login";
import {
    useB2BMobileOtpMutation,
    useLoginMutation,
    useValidateB2BMobileOtpMutation,
    useValidateEmailOtpMutation,
} from "services/microsite/auth";
import { PhoneNumberInput } from "components/PhoneInput";
import { useDispatch, useSelector } from "react-redux";
import {
    setIsPhoneVerified,
    setToken,
    setUserData,
} from "redux/store/authSlice";
import { storage } from "services/storage";
import { HelpReachOut } from "components/HelpReachOut";
import { TextInput } from "components/TextInput";
// import { PhoneNumberInput } from "../PhoneInput";
import { Button } from "../Button";
import { OtpInput } from "../OtpInput";
import styles from "./LoginModal.module.scss";
import TestimonialCard from "../TestimonialCard";
import ResendTimer from "../ResendTimer";
import { Error } from "../Error";

// import { PRIVACY_POLICY_LINK, TC_LINK } from "../../utils/constants";

export function LoginModal({
    onLoginSuccess = () => {},
    isVisible,
    // closeModal,
    modalClassName = "",
    contentClassName = "",
    testimonials,
    fromHeader,
}) {
    const [performLoginMutation] = useLoginMutation();
    const [performValidateOtpMutation] = useValidateEmailOtpMutation();
    const [B2BMobileOtp] = useB2BMobileOtpMutation();
    const [validateB2BMobileOtp] = useValidateB2BMobileOtpMutation();

    const timerRef = useRef(null);
    // const [phone, setPhone] = useState({
    //     value: null,
    //     formattedValue: "",
    // });
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const appConfig = useSelector((state) => state.config);
    const corporate = useSelector(({ global }) => global?.corporateData);
    const isLoggedIn = useMemo(() => !!auth.token, [auth]);
    const [showPhoneInput, setShowPhoneInput] = useState(false);
    const [phoneOtpSent, setPhoneOtpSent] = useState(false);
    const [phone, setPhone] = useState({
        value: null,
        formattedValue: "",
    });
    const [error, setError] = useState("");

    const sendPhoneOtp = async (_, oldNumber) => {
        if (!oldNumber) {
            if (!phone.value && phone.value === null) {
                return setError("Please enter a phone number");
            }
        }

        const phoneNumber = oldNumber || phone.value.slice(2);
        const res = await B2BMobileOtp({
            mobile: phoneNumber,
            is_live:
                process.env.NEXT_PUBLIC_ENV === "production" ? 1 : undefined,
        });
        if (res?.data?.data?.status === "success") {
            setError("");
            setPhoneOtpSent(true);
            requestAnimationFrame(() => {
                timerRef?.current?.setTimer(30);
            });
        } else if (res?.error) {
            setError(res?.error?.data?.message || "Something went wrong!");

            if (oldNumber) {
                setPhoneOtpSent(false);
            }
        }
    };

    useEffect(() => {
        // if already logged in, then open the profile modal
        if (isVisible && isLoggedIn && auth.user && auth.isPhoneVerified) {
            onLoginSuccess(auth.user?.profile_completed);
        }

        // If LoggedIn And phone number is not verified
        if (!auth.isPhoneVerified && auth.user && isLoggedIn && !phoneOtpSent) {
            setShowPhoneInput(true);
            if (auth.user?.mobile) {
                setPhoneOtpSent((prev) => {
                    if (!prev) {
                        sendPhoneOtp(undefined, auth.user?.mobile);
                    }
                    return true;
                });
                setPhone({
                    value: `91${auth.user?.mobile}`,
                    formattedValue: `+91 ${auth.user?.mobile}`,
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, auth, onLoginSuccess, isVisible]);

    const sendOtp = useCallback(async () => {
        if (!email) {
            return setError("Please enter your email");
        }
        const res = await performLoginMutation({
            email,
        });
        if (res?.data?.data?.status === "success") {
            setError("");
            const data = res?.data?.data?.data;
            if (
                data?.login_type === "sso" &&
                data?.ssoApplicable === true &&
                data?.ssoUrl?.length > 0
            ) {
                window?.open(data?.ssoUrl, "_self");
            } else {
                setOtpSent(true);
                requestAnimationFrame(() => {
                    timerRef?.current?.setTimer(30);
                });
            }
        } else if (res?.error) {
            setError(
                res?.error?.data?.errors?.email ||
                    res?.error?.data?.error ||
                    res?.error?.data?.message ||
                    "Something went wrong!",
            );
        }
    }, [email, timerRef, performLoginMutation]);
    const resetModalState = useCallback(() => {
        setOtp("");
        setEmail("");
        setError("");
        setOtpSent(false);
    }, []);

    const verifyOtp = useCallback(async () => {
        const res = await performValidateOtpMutation({
            ...auth?.utm_params,
            ...(appConfig?.insertionId
                ? { interest_id: appConfig.insertionId }
                : {}),
            email,
            otp: parseInt(otp, 10),
        });
        if (res?.data?.data?.status === "success") {
            setError("");
            const data = res?.data?.data?.data;
            setTimeout(() => resetModalState(), 100);
            dispatch(
                setUserData({ ...data.user, id: data?.user?.customer_id }),
            );
            const authToken = data?.tokens?.accessToken?.token;
            dispatch(setToken(authToken));
            storage.set.authToken(authToken);
            const isProfileComplete = data?.user?.profile_completed;
            onLoginSuccess(isProfileComplete);
        } else if (res?.error) {
            setError(res?.error?.data?.message || "Something went wrong!");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        auth?.utm_params,
        email,
        otp,
        fromHeader,
        onLoginSuccess,
        dispatch,
        performValidateOtpMutation,
        // startOnboardingProcess,
        resetModalState,
    ]);

    const verifyPhoneOtp = async () => {
        const mobile = phone.value.slice(2);
        const res = await validateB2BMobileOtp({ mobile, otp });
        if (res?.data?.data?.status === "success") {
            dispatch(setIsPhoneVerified());
        } else if (res?.error) {
            setError(res?.error?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div>
            <Modal
                className={`${styles.loginModal} ${modalClassName}`}
                opened={isVisible}
                withCloseButton={false}
                centered
                onClose={() => {}}
                size="80vw"
                transitionProps={{ transition: "slide-up", duration: 250 }}
                lockScroll={false}
            >
                <div className={`${styles.loginContent} ${contentClassName}`}>
                    <div className={styles.header}>
                        <Image
                            className={styles.wizrIcon}
                            src={corporate?.combine_static_logo ?? Logo}
                            height={100}
                            width={300}
                            alt="WiZR"
                        />
                        {/* <Image
                            onClick={() => {
                                closeModal();
                                resetModalState();
                            }}
                            className={styles.icon}
                            src={CloseIcon}
                            alt="close"
                        /> */}
                        {/* {otpSent && (
                            <Image
                                onClick={() => {
                                    setOtpSent(false);
                                    setError("");
                                    setOtp("");
                                }}
                                className={styles.icon}
                                src={BackIcon}
                                alt="back"
                            />
                        )} */}
                        {/* {phoneOtpSent && (
                            <Image
                                onClick={() => {
                                    setPhoneOtpSent(false);
                                    setError("");
                                    setOtp("");
                                }}
                                className={styles.icon}
                                src={BackIcon}
                                alt="back"
                            />
                        )} */}
                    </div>
                    <div>
                        <div className={styles.left}>
                            <div className={styles.tag}>Contact Details</div>
                            <div className={styles.content}>
                                {!otpSent && !phoneOtpSent ? (
                                    <div className={styles.contentWrapper}>
                                        <div>
                                            {showPhoneInput ? (
                                                <p>Verify your phone number</p>
                                            ) : (
                                                <p>Let’s get you started!</p>
                                            )}
                                            <p>
                                                First we need your{" "}
                                                {showPhoneInput
                                                    ? "contact"
                                                    : "account"}{" "}
                                                information.
                                            </p>

                                            {showPhoneInput ? (
                                                <PhoneNumberInput
                                                    className={
                                                        styles.phoneInput
                                                    }
                                                    onChange={(
                                                        value,
                                                        _,
                                                        __,
                                                        formattedValue,
                                                    ) => {
                                                        setError(
                                                            value !== "91"
                                                                ? ""
                                                                : "Please enter a phone number",
                                                        );
                                                        setPhone({
                                                            value,
                                                            formattedValue,
                                                        });
                                                    }}
                                                    value={phone.value}
                                                    placeholder="Phone Number"
                                                    onEnterKeyPress={
                                                        sendPhoneOtp
                                                    }
                                                />
                                            ) : (
                                                <TextInput
                                                    className={
                                                        styles.emailInput
                                                    }
                                                    onChange={(e) => {
                                                        const val =
                                                            e?.target?.value;
                                                        setError(
                                                            val !== ""
                                                                ? ""
                                                                : "Please enter your email",
                                                        );
                                                        setEmail(
                                                            e?.target?.value,
                                                        );
                                                    }}
                                                    value={email}
                                                    placeholder="ronald.weasley@abc.in"
                                                    onKeyDown={(e) => {
                                                        if (
                                                            [
                                                                e.code,
                                                                e.key,
                                                            ].includes("Enter")
                                                        ) {
                                                            sendOtp();
                                                        }
                                                    }}
                                                />
                                            )}

                                            <Error message={error} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.contentWrapper}>
                                        <div>
                                            <p>We’ve sent you an OTP</p>
                                            <p
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {phoneOtpSent
                                                    ? "On your phone number "
                                                    : "On your email address "}

                                                <button
                                                    className={styles.editPhone}
                                                    type="button"
                                                    onClick={() => {
                                                        setError("");
                                                        setOtpSent(false);
                                                        setPhoneOtpSent(false);
                                                        setOtp("");
                                                    }}
                                                >
                                                    <span>
                                                        {phoneOtpSent
                                                            ? phone?.formattedValue
                                                            : email}
                                                    </span>
                                                    <Image
                                                        src={EditIcon}
                                                        alt="edit"
                                                    />
                                                </button>
                                            </p>
                                            <div>
                                                <form
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        if (phoneOtpSent) {
                                                            verifyPhoneOtp();
                                                        } else {
                                                            verifyOtp();
                                                        }
                                                    }}
                                                >
                                                    <OtpInput
                                                        shouldAutoFocus
                                                        onChange={setOtp}
                                                        value={otp}
                                                        renderInput={(
                                                            { type, ...props },
                                                            index,
                                                        ) => (
                                                            <motion.input
                                                                type="number"
                                                                pattern="[0-9]"
                                                                inputMode="decimal"
                                                                initial={{
                                                                    opacity: 0,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    transition:
                                                                        {
                                                                            delay:
                                                                                index *
                                                                                0.08,
                                                                        },
                                                                }}
                                                                {...props}
                                                            />
                                                        )}
                                                    />
                                                    {/* OtpInput does not support onenter & onKeyDown, this is a hack to handle onenter event */}
                                                    <button
                                                        type="submit"
                                                        style={{
                                                            display: "none",
                                                        }}
                                                    >
                                                        {" "}
                                                    </button>
                                                </form>
                                            </div>
                                            {showPhoneInput ? (
                                                <ResendTimer
                                                    ref={timerRef}
                                                    onResend={() =>
                                                        setOtp("") ||
                                                        sendPhoneOtp()
                                                    }
                                                />
                                            ) : (
                                                <ResendTimer
                                                    ref={timerRef}
                                                    onResend={() =>
                                                        setOtp("") || sendOtp()
                                                    }
                                                />
                                            )}

                                            <Error message={error} />
                                        </div>
                                    </div>
                                )}
                                {showPhoneInput ? (
                                    <Button
                                        className={styles.otpCta}
                                        onClick={
                                            phoneOtpSent
                                                ? verifyPhoneOtp
                                                : sendPhoneOtp
                                        }
                                        variant="primary"
                                        style={{
                                            padding: "0 30px",
                                        }}
                                    >
                                        {!phoneOtpSent
                                            ? "Continue"
                                            : "Verify OTP"}
                                    </Button>
                                ) : (
                                    <Button
                                        className={styles.otpCta}
                                        onClick={otpSent ? verifyOtp : sendOtp}
                                        variant="primary"
                                        style={{
                                            padding: "0 30px",
                                        }}
                                    >
                                        {!otpSent ? "Continue" : "Verify OTP"}
                                    </Button>
                                )}

                                {showPhoneInput ? (
                                    <div className={styles.tnc}>
                                        <span>
                                            By entering the OTP and clicking
                                            continue I confirm that I have read,
                                            understood and agree with the{" "}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    window.open(
                                                        "/terms-and-conditions",
                                                        "_blank",
                                                    );
                                                }}
                                            >
                                                <span className={styles.bold}>
                                                    Terms and Conditions
                                                </span>
                                            </button>{" "}
                                            and{" "}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    window.open(
                                                        "/privacy-policy",
                                                        "_blank",
                                                    );
                                                }}
                                            >
                                                <span className={styles.bold}>
                                                    Privacy Policy.
                                                </span>
                                            </button>
                                        </span>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className={styles.right}>
                            {/* <Image src={BackgroundIllus} /> */}
                            <TestimonialCard
                                {...testimonials[
                                    otpSent ? "otpScreen" : "phoneNumberScreen"
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <HelpReachOut />
            </Modal>
        </div>
    );
}
