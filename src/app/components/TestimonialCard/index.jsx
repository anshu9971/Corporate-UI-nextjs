"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import styles from "./TestimonialCard.module.scss";

function TestimonialCard({ text, image, name, designation }) {
    const controls = useAnimationControls();

    useEffect(() => {
        const shakeCard = async () => {
            await controls?.start({
                transform: "rotate(-4deg)",
            });
            await controls?.start({
                transform: "rotate(4deg)",
            });
            await controls?.start({
                transform: "rotate(-4deg)",
            });
            await controls?.start({
                transform: "rotate(4deg)",
            });
            await controls?.start({
                transform: "rotate(-4deg)",
            });
        };

        shakeCard();
        return () => controls.stop();
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                initial={{}}
                animate={controls}
                className={styles.testimonialCard}
            >
                <p>&quot;{text}&quot;</p>
                <Image src={image} alt="profile" />
                <p>{name}</p>
                <p>{designation}</p>
            </motion.div>
        </AnimatePresence>
    );
}

export default React.memo(TestimonialCard);
