/* eslint-disable no-nested-ternary */
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FreeCourseIcon from "assets/svgs/freeCourseIcon.svg";
import Like from "assets/svgs/like_icon.svg";
import NoCOSTEMI from "assets/svgs/no-cost-emi.svg";
import Tick from "assets/svgs/tick.svg";
import Zero from "assets/svgs/zero_cost_sticker.svg";
import Low from "assets/svgs/low_cost_sticker.svg";
import Faq from "assets/svgs/faq.svg";
import Info from "assets/svgs/Info.svg";
import Smiley from "assets/svgs/smiley_icon.svg";
import Language from "assets/svgs/language_icon.svg";
import Eligibility from "assets/svgs/eligibility_icon.svg";
import Learning from "assets/svgs/learning_icon.svg";
import Placement from "assets/svgs/placement_icon.svg";
import Chevron from "assets/svgs/Chevron.svg";
// import Delivery from "assets/svgs/delivery_icon.svg";
import UdemyCourseBundleCard from "components/UdemyCard/UdemyCard";
import CloseIcon from "assets/svgs/close_icon.svg";
import EnrolmentPopup from "components/EnrolmentPopup";
import { useDispatch, useSelector } from "react-redux";
import { useGetDashboardQuery } from "services/dashboard";
import { useSetUserFlagMutation } from "services/users";
import { RegistrationModal } from "components/RegistrationModal";
import { Button } from "components/Button";
import Rating from "components/Rating";
import { formatWithCurrency } from "utils/constants";
import { useOnClickOutside } from "utils/hooks/useOnClickOutside";
import { AnimatePresence, motion } from "framer-motion";
import { Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { setUserData } from "redux/store/authSlice";
import { createSlug } from "utils/helpers";
import { useEnrollForCourseMutation } from "services/enrollment";
import styles from "./EnrolmentCard.module.scss";
import { Loader } from "../Loader";

export default function EnrolmentCard({
    productDetails = {},
    hideCta = false,
}) {
    const {
        offer_price: offerPrice,
        loan_amount: loanAmount,
        discount_rate: discountRate,
        discount_amount: discountAmount,
        price_on_request: priceOnRequest,
        min_avi_emi: minAviEmi,
        offer_price: totalCost,
        scholarship: scholarshipAvailable,
        placement_assistance: placementAsst,
        // course_delivery_mode: courseDeliveryMode,
        medium_of_instruction: mediumOfInstruction,
        course_eligibility: eligibility,
        average_ratings: averageRatings,
        product_sfid: productSfid,
        merchant_product_sfid: merchantSfid,
        work_experience: workEx,
        course_eligibilty_test: eligibilityTest,
        product_name: productName,
        cpp_horizontal_logo: providerLogo,
        fulltime_parttime: courseType,
        currency_type: currency,
        zero_cost_finance: zeroCost,
        is_low_cost_emi: lowCost,
        grades,
        education,
        journey_type: journeyType,
        partner_product_link: partnerProductLink,
        merchant_logo_url: merchantLogo,
        cpp_horizontal_logo: merchantLogoURL,
        entity_name: entity,
        m_custom_1: udemyTitle,
        merchant_slug: merchantSlug,
    } = productDetails;

    const isUdemyCourse = entity === "Udemy";
    const noCostEmiAvailable = zeroCost === "Yes";
    const lowCostEmiAvailable = lowCost === "Yes";
    const isFreeCourse = journeyType === "Free course";
    const isDirectFullPayment = journeyType === "Direct Full Payment";

    const isMsdemo = useSelector(
        ({ global }) => global?.corporateData?.isMsdemo,
    );

    const path = usePathname();

    const format = (amount) => formatWithCurrency(amount, currency);
    const { push } = useRouter();
    const searchParams = useSearchParams();
    // eslint-disable-next-line no-unused-vars
    const [productUrl, setProductUrl] = useState("");
    const [enrollmentData, setEnrollmentData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [fullPaidAmount, setFullPaidAmount] = useState("");
    const [openContent, setOpenContent] = useState(false);
    const [enrolledIds, setEnrolledIds] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [eligibilityCriteria, setEligibilityCriteria] = useState([]);
    const emiPopupRef = useRef(null);
    const [performEnrollForCourse] = useEnrollForCourseMutation();
    const utmParams = useSelector((state) => state?.auth?.utm_params ?? {});
    const user = useSelector((state) => state.auth.user);
    const [setUserFlag] = useSetUserFlagMutation();
    const dispatch = useDispatch();
    const isEnrolling = useRef(false);
    const [infoVisible, { close: hideInfo, open: showInfo }] =
        useDisclosure(false);
    useOnClickOutside(emiPopupRef, hideInfo);

    useEffect(() => {
        if (typeof window !== "undefined" && path) {
            setProductUrl(window.origin + path);
        }
    }, [path]);

    useEffect(() => {
        const newCriteria = [];
        if (education) {
            newCriteria.push({
                label: "Highest Qualification",
                value: education,
            });
        }
        if (workEx) {
            newCriteria.push({
                label: "Work Experience",
                value: workEx,
            });
        }
        if (grades) {
            newCriteria.push({
                label: "Min Grades Required",
                value: grades,
            });
        }
        if (eligibilityTest) {
            newCriteria.push({
                label: "Course Eligibility Test",
                value: eligibilityTest,
            });
        }
        setEligibilityCriteria(newCriteria);
    }, [education, workEx, grades, eligibilityTest, setEligibilityCriteria]);

    const auth = useSelector((state) => state.auth);
    const isLoggedIn = useMemo(() => auth?.user?.profile_completed, [auth]);

    // check if logged in or not
    const checkIfUserLoggedIn = () => isLoggedIn;

    const { data: dashboardRes } = useGetDashboardQuery(
        {
            userId: auth?.user?.id,
        },
        {
            skip: !auth?.user?.id,
        },
    );

    const dashboardData = useMemo(
        () => dashboardRes?.data || {},
        [dashboardRes?.data],
    );

    useEffect(() => {
        if (dashboardData?.cart?.length) {
            let fullPaidAmt = 0;
            const enrolledProducts = dashboardData.cart.map((item) => {
                if (item.product_id === productSfid) {
                    fullPaidAmt = item.full_amount;
                }
                return item.product_id;
            });
            setFullPaidAmount(fullPaidAmt);
            setEnrolledIds(enrolledProducts);
        }
    }, [dashboardData, productSfid]);
    // proceed to enroll
    const proceedToEnroll = (forceLogin = false) => {
        setShowRegistrationModal(false);
        if (!(forceLogin || checkIfUserLoggedIn())) return;
        setShowPopup(true);
    };

    const getValidSearchParam = (param) => {
        if (["undefined", "null"].includes(param)) return "";
        if (!param) return "";
        return Number(param);
    };

    const getEnrolled = async (forceLogin = false) => {
        isEnrolling.current = true;
        setIsLoading(true);
        try {
            const res = await performEnrollForCourse({
                payload: {
                    ...(utmParams ?? {}),
                    customer_id: user?.id,
                    product_sfid: productSfid,
                    merchant_product_sfid: merchantSfid,
                    product_url: productUrl,
                    function_id:
                        getValidSearchParam(searchParams.get("functionId")) ??
                        undefined,
                    skill_id:
                        getValidSearchParam(searchParams.get("skillId")) ??
                        undefined,
                },
            });

            if (res?.data?.data?.status === "success") {
                const enrollmentRes = res.data.data;
                dispatch(
                    setUserData({
                        is_account_active: enrollmentRes.is_account_active,
                    }),
                );
                setErrorMessage("");
                setEnrollmentData(enrollmentRes);
                proceedToEnroll(forceLogin);
                return;
            }
            if (res?.error) {
                setEnrollmentData({});
                setErrorMessage(res?.error?.data?.message);
            }
        } finally {
            setIsLoading(false);
            isEnrolling.current = false;
        }
    };

    const enrollNow = (forceLogin = false) => {
        if (isFreeCourse) {
            setTimeout(() => {
                window.open(partnerProductLink, "_blank");
            });
            return;
        }
        const loginStatus = forceLogin || checkIfUserLoggedIn();
        if (enrolledIds.includes(productSfid)) {
            push("/dashboard");
            return;
        }
        if (loginStatus) {
            setUserFlag({
                payload: {
                    customer_id: auth?.user?.id,
                    flag_type: "Enroll",
                },
            });
            getEnrolled(forceLogin);
        } else {
            setShowRegistrationModal(true);
        }
    };
    const eligibilityParameters = useMemo(
        () =>
            eligibilityCriteria.length > 0 && !openContent
                ? eligibilityCriteria.slice(0, 2).map((item) => (
                      <div className={styles.content} key={item.label}>
                          <div className={styles.bullet}>
                              <Image src={Tick} alt="eligibility_icon" />
                          </div>

                          <h4 className={styles.text}>
                              {" "}
                              <span>{item.label} </span>
                              {item.value}
                          </h4>
                      </div>
                  ))
                : eligibilityCriteria.map((item) => (
                      <div className={styles.content}>
                          <div className={styles.bullet}>
                              <Image src={Tick} alt="eligibility_icon" />
                          </div>
                          <h4 className={styles.text}>
                              {" "}
                              <span>{item.label} </span>
                              {item.value}
                          </h4>
                      </div>
                  )),
        [eligibilityCriteria, openContent],
    );

    const redirectToFaqPage = () => {
        push("/abc-faqs");
    };

    return (
        <>
            <Loader isLoading={isLoading} />
            <div className={styles.enrolmentCardContainer}>
                <div className={styles.enrolmentSubContainer}>
                    <div className={styles.specs}>
                        <div className={styles.pricingComponent}>
                            {!isFreeCourse && !isUdemyCourse && (
                                <div className={styles.noCostSection}>
                                    <Popover
                                        opened={infoVisible}
                                        position="left-start"
                                    >
                                        <div>
                                            {noCostEmiAvailable ? (
                                                <Image
                                                    src={Zero}
                                                    className={
                                                        styles.zeroCostSticker
                                                    }
                                                    alt="zero_cost_emi_sticker"
                                                />
                                            ) : (
                                                lowCostEmiAvailable && (
                                                    <Image
                                                        src={Low}
                                                        className={
                                                            styles.zeroCostSticker
                                                        }
                                                        alt="low_cost_emi_sticker"
                                                    />
                                                )
                                            )}
                                            <Popover.Target>
                                                <Image
                                                    src={Info}
                                                    alt="info"
                                                    ref={emiPopupRef}
                                                    onClick={() =>
                                                        infoVisible
                                                            ? hideInfo()
                                                            : showInfo()
                                                    }
                                                />
                                            </Popover.Target>
                                        </div>
                                        <Popover.Dropdown>
                                            <AnimatePresence>
                                                <motion.div
                                                    initial={{
                                                        scale: 0,
                                                    }}
                                                    animate={{
                                                        scale: 1,
                                                    }}
                                                    exit={{
                                                        scale: 0,
                                                    }}
                                                    ref={emiPopupRef}
                                                    className={
                                                        styles.infoContainer
                                                    }
                                                >
                                                    <h4>
                                                        What is included in the
                                                        total price?
                                                    </h4>
                                                    <p>
                                                        The amount is inclusive
                                                        of commission payable to
                                                        WiZR and any other
                                                        financing charges.
                                                    </p>
                                                    <br />
                                                    <h4>
                                                        What is No-cost EMI ?
                                                    </h4>
                                                    <p>
                                                        No-cost EMI signifies an
                                                        EMI (Equated Monthly
                                                        Installment) plan where
                                                        you are exempt from
                                                        paying any interest on
                                                        the loan amount. WiZR
                                                        can assist its users to
                                                        avail a No-cost EMI plan
                                                        offered by its Lending
                                                        Partners where
                                                        individuals can take
                                                        advantage of installment
                                                        payments without
                                                        incurring any interest
                                                        to pay for the chosen
                                                        course.
                                                    </p>
                                                    <Image
                                                        src={CloseIcon}
                                                        className={
                                                            styles.closeIcon
                                                        }
                                                        alt="close"
                                                        onClick={hideInfo}
                                                    />
                                                </motion.div>
                                            </AnimatePresence>
                                        </Popover.Dropdown>
                                    </Popover>
                                </div>
                            )}
                            {isUdemyCourse ? (
                                <div>
                                    <UdemyCourseBundleCard
                                        logo={merchantLogo || merchantLogoURL}
                                        title={udemyTitle}
                                        merchantSlug={merchantSlug}
                                    />
                                    <div className={styles.emiContainer}>
                                        <div style={{ marginTop: "4px" }}>
                                            <p className={styles.priceTag}>
                                                {format(minAviEmi)}
                                                <span>/month</span>
                                            </p>

                                            <p className={styles.emiTag}>
                                                Total ₹{offerPrice}{" "}
                                                <motion.span
                                                    onClick={() =>
                                                        push(
                                                            createSlug(
                                                                merchantSlug,
                                                            ),
                                                        )
                                                    }
                                                >
                                                    for the bundle
                                                </motion.span>
                                            </p>
                                        </div>
                                        {noCostEmiAvailable ? (
                                            <Image
                                                src={NoCOSTEMI}
                                                alt="no-cost-emi"
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {isFreeCourse ? (
                                        <div className={styles.freeCourse}>
                                            <Image src={FreeCourseIcon} />
                                            <p>Start Learning</p>
                                        </div>
                                    ) : priceOnRequest &&
                                      !enrolledIds.includes(productSfid) ? (
                                        <p className={styles.priceOnRequest}>
                                            Price on request
                                        </p>
                                    ) : (
                                        <>
                                            {minAviEmi && (
                                                <>
                                                    <div
                                                        className={
                                                            styles.startingText
                                                        }
                                                    >
                                                        EMI Starting From:
                                                    </div>
                                                    <div
                                                        className={styles.price}
                                                    >
                                                        {format(minAviEmi)}
                                                        <span
                                                            className={
                                                                styles.monthly
                                                            }
                                                        >
                                                            {minAviEmi &&
                                                                "/month"}
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                            <div className={styles.total}>
                                                Total price &nbsp;
                                                <span>
                                                    {discountRate}
                                                    {discountRate
                                                        ? "% off"
                                                        : ""}
                                                </span>
                                            </div>
                                            <div
                                                className={`${
                                                    styles.discountedPrice
                                                } ${
                                                    minAviEmi ??
                                                    styles.onlyTotalPriceVisible
                                                }`}
                                            >
                                                <span>
                                                    {offerPrice &&
                                                    offerPrice < loanAmount
                                                        ? `${format(
                                                              loanAmount,
                                                          )}/-`
                                                        : ""}
                                                </span>
                                                <span>
                                                    {format(
                                                        priceOnRequest &&
                                                            enrolledIds.includes(
                                                                productSfid,
                                                            )
                                                            ? fullPaidAmount
                                                            : offerPrice ??
                                                                  loanAmount,
                                                    ) ?? ""}
                                                    /-
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {!hideCta && (
                                <div className={styles.buttonRow}>
                                    <Button
                                        className={`${styles.enrollButton}`}
                                        variant="primary"
                                        widthStyle="long"
                                        style={{
                                            width: "100%",
                                            height: 54,
                                        }}
                                        // onClick={() => setShowPopup(true)}
                                        onClick={() => enrollNow()}
                                    >
                                        {/* eslint-disable-next-line no-nested-ternary */}
                                        {enrolledIds.includes(productSfid)
                                            ? "View Dashboard"
                                            : isFreeCourse
                                            ? "Upgrade your skill now"
                                            : isDirectFullPayment
                                            ? "Enroll Now"
                                            : "Talk to a Counsellor"}
                                    </Button>
                                    {errorMessage?.length > 0 && (
                                        <div
                                            className={styles.errorMessage}
                                            id="errorMessage"
                                        >
                                            {errorMessage}
                                        </div>
                                    )}
                                    {enrollmentData?.id && (
                                        <div
                                            className={styles.successMessage}
                                            id="successMessage"
                                        >
                                            Enrolled Successfully !!
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        className={styles.likeBtn}
                                    >
                                        <Image src={Like} alt="like_btn" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className={styles.specifications}>
                            {/* {!isUdemyCourse ? ( */}
                            <div className={styles.specRow}>
                                <Image
                                    src={Smiley}
                                    alt="spec_icon"
                                    className={styles.specIcon}
                                />
                                <p className={styles.spec}>Scholarship</p>
                                <p className={styles.value}>
                                    {scholarshipAvailable}
                                </p>
                            </div>
                            {/* ) : null} */}
                            <div className={styles.specRow}>
                                <Image
                                    src={Language}
                                    alt="spec_icon"
                                    className={styles.specIcon}
                                />
                                <p className={styles.spec}>Language</p>
                                <p className={styles.value}>
                                    {mediumOfInstruction}
                                </p>
                            </div>
                            <div className={styles.specRow}>
                                <Image
                                    src={Eligibility}
                                    alt="spec_icon"
                                    className={styles.specIcon}
                                />
                                <p className={styles.spec}>
                                    Eligibility Required
                                </p>
                                <p className={styles.value}>{eligibility}</p>
                            </div>

                            <div className={styles.specRow}>
                                <Image
                                    src={Learning}
                                    alt="spec_icon"
                                    className={styles.specIcon}
                                />
                                <p className={styles.spec}>Course Type</p>
                                <p className={styles.value}>{courseType}</p>
                            </div>
                            {/* {!isUdemyCourse ? ( */}
                            <div className={styles.specRow}>
                                <Image
                                    src={Placement}
                                    alt="spec_icon"
                                    className={styles.specIcon}
                                />
                                <p className={styles.spec}>
                                    Placement Assistance
                                </p>
                                <p className={styles.value}>{placementAsst}</p>
                            </div>
                            {/* ) : null} */}
                            {/* <div className={styles.specRow}>
                                <Image
                                    src={Delivery}
                                    alt="spec_icon"
                                    className={styles.specIcon}
                                />
                                <p className={styles.spec}>Delivery Mode</p>
                                <p className={styles.value}>
                                    {courseDeliveryMode}
                                </p>
                            </div> */}
                        </div>
                    </div>
                    {averageRatings && (
                        <div className={styles.rating}>
                            <Rating rating={averageRatings} multiline />
                        </div>
                    )}
                </div>
                {eligibility === "Yes" && (
                    <div className={styles.eligibility}>
                        <h4>Course Eligibility</h4>

                        {eligibilityParameters}
                        {eligibilityCriteria?.length > 2 && (
                            <button
                                type="button"
                                className={styles.showMore}
                                onClick={() => setOpenContent(!openContent)}
                            >
                                <span className={styles.content}>
                                    {openContent ? "Show Less" : "Show More"}
                                    <div
                                        className={styles.chevron}
                                        style={{
                                            rotate: openContent
                                                ? "0deg"
                                                : "180deg",
                                        }}
                                    >
                                        <Image
                                            src={Chevron}
                                            alt="chevron_icon"
                                        />
                                    </div>
                                </span>
                            </button>
                        )}
                    </div>
                )}
            </div>
            {!showPopup && (
                <div className={styles.responsiveEnrollmentParent}>
                    {!isFreeCourse &&
                        (noCostEmiAvailable || lowCostEmiAvailable) && (
                            <div className={styles.noCostSection}>
                                <Popover
                                    opened={infoVisible}
                                    position="top"
                                    withArrow
                                >
                                    <div>
                                        {noCostEmiAvailable ? (
                                            <Image
                                                src={Zero}
                                                className={
                                                    styles.zeroCostSticker
                                                }
                                                alt="zzero_cost_emi_sticker"
                                            />
                                        ) : (
                                            lowCostEmiAvailable && (
                                                <Image
                                                    src={Low}
                                                    className={
                                                        styles.zeroCostSticker
                                                    }
                                                    alt="zzero_cost_emi_sticker"
                                                />
                                            )
                                        )}
                                        <Popover.Target>
                                            <Image
                                                src={Info}
                                                alt="zzero_cost_emi_sticker"
                                                ref={emiPopupRef}
                                                onClick={() =>
                                                    infoVisible
                                                        ? hideInfo()
                                                        : showInfo()
                                                }
                                            />
                                        </Popover.Target>
                                    </div>
                                    <Popover.Dropdown>
                                        <AnimatePresence>
                                            <motion.div
                                                initial={{
                                                    scale: 0,
                                                }}
                                                animate={{
                                                    scale: 1,
                                                }}
                                                exit={{
                                                    scale: 0,
                                                }}
                                                ref={emiPopupRef}
                                                className={styles.infoContainer}
                                            >
                                                <h4>
                                                    What is included in the
                                                    total price?
                                                </h4>
                                                <p>
                                                    The amount is inclusive of
                                                    commission payable to WiZR
                                                    and any other financing
                                                    charges.
                                                </p>
                                                <br />
                                                <h4>What is No-cost EMI ?</h4>
                                                <p>
                                                    No-cost EMI signifies an EMI
                                                    (Equated Monthly
                                                    Installment) plan where you
                                                    are exempt from paying any
                                                    interest on the loan amount.
                                                    WiZR can assist its users to
                                                    avail a No-cost EMI plan
                                                    offered by its Lending
                                                    Partners where individuals
                                                    can take advantage of
                                                    installment payments without
                                                    incurring any interest to
                                                    pay for the chosen course.
                                                </p>
                                                <Image
                                                    src={CloseIcon}
                                                    className={styles.closeIcon}
                                                    alt="close"
                                                    onClick={hideInfo}
                                                />
                                            </motion.div>
                                        </AnimatePresence>
                                    </Popover.Dropdown>
                                </Popover>
                            </div>
                        )}
                    <div
                        className={`${styles.fixedEnrollment} ${
                            isUdemyCourse && styles.udemyFixedEnrollment
                        }`}
                    >
                        {isFreeCourse ? (
                            <div className={styles.freeCourse}>
                                <Image src={FreeCourseIcon} />
                                <p>Start Learning</p>
                            </div>
                        ) : priceOnRequest ? (
                            <p className={styles.priceOnRequest}>
                                Price on request
                            </p>
                        ) : isUdemyCourse ? (
                            <div className={styles.responsiveUdemyCard}>
                                {minAviEmi ? (
                                    <>
                                        <div className={styles.startingText}>
                                            EMI Starting From:
                                        </div>

                                        <div className={styles.price}>
                                            {format(minAviEmi)}
                                            <span className={styles.monthly}>
                                                /month
                                            </span>
                                        </div>
                                    </>
                                ) : null}
                                <p className={styles.emiTag}>
                                    Total price{" "}
                                    <span className={styles.bold}>
                                        ₹{offerPrice}
                                    </span>{" "}
                                    <motion.span
                                        onClick={() => push(merchantSlug)}
                                    >
                                        for bundle
                                    </motion.span>
                                </p>
                            </div>
                        ) : (
                            <div className={styles.pricing}>
                                <div>
                                    {minAviEmi && (
                                        <>
                                            <div
                                                className={styles.startingText}
                                            >
                                                EMI Starting From:
                                            </div>
                                            <div className={styles.price}>
                                                {/* {currency}  */}
                                                {format(minAviEmi)}
                                                <span
                                                    className={styles.monthly}
                                                >
                                                    {minAviEmi && "/month"}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div>
                                    <div className={styles.total}>
                                        Total price &nbsp;
                                        {/* {currency} */}
                                        <span>
                                            {discountRate}
                                            {discountRate ? "% off" : ""}
                                        </span>
                                    </div>
                                    <div
                                        className={`${styles.discountedPrice} ${
                                            minAviEmi ??
                                            styles.onlyTotalPriceVisible
                                        }`}
                                    >
                                        <span>
                                            {offerPrice &&
                                            offerPrice < loanAmount
                                                ? `${format(loanAmount)}/-`
                                                : ""}
                                        </span>
                                        <span>
                                            {format(offerPrice ?? loanAmount) ??
                                                ""}
                                            /-
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!hideCta && (
                            <div className={styles.btns}>
                                <button
                                    type="button"
                                    className={styles.likeBtn}
                                >
                                    <Image src={Like} alt="like_btn" />
                                </button>
                                <Button
                                    className={`${styles.enrollButton}`}
                                    variant="primary"
                                    widthStyle="long"
                                    style={{ padding: " 0 23px" }}
                                    onClick={() => enrollNow()}
                                >
                                    {enrolledIds.includes(productSfid)
                                        ? "View Dashboard"
                                        : isFreeCourse
                                        ? "Upgrade your skill now"
                                        : isDirectFullPayment
                                        ? "Enroll Now"
                                        : "Talk to a Counsellor"}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <RegistrationModal
                startProcess={showRegistrationModal}
                closeModal={(_, forceLogin) => {
                    setShowRegistrationModal(false);
                    const loginStatus = forceLogin || checkIfUserLoggedIn();
                    if (enrolledIds.includes(productSfid)) {
                        push("/dashboard");
                        return;
                    }
                    if (loginStatus) {
                        setUserFlag({
                            payload: {
                                customer_id: auth?.user?.id,
                                flag_type: "Enroll",
                            },
                        });
                        if (!isEnrolling.current) getEnrolled(forceLogin);
                    }
                }}
                flow="discovery"
            />

            {showPopup && (
                <EnrolmentPopup
                    productUrl={productUrl}
                    providerLogo={providerLogo}
                    discountAmount={discountAmount}
                    product={productName}
                    pSfid={productSfid}
                    mSfid={merchantSfid}
                    status="Await our call" // hardcoded here because this page will always have this status as the active one
                    totalCost={format(totalCost - (discountAmount || 0))}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    setEnrollmentData={setEnrollmentData}
                    setShowPopup={setShowPopup}
                    minAviEmi={minAviEmi}
                    loanAmount={loanAmount}
                    offerPrice={offerPrice}
                    discountRate={discountRate}
                    noCostEmiAvailable={noCostEmiAvailable}
                    lowCostEmiAvailable={lowCostEmiAvailable}
                    currency={currency}
                    priceOnRequest={priceOnRequest}
                    enrollmentData={enrollmentData}
                    journeyType={journeyType}
                    productDetails={productDetails}
                    setIsLoading={setIsLoading}
                />
            )}

            {isMsdemo ? null : (
                <Image
                    id="faqLink"
                    className={styles.faqLink}
                    onClick={redirectToFaqPage}
                    src={Faq}
                    width={60}
                    height={60}
                    alt="faq"
                />
            )}
        </>
    );
}
