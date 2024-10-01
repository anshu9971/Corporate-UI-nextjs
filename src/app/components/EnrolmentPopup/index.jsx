import React, {
    useEffect,
    // useMemo,
    useState,
} from "react";
import Image from "next/image";
import { Button } from "components/Button";
import { Timeline } from "components/Timeline";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
// import { useUpdateCustomerDetailsMutation } from "services/enrollment";
import { useForm } from "react-hook-form";
// import GreenTick from "assets/svgs/green_bg_tick.svg";
import Close from "assets/svgs/close_icon.svg";
// import Wallet from "assets/svgs/wallet.svg";
// import payEMI from "assets/svgs/payEmi.svg";
// import Pencil from "assets/svgs/PencilSimple.svg";
import PayEmi from "assets/svgs/payEmi.svg";
import HandWaving from "assets/svgs/HandWaving.svg";
import discountIcon from "assets/svgs/discount.svg";
import discountIconBlack from "assets/svgs/discount_black.svg";
import Pill from "components/Pill";
import {
    // EXPERIENCE_DROPDOWN_OPTIONS,
    // QUALIFICATION_DROPDOWN_VALUES,
    formatWithCurrency,
} from "utils/constants";
// import ControlledDropdown from "components/ControlledDropDown";
import { useVerifyPincodeMutation } from "services/onboarding";
import BillingButton from "components/BillingButton";
// import { useEmailVerificationTokenMutation } from "services/login";
import { useReadUserQuery } from "services/readUser";
import { setUserData } from "redux/store/authSlice";
// import MapPin from "../../assets/svgs/mapPin.svg";
import FetchCreditModal from "components/FetchCreditModal";
import styles from "./EnrolmentPopup.module.scss";

