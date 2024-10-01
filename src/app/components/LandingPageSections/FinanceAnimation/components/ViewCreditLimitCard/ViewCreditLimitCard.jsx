"use client";

import Image from "next/image";
import Wallet from "assets/svgs/wallet.svg";
import styles from "./ViewCreditLimitCard.module.scss";

export function ViewCreditLimitFinanceCard({ creditLimit = "" }) {
    return (
        <div className={styles.card}>
            <div className={styles.creditLimitTextWrapper}>
                <div>
                    <p className={styles.textHeading}>Credit Limit</p>

                    <p className={styles.creditLimitTitle}>
                        You may avail a loan upto
                    </p>
                    {creditLimit !== 0 ? (
                        <p className={styles.creditLimit}>{`₹${(
                            creditLimit / 100000
                        ).toFixed(2)}L`}</p>
                    ) : null}
                </div>
                <Image className={styles.walletImg} src={Wallet} alt="credit" />
            </div>
        </div>
    );
}
