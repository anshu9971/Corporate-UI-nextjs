import Modal from "components/Modal";
import YogaGuy from "assets/svgs/yoga_guy.svg";
// import Close from "assets/svgs/close_icon.svg";
import Ellipse from "assets/svgs/half_ellipse.svg";
import Image from "next/image";

import { Button } from "components/Button";
import styles from "./HdfcReportModal.module.scss";

export function HDFCReportModal({ visible, onClose = () => {} }) {
    return (
        <Modal
            opened={visible}
            className={styles.paywallModal}
            withCloseButton={false}
            centered
            onClose={onClose}
            size="50vw"
            transitionProps={{ transition: "slide-up", duration: 250 }}
            lockScroll={false}
        >
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    {/* <Image
                        src={Close}
                        className={styles.close}
                        onClick={onClose}
                    /> */}
                    <Image src={Ellipse} className={styles.ellipse} />
                    <Image src={YogaGuy} className={styles.yogaGuy} />

                    <div className={styles.textContainer}>
                        <h2 className={styles.heading}>
                            Your report has been shared with your HR manager.
                        </h2>

                        <Button variant="primary" onClick={onClose}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
