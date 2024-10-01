import Image from "next/image";
// import ReviewCreditCard from "components/ReviewCreditCard/ReviewCreditCard";
import { Button } from "components/Button";
import Confetti from "assets/svgs/confetti.svg";
import Wallet from "assets/svgs/wallet.svg";
import styles from "./styles.module.scss";

export function CreditLimitDashboardCard({ userInfo = {}, handleOpenModal }) {
    const getKYCButtonText = (kycStatus) => {
        if (!kycStatus) return "Be KYC Ready";
        if (kycStatus?.toLowerCase() === "kyc initiated")
            return "KYC Initiated";
        if (kycStatus?.toLowerCase() === "pending") return "KYC Pending";
        if (kycStatus?.toUpperCase() === "APPROVED") return "KYC Approved";
        return "KYC Rejected";
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.myCreditLimitCard}>
                <div className={styles.firstHalfContainer}>
                    <div className={styles.firstHalf}>
                        <Image src={Confetti} alt="confetti" />
                        <p>Congratulations! You may avail a loan upto</p>
                    </div>

                    <Button
                        className={styles.desktopCTA}
                        onClick={handleOpenModal}
                        variant="primary"
                        disabled={userInfo?.kyc_status}
                    >
                        {getKYCButtonText(userInfo?.kyc_status)}
                    </Button>
                </div>
                <div className={styles.secondHalf}>
                    <div>
                        <div>
                            <Image src={Wallet} alt="wallet" />
                        </div>
                        {/* <p>Get instant loan credit upto</p> */}
                        <h2>{`₹${(userInfo.sanctioned_limit / 100000).toFixed(
                            2,
                        )}L`}</h2>
                    </div>

                    {/* <Image src={ActivityCardIllus5} alt="act" /> */}
                </div>

                <Button
                    className={styles.mobileCTA}
                    onClick={handleOpenModal}
                    variant="primary"
                    disabled={userInfo?.kyc_status}
                >
                    {getKYCButtonText(userInfo?.kyc_status)}
                </Button>
            </div>
        </div>
    );
}
