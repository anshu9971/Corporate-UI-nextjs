import { HeadPhones } from "assets/svgs";
import { Button } from "components/Button";
import { useRouter } from "next/navigation";
import styles from "./ReviewCreditCard.module.scss";

export default function ReviewCreditCard() {
    const { push } = useRouter();
    return (
        <div className={styles.creditCard}>
            <div className={styles.headphones}>
                <HeadPhones />
            </div>
            <div>
                <h3>Enroll in a course to avail No-cost EMI</h3>
                <Button
                    variant="primary"
                    onClick={() => push("/start-skilling")}
                >
                    Start Skilling
                </Button>
                {/* <p>Our credit team will be in touch with you in a few days.</p> */}
            </div>
        </div>
    );
}
