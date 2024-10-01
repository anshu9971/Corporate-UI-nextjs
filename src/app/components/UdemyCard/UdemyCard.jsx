"use client";

import { ArrowCircleRight } from "assets/svgs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createSlug } from "utils/helpers";
import styles from "./UdemyCard.module.scss";

export default function UdemyCourseBundleCard({ logo, title, merchantSlug }) {
    const { push } = useRouter();
    const text = title?.split("10k+");
    return (
        <div className={styles.udemyCard}>
            <div className={styles.courseImage}>
                {logo ? (
                    <Image src={logo} width={70} height={30} alt="logo" />
                ) : null}
                <p>COURSE BUNDLE</p>
            </div>
            <div>
                {/* Get the course bundle with <span>10k+</span> other courses
                    for 12 months. */}
                {text?.length > 1 ? (
                    <p className={styles.courseDescription}>
                        {text[0]}
                        <strong>10k+</strong>
                        {text[1]}
                    </p>
                ) : (
                    <p className={styles.courseDescription}>{title}</p>
                )}

                <motion.div
                    onClick={() => push(createSlug(merchantSlug))}
                    className={styles.courseCTA}
                >
                    View bundle <ArrowCircleRight />
                </motion.div>
            </div>
        </div>
    );
}
