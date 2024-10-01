import Lock from "assets/svgs/lock_icon.svg";
import Image from "next/image";
import styles from "./Paywall.module.scss";

export default function Paywall({
    visible,
    children,
    containerClassName,
    paywallText = "Tap to unlock!",
    paywallSubText = "",
    removePositionRelative = false,
    onClickPaywall = () => {},
    paywallClassName = "",
    onlyBlur = false,
    isHDFCUser,
}) {
    return (
        <div
            className={`${styles.container} ${
                visible ? styles.visible : ""
            } ${containerClassName} ${
                removePositionRelative ? "" : styles.relative
            }`}
        >
            {children}
            {visible && (
                <button
                    type="button"
                    className={`unstyledButton ${styles.paywall} ${paywallClassName}`}
                    onClick={onClickPaywall}
                >
                    {!onlyBlur && (
                        <div>
                            {isHDFCUser ? null : <Image src={Lock} />}
                            <h5>{paywallText}</h5>
                            <p>{paywallSubText}</p>
                        </div>
                    )}
                </button>
            )}
        </div>
    );
}
