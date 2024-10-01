import Modal from "components/Modal";
import YogaGuy from "assets/svgs/yoga_guy.svg";
import Image from "next/image";

// import { Button } from "components/Button";
import styles from "./FeedbackSubmittedModal.module.scss";

export function FeedbackSubmittedModal({ visible, onClose = () => {} }) {
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
            styles={{
                overlay: {
                    background: "transparent",
                    backdropFilter: "blur(34px)",
                },
            }}
        >
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <Image src={YogaGuy} className={styles.yogaGuy} />

                    <div className={styles.textContainer}>
                        <h2 className={styles.heading}>
                            Thank you for your valuable feedback.
                        </h2>

                        {/* <Button variant="primary" onClick={onClose}>
                            Close
                        </Button> */}
                    </div>
                </div>
            </div>
        </Modal>
    );
}
