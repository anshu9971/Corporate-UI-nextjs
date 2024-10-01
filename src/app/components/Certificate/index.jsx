/* eslint-disable no-param-reassign */
import Image from "next/image";

import { useEffect, useRef } from "react";
import styles from "./Certificate.module.scss";
import { dummyCertificate } from "./constants";

export default function Certificate({
    certificate = dummyCertificate,
    center = false,
    withCloseIcon,
    sample = false,
}) {
    const {
        presentedTo,
        role = "AGILE ANALYST",
        topIcon,
        leftIcon,
        rightIcon,
        customDescriptionElement,
        description,
        topTraits,
    } = certificate;
    const scaledContent = useRef();

    useEffect(() => {
        // eslint-disable-next-line no-shadow
        const applyScaling = (scaledContent) => {
            scaledContent.style.transform = "scale(1, 1)";

            const { width: cw, height: ch } =
                scaledContent.getBoundingClientRect();
            const { width: ww, height: wh } =
                scaledContent.parentElement.getBoundingClientRect();
            const scaleAmtX = Math.min(ww / cw, wh / ch);
            const scaleAmtY = scaleAmtX;
            scaledContent.style.transformOrigin = "top left";
            scaledContent.style.transform = `scale(${scaleAmtX}, ${scaleAmtY}) 
            ${center ? "translate(-50%, -50%)" : ""}`;
        };
        const handleResize = () => {
            if (scaledContent.current) {
                applyScaling(scaledContent.current);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const firstName = presentedTo?.trim()?.split(" ")[0];
    return (
        <div
            id="coc-wizr" // ! Don't remove the coc-wizr id as it's there to download the certificate
            className={styles.outerContainer}
            ref={scaledContent}
        >
            <div className={styles.innerContainer}>
                <div className={styles.heading}>
                    <h1>{role}</h1>
                </div>
                <div className={styles.name}>
                    <p>Certificate presented to</p>
                    <h3>{presentedTo}</h3>
                </div>
                {customDescriptionElement || (
                    <p className={styles.description}>
                        {firstName}&apos;s personality archetype - <b>{role}</b>
                        <br />
                        {description}
                        <br />
                        <br />
                        <b>{firstName}&apos;s Strong Traits</b>
                        <br />
                        {topTraits}
                    </p>
                )}
                <Image
                    className={`${styles.topIcon} ${styles.pAbsolute}`}
                    src={topIcon}
                />
                <Image
                    className={`${styles.leftIcon} ${styles.pAbsolute}`}
                    src={leftIcon}
                />
                <Image
                    className={`${styles.rightIcon} ${styles.pAbsolute}`}
                    src={rightIcon}
                />
                <p className={`${styles.officialText} ${styles.pAbsolute}`}>
                    WIZR 2024 OFFICIAL CERTIFICATE
                </p>
                {sample && <p className={styles.sample}>SAMPLE</p>}
            </div>
            {!!withCloseIcon && withCloseIcon}
        </div>
    );
}
