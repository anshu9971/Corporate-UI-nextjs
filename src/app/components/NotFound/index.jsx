"use client";

import Image from "next/image";
import Glasses from "assets/images/eye-glasses.png";
import { memo } from "react";
import Link from "next/link";
import styles from "./NotFound.module.scss";

function NotFound({
    heading = "404 : Not Found",
    message = "We are not able the find the resource you are looking for right now",
    navigateTo = "#",
    ctaText = "Go to Home",
    action = () => {},
}) {
    return (
        <div className={styles.notFound}>
            <Image src={Glasses} alt="Not-Found-Image" />
            <h1>{heading}</h1>
            <p>{message}</p>
            <Link href={navigateTo} onClick={action}>
                {ctaText}
            </Link>
        </div>
    );
}

export default memo(NotFound);
