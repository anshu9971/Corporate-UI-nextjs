import { useState } from "react";
import Image from "next/image";
import moment from "moment";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { Button } from "components/Button";
import EnlargeIcon from "assets/svgs/enlarge_icon.svg";
import CertificatePreviewModal from "components/CertificatePreviewModal";
import { notifications } from "@mantine/notifications";
// import { Tooltip } from "@mantine/core";
import { useShareCompletedCourseCertificateMutation } from "services/completedCourses";
import { ShareViaEmailModal } from "discover/career-discovery/report/ShareViaEmailModal";
import { certificateOptions } from "discover/career-discovery/report/constants";
import { Divider, Popover, Text } from "@mantine/core";
import PDFViewerFile from "components/PDFViewer/pdfViewer";
import ShareIcon from "../../../../public/share-icon.png";
import CalendarCheckIcon from "../../../../public/calendar-check-mark.png";
import styles from "./CourseDetailsCardWithCertificate.module.scss";

export default function CourseDetailsCardWithCertificate({
    logo,
    name,
    completedOn,
    courseImage,
    cartId,
    // course,
}) {
    const [previewCertificate, setPreviewCertificate] = useState(false);
    const [shareViaEmailModalProps, setShareViaEmailModalProps] = useState({
        visible: false,
        successMessage: "Certificate shared successfully with the members",
    });
    const [isShareMenuOpen, { open: openShareMenu, close: closeShareMenu }] =
        useDisclosure();
    const ref = useClickOutside(closeShareMenu);
    const [shareCompletedCourseCertificate] =
        useShareCompletedCourseCertificateMutation();

    const shareModalCloseHandler = () =>
        setShareViaEmailModalProps({ visible: false });

    const shareBtnHandler = async () => {
        // open email with certificate as attachment
        const { error } = await shareCompletedCourseCertificate({
            cart_id: cartId,
        });

        if (!error) {
            notifications.show({
                id: "shareViaEmailNotif",
                withCloseButton: true,
                autoClose: 5000,
                title: "Successfully Shared!",
                message: "Certificate shared successfully with the members",
                color: "green",
                // style: { backgroundColor: 'red' },
                // sx: { backgroundColor: 'red' },
                loading: false,
            });
            return true;
        }

        return false;
    };

    return (
        <div className={styles.skillCard}>
            <div className={styles.leftSection}>
                <div className={styles.logo}>
                    {logo ? (
                        <Image
                            src={logo}
                            alt="course-logo"
                            width={1000}
                            height={500}
                        />
                    ) : null}
                </div>
                <div className={styles.title}>
                    <Text>{name}</Text>
                </div>
                <div className={styles.date}>
                    <Image src={CalendarCheckIcon} alt="calendar-icon" />
                    <span>
                        Completed On{" "}
                        {completedOn ? (
                            <>{moment(completedOn).format("DD, MMM YYYY")} </>
                        ) : (
                            "-"
                        )}
                    </span>
                </div>
                <div className={styles.buttonContainer}>
                    <Button
                        className={styles.cta}
                        variant="primary"
                        widthStyle="long"
                        onClick={() => {
                            setTimeout(() => {
                                window.open(courseImage, "_blank");
                            });
                        }}
                    >
                        View certificate
                    </Button>
                    <Popover
                        position="bottom"
                        offset={20}
                        opened={isShareMenuOpen}
                    >
                        <Popover.Target>
                            <Image
                                style={{ cursor: "pointer" }}
                                onClick={openShareMenu}
                                src={ShareIcon}
                                alt="share-icon"
                            />
                        </Popover.Target>
                        <Popover.Dropdown className={styles.popoverDropdown}>
                            <div className={styles.shareContainer} ref={ref}>
                                <button
                                    type="button"
                                    className={`unstyledButton ${styles.btn}`}
                                    onClick={() => {
                                        closeShareMenu();
                                        shareBtnHandler();
                                        // setShareViaEmailModalProps({
                                        //     visible: true,
                                        //     successMessage:
                                        //         "Certificate shared successfully with the members",
                                        //     heading: "Share your certificate!",
                                        //     skipSkillLevelText: true,
                                        // });
                                    }}
                                >
                                    <Image src={ShareIcon} />
                                    <p>Share with Manager</p>
                                </button>
                                <Divider color="#b59b7b44" />

                                {certificateOptions
                                    .slice(1, 3)
                                    .map(({ option, icon, onClick }, index) => (
                                        <>
                                            <button
                                                type="button"
                                                className={`unstyledButton ${styles.btn}`}
                                                onClick={() => {
                                                    closeShareMenu();
                                                    setTimeout(() => {
                                                        onClick(
                                                            courseImage,
                                                            "career",
                                                            "certificate",
                                                            true,
                                                        );
                                                    }, 100);
                                                }}
                                            >
                                                <Image src={icon} />
                                                <p>{option}</p>
                                            </button>

                                            {index === 0 && (
                                                <Divider color="#b59b7b44" />
                                            )}
                                        </>
                                    ))}
                            </div>
                        </Popover.Dropdown>
                    </Popover>
                </div>
            </div>
            <div className={styles.rightSection}>
                <div className={styles.certificateImage}>
                    <div className={styles.certificateContainer}>
                        {courseImage.charAt(courseImage.length - 1) === "f" ? (
                            <PDFViewerFile
                                fileUrl={courseImage}
                                height="120px"
                                width="165px"
                            />
                        ) : (
                            <Image
                                onClick={() => setPreviewCertificate(true)}
                                src={courseImage}
                                alt="certificate-image"
                                height="120"
                                width="180"
                            />
                        )}
                        {courseImage.charAt(courseImage.length - 1) !== "f" ? (
                            <div className={styles.enlarge}>
                                <Image src={EnlargeIcon} />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <ShareViaEmailModal
                {...shareViaEmailModalProps}
                onShare={shareBtnHandler}
                onClose={shareModalCloseHandler}
            />
            <CertificatePreviewModal
                showShareOptions={false}
                modalProps={{
                    opened: previewCertificate,
                    onClose: () => setPreviewCertificate(false),
                    withCloseButton: false,
                }}
                certificateImage={courseImage}
            />
        </div>
    );
}
