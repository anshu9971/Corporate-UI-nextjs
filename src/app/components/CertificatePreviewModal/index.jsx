import Image from "next/image";
import Modal from "components/Modal";
import CloseIcon from "assets/svgs/close_icon.svg";
import { certificateOptions } from "discover/career-discovery/report/constants";
import Certificate from "components/Certificate";
import styles from "./CertificatePreviewModal.module.scss";

export default function CertificatePreviewModal({
    certificate,
    modalProps,
    contentProps,
    showShareOptions = true,
    certificateImage,
    sample = false,
}) {
    const { onClose } = modalProps;
    return (
        <Modal
            {...modalProps}
            className={styles.modal}
            centered
            transitionProps={{ transition: "slide-up", duration: 250 }}
        >
            <div className={styles.content} {...contentProps}>
                <div className={styles.certificate}>
                    {certificateImage ? (
                        <>
                            <Image
                                src={certificateImage}
                                width={2000}
                                height={2000}
                            />
                            <Image
                                onClick={() => onClose()}
                                className={styles.icon}
                                src={CloseIcon}
                                alt="close"
                            />
                        </>
                    ) : (
                        <Certificate
                            certificate={certificate}
                            center
                            withCloseIcon={
                                <Image
                                    onClick={() => onClose()}
                                    className={styles.icon}
                                    src={CloseIcon}
                                    alt="close"
                                />
                            }
                            sample={sample}
                        />
                    )}
                </div>
                {showShareOptions && (
                    <div className={styles.certificateOptions}>
                        {certificateOptions.map(({ option, icon }) => (
                            <div>
                                <Image src={icon} />
                                <p> {option} </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Modal>
    );
}
