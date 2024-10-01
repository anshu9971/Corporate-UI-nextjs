"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ActivityCardIllus5 from "assets/images/ActvityCard_illus5.png";
// import { useLazyUseGetCreditLimitQuery } from "services/users";
import { Progress } from "@mantine/core";
import Lock from "assets/images/Lock.svg";
import LockOpen from "assets/svgs/lock-open.svg";
// import axios from "axios";
// import { storage } from "services/storage";
import { useLazyGetCreditLimitQuery } from "services/users";
import { useReadUserQuery } from "services/readUser";
// import { useLazyReadUserQuery } from "services/readUser";
import styles from "./FetchCredit.module.scss";

export default function FetchCreditModal({ onClose }) {
    const [loading, setLoading] = useState(0);
    const [skipUserAPICall, setSkipUserAPICall] = useState(true);
    // const [trigger] = useLazyReadUserQuery();
    const [trigger] = useLazyGetCreditLimitQuery();
    const [credit, setCredit] = useState({});
    useReadUserQuery({}, { skip: skipUserAPICall });

    const fetchCredit = async () => {
        try {
            // const client = axios.create({
            //     baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,

            //     headers: {
            //         Authorization: `Bearer ${storage.fetch.authToken()}`,
            //     },
            // });

            // const result = await client.get("/user/limit");
            const result = await trigger();

            if (result?.data?.data?.status === "success") {
                setCredit({
                    limit: result?.data?.data?.limit,
                    is_fresh_limit_allow_to_fetch: "no",
                });
                setSkipUserAPICall(false);

                // trigger();
                // eslint-disable-next-line consistent-return
                const int = setInterval(() => {
                    if (loading >= 100) {
                        clearInterval(int);
                        onClose();
                        setLoading(0);
                        return 0;
                    }
                    setLoading((prev) => prev + 1);
                }, 18);
            }
        } catch (err) {
            // console.log(err);
        }
    };

    useEffect(() => {
        fetchCredit();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading >= 100) {
        onClose(credit);
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalBody}>
                    <div className={styles.imageContainer}>
                        <Image src={ActivityCardIllus5} alt="bg" />
                        <div className={styles.lockWrapper}>
                            <Image
                                src={loading > 95 ? LockOpen : Lock}
                                alt="lock"
                            />
                        </div>
                    </div>
                    <Progress color="#CBFB62" value={loading} />
                    <h4 className={styles.heading}>
                        {loading > 95
                            ? `Credit Limit Fetched`
                            : `Fetching your credit ...`}
                    </h4>
                </div>
            </div>
        </div>
    );
}
