import { useEffect, useMemo, useState } from "react";
import UdemyCourseBundleCard from "components/UdemyCard/UdemyCard";
import Image from "next/image";
import Checker from "assets/images/checker.png";
import Delivery from "assets/svgs/delivery_icon.svg";
import LearningIcon from "assets/svgs/learning_icon.svg";
import GreenSticker from "assets/svgs/greenStick.svg";
import Tick from "assets/svgs/green_bg_tick.svg";
import Smiley from "assets/svgs/smiley_icon.svg";
import Language from "assets/svgs/language_icon.svg";
import Eligibility from "assets/svgs/eligibility_icon.svg";
import Placement from "assets/svgs/placement_icon.svg";
import Chevron from "assets/svgs/Chevron.svg";
import Bag from "assets/svgs/detail_bag_icon.svg";
import Tortoise from "assets/svgs/detail_tortoise_icon.svg";
import Calendar from "assets/svgs/detail_calendar_icon.svg";
import Close from "assets/svgs/close_icon.svg";
// import DetailedCourseProvider from "assets/svgs/detailedCProvider.svg";
import Modal from "components/Modal";
import styles from "./CourseDetailBanner.module.scss";

function ReadMore({ children }) {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const [ref, setRef] = useState(null);
    const [scrollHeight, setScrollHeight] = useState();
    const [offsetHeight, setOffsetHeight] = useState();
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
        setScrollHeight(ref?.scrollHeight);
        setOffsetHeight(ref?.offsetHeight);
    };

    return (
        <p
            className={`${styles.courseDescriptionText} ${
                isReadMore ? styles.hideText : styles.showText
            }`}
            ref={(r) => {
                setRef(r);
                setScrollHeight(r?.scrollHeight);
                setOffsetHeight(r?.offsetHeight);
            }}
        >
            {text}

            <button
                type="button"
                onClick={toggleReadMore}
                className={`${styles.readHide} ${
                    isReadMore ? styles.readMore : ""
                }`}
                style={
                    scrollHeight > offsetHeight || !isReadMore
                        ? { display: "inline" }
                        : { display: "none" }
                }
            >
                {isReadMore ? "...Read more" : " Show less"}
            </button>
        </p>
    );
}

