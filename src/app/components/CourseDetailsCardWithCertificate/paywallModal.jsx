import Modal from "components/Modal";
import YogaGuy from "assets/svgs/yoga_guy.svg";
import Close from "assets/svgs/close_icon.svg";
import Ellipse from "assets/svgs/half_ellipse.svg";
import CheckIcon from "assets/svgs/check_circle_black.svg";
import Lock from "assets/svgs/lock_icon_open.svg";
import Image from "next/image";
// import BillingButton from "components/BillingButton";
import { useRouter } from "next/navigation";
import { Button } from "components/Button";
import styles from "./CourseDetailsCardWithCertificate.module.scss";

export function PaywallModal({
    visible,
    onClose = () => {},
    amount,
    maxAmount,
    // onClickPay,
    // orderCreatePayload,
    // product,
    setIsLoading,
}) {
    const pointers = [
        "Receive your Mental Make-up Certificate",
        "Download a detailed Report with analysis of your strengths",
        "Get Career and Course recommendations",
    ];
    const { push } = useRouter();
    const onClickContinue = () => {
        setIsLoading(true);
        setTimeout(() => {
            push(`/checkout`);
            setIsLoading(false);
        }, 2000);
    };
    return (
        <Modal
            opened={visible}
            className={styles.paywallModal}
            withCloseButton={false}
            centered
            onClose={onClose}
            size="80vw"
            transitionProps={{ transition: "slide-up", duration: 250 }}
            lockScroll={false}
        >
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <Image
                        src={Close}
                        className={styles.close}
                        onClick={onClose}
                    />
                    <Image src={Ellipse} className={styles.ellipse} />
                    <Image src={YogaGuy} className={styles.yogaGuy} />
                    <Image src={Lock} className={styles.lock} />
                    <h2 className={styles.heading}>
                        Unlock your <br /> Mental Make-up Report now!
                    </h2>
                    <div className={styles.pointers}>
                        {pointers.map((text) => (
                            <div>
                                <Image src={CheckIcon} />
                                <p>{text}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.lastRow}>
                        <p>
                            Limited-time Offer: <span>₹{maxAmount}/-</span>
                        </p>
                        <h4>₹{amount}/-</h4>
                        {/* <BillingButton
                            variant="primary"
                            type="button"
                            onClick={onClickPay}
                            label="Continue to Payment"
                            orderCreatePayload={orderCreatePayload}
                            product={product}
                            setIsLoading={setIsLoading}
                            onClickPay={() => onClose()}
                            buttonClassName={styles.billingButton}
                            redirectTo={`${window?.location.origin}/discover/career-discovery/report`}
                        /> */}
                        <Button variant="primary" onClick={onClickContinue}>
                            Continue to Payment
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
