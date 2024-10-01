import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import GIF from "assets/gifs/wizrLogoCharcoalTransparent.gif";
import { useSelector } from "react-redux";
import styles from "./loader.module.scss";

export function Loader({ isLoading, className }) {
    const corporate = useSelector(({ global }) => global?.corporateData);

    const getSecondaryLogo = () => {
        if (
            ["abc-uat.wizr", "adityabirlacapital"].includes(
                window?.location?.origin,
            )
        ) {
            return "https://d7bvc5ocjh0yg.cloudfront.net/corporate/logo/WIZR-X-ABC-logo-2024-New_1718166330504.gif";
        }
        return GIF;
    };

    getSecondaryLogo();

    return (
        isLoading && (
            <AnimatePresence>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{ opacity: 0 }}
                    className={[styles.loader, className].join(" ")}
                >
                    <Image
                        src={
                            corporate?.combine_motion_logo ?? getSecondaryLogo()
                        }
                        width={1000}
                        height={1000}
                        alt="loading..."
                    />
                </motion.div>
            </AnimatePresence>
        )
    );
}