export default function CourseDetailBanner({
    courseName,
    aboutCourse,
    courseLevel,
    courseDuration,
    durationMedium,
    courseDeliveryMode,
    instituteLogo,
    certificate,
    provider,
    // skills,
    scholarshipAvailable,
    courseLearningMode,
    placementAsst,
    mediumOfInstruction,
    eligibility,
    secondaryLogo,
    education,
    workEx,
    grades = "Yes",
    eligibilityTest = "Yes",
    courseType,
    cities = [],
    merchantSlug,
    udemyTitle,
    isUdemyCourse,
}) {
    const [width, setWidth] = useState(0);
    const [eligibilityCriteria, setEligibilityCriteria] = useState([]);
    const [openContent, setOpenContent] = useState(false);
    useEffect(() => {
        if (!window) return;
        setWidth(window.innerWidth);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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

    const getCitiesString = () => {
        const citiesString = cities?.map((el, i) => {
            if (i === cities.length - 1 && i >= 1) {
                return ` & ${el.name}`;
            }
            if (i >= 1) {
                return `, ${el.name}`;
            }
            return el.name;
        });
        return citiesString;
    };

    const renderEligibilityParameter = (item) => (
        <div className={styles.content} key={item.label}>
            <div className={styles.bullet}>
                <Image src={Tick} alt="eligibility_icon" />
            </div>
            <h4 className={styles.text}>
                <span>{item.label} </span>
                {item.value}
            </h4>
        </div>
    );
    const eligibilityParameters = useMemo(
        () =>
            eligibilityCriteria.length > 0 && !openContent
                ? eligibilityCriteria
                      .slice(0, 2)
                      .map(renderEligibilityParameter)
                : eligibilityCriteria.map(renderEligibilityParameter),
        [eligibilityCriteria, openContent],
    );
    const [
        instituteCertificatePreviewModalVisible,
        setInstituteCertificatePreviewModalVisible,
    ] = useState(false);
    return (
        <div className={styles.courseDetailBanner}>
            <Image
                src={Checker}
                alt="checker"
                // width={50}
                // height={50}
                className={styles.checker}
            />
            {instituteLogo && (
                <Image
                    src={instituteLogo}
                    alt="provider_logo"
                    width={200}
                    height={67}
                    placeholder="empty"
                    className={styles.providerLogo}
                    style={{ objectFit: "contain", objectPosition: "top left" }}
                />
            )}
            <h1 className={styles.courseName}>{courseName}</h1>

            <div className={styles.courseProvider}>
                {secondaryLogo && (
                    <Image
                        src={secondaryLogo} // confusion
                        width={200}
                        height={67}
                        alt="course_provider"
                        className={styles.courseProviderLogo}
                        style={{
                            objectFit: "contain",
                            objectPosition: "top left",
                        }}
                    />
                )}
                <p className={styles.providerName}>{provider}</p>
            </div>
            <div className={styles.description}>
                <ReadMore>{aboutCourse}</ReadMore>
            </div>

            <div className={styles.courseStickerContainer}>
                <div className={styles.courseStickers}>
                    {courseDeliveryMode && (
                        <div className={styles.sticker}>
                            <h4>
                                {courseDeliveryMode}
                                {cities?.length &&
                                ["In-person (Offline)", ""].includes(
                                    courseDeliveryMode,
                                )
                                    ? "* "
                                    : ""}
                            </h4>
                            <p>Delivery mode</p>
                            <Image
                                className={styles.tortoise}
                                src={Delivery}
                                width={20}
                                height={20}
                                alt="tortoise_icon"
                            />
                        </div>
                    )}
                    {courseLevel && (
                        <div className={styles.sticker}>
                            <h4>{courseLevel} Level </h4>
                            <p>Course Level</p>
                            <Image src={Bag} alt="bag_icon" />
                        </div>
                    )}
                    {courseDuration && durationMedium && (
                        <div className={styles.sticker}>
                            <h4>
                                {courseDuration} {durationMedium}
                            </h4>
                            <p>Course Duration</p>
                            <Image src={Calendar} alt="calendar_icon" />
                        </div>
                    )}
                    {courseLearningMode && (
                        <div className={styles.sticker}>
                            <h4>{courseLearningMode}</h4>
                            <p>Learning mode</p>
                            <Image src={Tortoise} alt="tortoise_icon" />
                        </div>
                    )}
                </div>
                {cities?.length &&
                ["In-person (Offline)", ""].includes(courseDeliveryMode) ? (
                    <p className={styles.description}>
                        * This course is available in {getCitiesString()}
                    </p>
                ) : null}

                {isUdemyCourse ? (
                    <div className={styles.udemyBanner}>
                        <UdemyCourseBundleCard
                            logo={instituteLogo}
                            merchantSlug={merchantSlug}
                            title={udemyTitle}
                        />
                    </div>
                ) : null}
            </div>

            <div className={styles.enrollMentResponsive}>
                <div className={styles.specs}>
                    <div className={styles.specifications}>
                        <h3 className={styles.specHead}>
                            Course Specifications{" "}
                        </h3>
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
                            <p className={styles.spec}>Eligibility Required</p>
                            <p className={styles.value}>{eligibility}</p>
                        </div>

                        <div className={styles.specRow}>
                            <Image
                                src={LearningIcon}
                                alt="spec_icon"
                                className={styles.specIcon}
                            />
                            <p className={styles.spec}>Course Type</p>
                            <p className={styles.value}>{courseType}</p>
                        </div>
                        <div className={styles.specRow}>
                            <Image
                                src={Placement}
                                alt="spec_icon"
                                className={styles.specIcon}
                            />
                            <p className={styles.spec}>Placement Assistance</p>
                            <p className={styles.value}>{placementAsst}</p>
                        </div>
                        {/* <div className={styles.specRow}>
                            <Image
                                src={Delivery}
                                alt="spec_icon"
                                className={styles.specIcon}
                            />
                            <p className={styles.spec}>Delivery Mode</p>
                            <p className={styles.value}>{courseDeliveryMode}</p>
                        </div> */}
                    </div>
                    {eligibility === "Yes" && (
                        <div className={styles.specifications}>
                            <h3 className={styles.specHead}>
                                Course Eligibility{" "}
                            </h3>
                            {eligibilityParameters}
                            {eligibilityCriteria?.length > 2 && (
                                <button
                                    type="button"
                                    className={styles.showMore}
                                    onClick={() => setOpenContent(!openContent)}
                                >
                                    <span className={styles.content}>
                                        {openContent
                                            ? "Show Less"
                                            : "Show More"}
                                        <div
                                            className={styles.chevron}
                                            style={{
                                                rotate: !openContent
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
            </div>
            {!!certificate && (
                <div className={styles.certification}>
                    <Image
                        src={GreenSticker}
                        alt="green_stick"
                        className={styles.greenSticker}
                    />
                    <div className={styles.text}>
                        <div className={styles.certificationText}>
                            Certification of completion
                        </div>
                        <div className={styles.courseText}>
                            {/* {courseProviderPlatform} &nbsp; Certified &nbsp; */}
                            {/* {skills} - {courseLevel} */}
                            {courseName}
                        </div>
                    </div>
                    {certificate && certificate.startsWith("http") && (
                        <div className={styles.certificate}>
                            {width > 900 ? (
                                <Image
                                    src={certificate}
                                    width={230}
                                    height={161}
                                    alt="certificate_img"
                                    className={styles.certificateImg}
                                    onClick={() => {
                                        setInstituteCertificatePreviewModalVisible(
                                            true,
                                        );
                                    }}
                                />
                            ) : (
                                <Image
                                    src={certificate}
                                    width={109}
                                    height={87}
                                    alt="certificate_img"
                                    className={styles.certificateImg}
                                    onClick={() => {
                                        setInstituteCertificatePreviewModalVisible(
                                            true,
                                        );
                                    }}
                                />
                            )}
                        </div>
                    )}
                </div>
            )}
            <Modal
                opened={instituteCertificatePreviewModalVisible}
                onClose={() => {
                    setInstituteCertificatePreviewModalVisible(false);
                }}
                withCloseButton={false}
                className={styles.instituteCertificatePreviewModal}
            >
                <div className={styles.contentContainer}>
                    <Image
                        className={styles.certificateImage}
                        src={certificate}
                        width={700}
                        height={700}
                    />
                    <Image
                        src={Close}
                        className={styles.closeIcon}
                        onClick={() => {
                            setInstituteCertificatePreviewModalVisible(false);
                        }}
                    />
                </div>
            </Modal>
            {/* <div className={styles.bgImg}><Image src={BannerBg} alt = "banner_bg" className={styles.bannerBg}/></div>
             */}
        </div>
    );
}
