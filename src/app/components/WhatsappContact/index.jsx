/* eslint-disable no-nested-ternary */
import { motion } from "framer-motion";
import { WA_LINK } from "utils/constants";
import Image from "next/image";
import WaIcon from "assets/svgs/wa_icon.svg";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./WhatsappContact.module.scss";

export function WhatsappContact() {
    const pathname = usePathname();
    const isMobile = window.innerWidth < 1280;
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAnimate(true);
        }, 5000);
    }, []);
    return !animate ? null : (
        <motion.div
            initial={{
                x: 100,
            }}
            animate={{
                x: animate ? 0 : 100,
            }}
            className={styles.whatsappContact}
            style={{
                // position: "relative",
                bottom:
                    pathname?.indexOf("checkout") > -1 && isMobile
                        ? 86
                        : pathname?.indexOf("report") > -1
                        ? 110
                        : isMobile
                        ? pathname?.indexOf("course") > -1
                            ? 180
                            : 10
                        : 10,
            }}
        >
            <button
                type="button"
                onClick={() => {
                    window.open(WA_LINK, "_blank");
                }}
            >
                <Image src={WaIcon} alt="whatsapp_icon" />
                <p>Chat with us</p>
            </button>
        </motion.div>
    );
}