export default function EnrolmentPopup({
    providerLogo,
    // status,
    product,
    errorMessage,
    // setErrorMessage,
    setShowPopup,
    minAviEmi,
    loanAmount,
    offerPrice,
    discountRate,
    noCostEmiAvailable,
    lowCostEmiAvailable,
    currency,
    priceOnRequest,
    enrollmentData,
    productDetails,
    journeyType,
    setIsLoading = () => {},
    pSfid,
}) {
    const auth = useSelector((state) => state.auth);
    // const [isEmailSent, setIsEmailSent] = useState(false);
    // const [sendEmail] = useEmailVerificationTokenMutation();
    const [showModal, setShowModal] = useState(false);
    const format = (amount) => formatWithCurrency(amount, currency);
    const { push } = useRouter();
    // const [performUpdateCustomerDetails] = useUpdateCustomerDetailsMutation();
    const [, setCustomerObj] = useState({});
    // const [location, setLocation] = useState({});

    const user = useSelector((state) => state.auth.user);
    // const token = useSelector((state) => state.auth.token);
    // const isLoggedIn = useMemo(() => !!token, [token]);
    const [performVerifyPincodeMutation] = useVerifyPincodeMutation();
    // const [_ , setData] = useState({});
    const dispatch = useDispatch();
    const { data: readUserRes } = useReadUserQuery(
        {
            userId: user?.id,
        },
        {
            refetchOnMountOrArgChange: true,
            refetchOnReconnect: true,
            refetchOnFocus: true,
            skip: !user?.id,
        },
    );
    useEffect(() => {
        // setData(readUserRes?.data ?? {});
        localStorage.setItem("activeProduct", pSfid);
        dispatch(
            setUserData({
                first_name: readUserRes?.data?.data?.first_name,
                last_name: readUserRes?.data?.data?.last_name,
            }),
        );
    }, [readUserRes, dispatch]);

    // const handleVerifyEmail = async () => {
    //     const { data } = await sendEmail({
    //         payload: { customer_id: auth?.user?.id },
    //     });
    //     if (data?.data?.status?.toLowerCase() === "success") {
    //         setIsEmailSent(true);
    //     }
    // };

    // check if logged in or not
    // const checkIfUserLoggedIn = () => isLoggedIn;

    // proceed to enroll
    // const updateCustomer = async (newObj) => {
    //     if (!checkIfUserLoggedIn()) return null;
    //     const res = await performUpdateCustomerDetails({
    //         payload: newObj,
    //     });
    //     let isSuccess = false;
    //     if (res?.data?.data?.status === "success") {
    //         isSuccess = true;
    //     }
    //     if (res?.error) {
    //         setErrorMessage(res?.error?.data?.message);
    //         isSuccess = false;
    //     }
    //     return isSuccess;
    // };

    // const updateCustomerForm = (obj) => {
    //     const newObj = {
    //         ...obj,
    //         first_name: obj.name.split(" ")[0]
    //             ? obj.name.split(" ")[0]
    //             : obj.name,
    //         last_name: obj.name.split(" ")[1] ? obj.name.split(" ")[1] : "",
    //         customer_id: user.id,
    //     };

    //     delete newObj.name;
    //     return updateCustomer(newObj);
    // };

    const {
        watch,
        getValues,
        // setValue,
        setError,
        clearErrors,
        //  formState
    } = useForm();

    const { pincode } = getValues();

    // function errorOrLabel(key, label) {
    //     return (
    //         <span className={errors?.[key] ? styles.error : ""}>
    //             {errors?.[key] ? errors?.[key]?.message : label}
    //             {key === "pincode" && !errors?.[key] ? (
    //                 <Image
    //                     src={Pencil || ""}
    //                     alt="pencil_icon"
    //                     width={14}
    //                     height={14}
    //                     placeholder="empty"
    //                     className={styles.pencil}
    //                 />
    //             ) : null}
    //         </span>
    //     );
    // }

    useEffect(() => {
        // setCustomerObj({});
        const subscription = watch((value) => {
            if (value) {
                setCustomerObj(value);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        if (errorMessage) {
            const msg = document.querySelector("#errorMessage");
            msg.style.opacity = 1;
            setTimeout(() => {
                msg.style.opacity = 0;
            }, 1500);
        }
    }, [errorMessage]);

    useEffect(() => {
        (async () => {
            if (pincode?.length === 6) {
                const res = await performVerifyPincodeMutation({
                    payload: { pincode },
                });
                if (res?.data?.data?.city) {
                    clearErrors("pincode");
                    // setLocation(res.data?.data);
                } else {
                    setError(
                        "pincode",
                        { message: "Invalid pincode" },
                        { shouldFocus: true },
                    );
                }
            } else if (pincode?.length === 0) {
                setError(
                    "pincode",
                    { message: "Pincode is required" },
                    { shouldFocus: true },
                );
                //  setLocation(null);
            }
            //  else {
            //     if (pincode?.length > 0) {
            //         setError(
            //             "pincode",
            //             { message: "Invalid pincode" },
            //             { shouldFocus: false },
            //         );
            //     }
            //    // setLocation(null);
            // }
        })();
        // eslint-disable-next-line  react-hooks/exhaustive-deps
    }, [performVerifyPincodeMutation, pincode]);

    useEffect(() => {
        if (journeyType && journeyType !== "Direct Full Payment") {
            setTimeout(() => {
                push("/dashboard");
            }, 5000);
        }
    }, [journeyType]);

    // const updateCustomerDetails = async () => {
    //     const res = await updateCustomerForm(getValues());
    //     return res;
    // };

    const onContinueClick = async () => {
        push("/dashboard");
    };

    const handleCheckCreditLimit = () => {
        if (readUserRes?.data?.data?.is_fresh_limit_allow_to_fetch === "no") {
            push("/dashboard");
        } else {
            setShowModal(true);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        push("/dashboard");
    };

    const showFinanceCard = () =>
        readUserRes?.data?.data?.is_fresh_limit_allow_to_fetch === "yesssss";

    return (
        <section className={styles.enrolmentPopupContainer}>
            <div className={styles.enrolmentBody}>
                <div className={styles.productCol}>
                    <div className={styles.message}>
                        <Image src={HandWaving} width={32} height={32} />
                        <div>
                            <h1 className={styles.text}>
                                Thanks for showing interest!
                            </h1>
                            <h1 className={styles.text}>
                                Here are the details of the course.
                            </h1>
                        </div>
                    </div>
                    <div className={styles.course}>
                        {/* <Image src={HandWaving} width={32} height={32} /> */}
                        <div className={styles.billingBtnContainer}>
                            <Image
                                src={providerLogo || ""}
                                alt="provider_logo"
                                width={180}
                                height={40}
                                placeholder="empty"
                                className={styles.providerLoGo}
                            />
                            {
                                journeyType === "Direct Full Payment" ? (
                                    <BillingButton
                                        label="Make Payment"
                                        product={productDetails}
                                        orderCreatePayload={{
                                            customer_id: auth?.user?.id,
                                            cart_id: enrollmentData?.id,
                                            payment_type: "Full fee Amount",
                                        }}
                                        setIsLoading={setIsLoading}
                                        buttonClassName={styles.continueCta}
                                        buttonProps={{
                                            variant: "primary",
                                            widthStyle: "long",
                                            style: {
                                                padding: "0 30px",
                                                width: "142px !important",
                                            },
                                        }}
                                        // asyncActionBeforePayment={
                                        //     updateCustomerDetails
                                        // }
                                        redirectTo={`${window?.location.origin}/dashboard`}
                                    />
                                ) : null
                                // (
                                //     <Button
                                //         className={styles.continueCta}
                                //         variant="primary"
                                //         widthStyle="long"
                                //         style={{
                                //             padding: "0 30px",
                                //             width: "142px !important",
                                //         }}
                                //         onClick={onContinueClick}
                                //     >
                                //         Visit Dashboard
                                //     </Button>
                                // )
                            }
                        </div>
                        <h2 className={styles.courseName}>
                            {product && product}
                        </h2>

                        {priceOnRequest ? (
                            <p>Price on request</p>
                        ) : (
                            <div className={styles.pricing}>
                                {minAviEmi && (
                                    <div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <p
                                                className={styles.priceKey}
                                                style={{
                                                    minWidth: "max-content",
                                                }}
                                            >
                                                EMI Starts at
                                            </p>
                                            <p
                                                style={{
                                                    minWidth: "max-content",
                                                }}
                                            >
                                                {format(minAviEmi)}
                                                /mth
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <div>
                                        <p
                                            className={styles.priceKey}
                                            style={{ minWidth: "max-content" }}
                                        >
                                            Total Cost
                                        </p>
                                        {discountRate &&
                                            offerPrice < loanAmount && (
                                                <span
                                                    className={
                                                        styles.discountRate
                                                    }
                                                    style={{
                                                        minWidth: "max-content",
                                                    }}
                                                >
                                                    &nbsp;
                                                    {discountRate}
                                                    {discountRate
                                                        ? "% off"
                                                        : ""}
                                                </span>
                                            )}
                                    </div>
                                    <div>
                                        {offerPrice &&
                                            offerPrice < loanAmount && (
                                                <p
                                                    className={styles.oldPrice}
                                                    style={{
                                                        minWidth: "max-content",
                                                    }}
                                                >
                                                    {format(loanAmount)}
                                                    /-
                                                </p>
                                            )}
                                        &nbsp;
                                        <p style={{ minWidth: "max-content" }}>
                                            {format(offerPrice)}
                                        </p>
                                    </div>
                                </div>
                                {noCostEmiAvailable ? (
                                    <Pill
                                        backgroundColor="#CBFB62"
                                        className={styles.discountPill}
                                        title={
                                            <>
                                                <Image
                                                    src={discountIcon}
                                                    alt="discount"
                                                />
                                                <span>No-cost EMI</span>
                                            </>
                                        }
                                    />
                                ) : (
                                    lowCostEmiAvailable && (
                                        <Pill
                                            backgroundColor="#A198AC"
                                            className={styles.discountPill}
                                            title={
                                                <>
                                                    <Image
                                                        src={discountIconBlack}
                                                        alt="discount"
                                                    />
                                                    <span>Low Cost EMI</span>
                                                </>
                                            }
                                        />
                                    )
                                )}
                            </div>
                        )}
                    </div>
                    <div
                        className={styles.journey}
                        // style={{ position: "relative", left: "68px" }}
                    >
                        <Timeline elements={enrollmentData?.user_journey} />
                    </div>
                    {errorMessage?.length > 0 && (
                        <div className={styles.erMessage} id="errorMessage">
                            {errorMessage}
                        </div>
                    )}
                    {showFinanceCard() ? (
                        <div className={styles.creditLimitContainer}>
                            <div>
                                <p className={styles.cardTitle}>
                                    Finance all your upskilling needs with Wizr
                                </p>
                                <div className={styles.checkCreditBtn}>
                                    <Button
                                        variant="primary"
                                        widthStyle="long"
                                        style={{
                                            padding: "0 30px",
                                        }}
                                        onClick={handleCheckCreditLimit}
                                    >
                                        Check your credit limit
                                    </Button>
                                    <div className={styles.applyNowWrapper}>
                                        <Image src={PayEmi} alt="line" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
                {/* <div className={styles.personalDetailsCol}>
                    <div className={styles.personalDetails}>
                        <h3 className={styles.head}>Personal Details</h3>
                        {userData?.data?.mobile && userData?.data?.pincode && (
                            <form onSubmit={handleSubmit(updateCustomerForm)}>
                                <div className={styles.formElement}>
                                    <label htmlFor="name">
                                        NAME{" "}
                                        <Image
                                            src={Pencil || ""}
                                            alt="pencil_icon"
                                            width={14}
                                            height={14}
                                            placeholder="empty"
                                            className={styles.pencil}
                                        />
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            defaultValue={
                                                userData?.data?.first_name &&
                                                userData?.data?.first_name
                                                    .concat(" ")
                                                    .concat(
                                                        userData?.data
                                                            ?.last_name,
                                                    )
                                            }
                                            // disabled
                                            {...register("name", {
                                                required: true,
                                            })}
                                        />
                                        {errors.name &&
                                            errors.name.type === "required" && (
                                                <span
                                                    className={
                                                        styles.errorMessage
                                                    }
                                                >
                                                    This field is required
                                                </span>
                                            )}
                                    </label>
                                </div>
                                <div className={styles.formElement}>
                                    <label htmlFor="email">
                                        EMAIL{" "}
                                        <Image
                                            src={Pencil || ""}
                                            alt="pencil_icon"
                                            width={14}
                                            height={14}
                                            placeholder="empty"
                                            className={styles.pencil}
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            defaultValue={userData?.data?.email}
                                            // disabled
                                            {...register("email", {
                                                required: true,
                                            })}
                                        />
                                        {errors.email &&
                                            errors.email.type ===
                                                "required" && (
                                                <span
                                                    className={
                                                        styles.errorMessage
                                                    }
                                                >
                                                    This field is required
                                                </span>
                                            )}
                                    </label>
                                    {userData?.data?.is_email_verified ===
                                        0 && (
                                        <p className={styles.emailVerif}>
                                            {!isEmailSent && (
                                                <span className={styles.text}>
                                                    Email Verification Pending
                                                </span>
                                            )}
                                            {!isEmailSent && (
                                                <button
                                                    type="button"
                                                    className={`unstyledButton ${styles.cta}`}
                                                    onClick={handleVerifyEmail}
                                                >
                                                    VERIFY NOW
                                                </button>
                                            )}
                                            {isEmailSent && (
                                                <span className={styles.sent}>
                                                    <Image src={GreenTick} />
                                                    Check your inbox for
                                                    verification link.
                                                </span>
                                            )}
                                        </p>
                                    )}
                                </div>
                                <div className={styles.formElement}>
                                    <label htmlFor="mobile">
                                        PHONE NUMBER{" "}
                                        <input
                                            type="text"
                                            name="mobile"
                                            defaultValue={
                                                userData?.data?.mobile &&
                                                userData?.data?.mobile
                                            }
                                            className={styles.phoneInput}
                                            readOnly
                                            {...register("mobile", {
                                                required: true,
                                            })}
                                        />{" "}
                                    </label>
                                </div>
                                <div className={styles.formElement}>
                                    <label htmlFor="pincode">
                                        {errorOrLabel("pincode", "PINCODE")}
                                        <input
                                            type="number"
                                            id="pincode"
                                            name="pincode"
                                            defaultValue={
                                                userData?.data?.pincode &&
                                                userData?.data?.pincode
                                            }
                                            placeholder="000000"
                                            className={styles.pincodeInput}
                                            {...register("pincode", {
                                                required: true,
                                                onChange: (e) =>
                                                    setValue(
                                                        "pincode",
                                                        e?.target?.value?.slice(
                                                            0,
                                                            6,
                                                        ),
                                                    ),
                                            })}
                                        />
                                        {dirtyFields?.pincode &&
                                            location?.city?.length > 0 && (
                                                <p style={{ marginTop: 5 }}>
                                                    <Image
                                                        src={MapPin}
                                                        alt="pin"
                                                    />
                                                    {location.city},{" "}
                                                    {location.state}
                                                </p>
                                            )}
                                    </label>
                                </div>
                                <div className={styles.formElement}>
                                    <label htmlFor="qualification">
                                        HIGHEST QUALIFICATION{" "}
                                        <Image
                                            src={Pencil || ""}
                                            alt="pencil_icon"
                                            width={14}
                                            height={14}
                                            placeholder="empty"
                                            className={styles.pencil}
                                        />
                                        <ControlledDropdown
                                            control={control}
                                            id="qualification"
                                            name="qualification"
                                            defaultValue={
                                                userData?.data?.qualification
                                            }
                                            dropdownClassName={
                                                styles.qualification
                                            }
                                            placeholder="Select your qualification"
                                            options={
                                                QUALIFICATION_DROPDOWN_VALUES
                                            }
                                        />
                                    </label>
                                </div>
                                {userData?.data?.profession !== "Student" && (
                                    <div
                                        className={`${styles.formElement} ${styles.experienceContainer}`}
                                    >
                                        <label htmlFor="experience">
                                            WORK EXPERIENCE{" "}
                                            <Image
                                                src={Pencil || ""}
                                                alt="pencil_icon"
                                                width={14}
                                                height={14}
                                                placeholder="empty"
                                                className={styles.pencil}
                                            />
                                            <ControlledDropdown
                                                control={control}
                                                name="experience"
                                                defaultValue={
                                                    userData?.data?.experience
                                                }
                                                id="experience"
                                                // disabled
                                                dropdownClassName={
                                                    styles.experience
                                                }
                                                placeholder="Select your qualification"
                                                options={
                                                    EXPERIENCE_DROPDOWN_OPTIONS
                                                }
                                            />
                                        </label>
                                    </div>
                                )}
                                <input
                                    type="submit"
                                    id="submitbtn"
                                    style={{ display: "none" }}
                                />
                            </form>
                        )}
                    </div>
                </div> */}
                {journeyType === "Direct Full Payment" ? (
                    <button
                        onClick={() => setShowPopup(false)}
                        type="button"
                        className={styles.cancelCta}
                    >
                        <Image
                            src={Close}
                            alt="cancel_icon"
                            width={25}
                            height={25}
                            onClick={() => setShowPopup(false)}
                        />
                    </button>
                ) : null}
            </div>

            <div className={styles.continueResponsive}>
                <div className={styles.costing}>
                    <div className={styles.cost}>Total Cost</div>
                    <div className={styles.price}>{format(offerPrice)}</div>
                </div>
                {journeyType === "Direct Full Payment" ? (
                    <BillingButton
                        label="Make Payment"
                        product={productDetails}
                        orderCreatePayload={{
                            customer_id: auth?.user?.id,
                            cart_id: enrollmentData?.id,
                            payment_type: "Full fee Amount",
                        }}
                        setIsLoading={setIsLoading}
                        buttonClassName={styles.respContinueCta}
                        buttonProps={{
                            variant: "primary",
                            widthStyle: "long",
                            style: {
                                padding: "0 40px",
                                width: "142px !important",
                            },
                        }}
                        // asyncActionBeforePayment={updateCustomerDetails}
                        redirectTo={`${window?.location.origin}/dashboard`}
                    />
                ) : (
                    <Button
                        className={styles.respContinueCta}
                        variant="primary"
                        widthStyle="long"
                        style={{
                            padding: "0 40px",
                        }}
                        onClick={onContinueClick}
                    >
                        Visit Dashboard
                    </Button>
                )}
            </div>
            {showModal && (
                <FetchCreditModal show={showModal} onClose={handleModalClose} />
            )}
        </section>
    );
}
