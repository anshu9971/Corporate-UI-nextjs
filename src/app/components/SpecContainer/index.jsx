import Image from "next/image";
import styles from "./SpecContainer.module.scss";

export default function SpecContainer({
    head,
    count,
    children,

    bg = "#fffffff",
    carousalCards = false,
    borderBtm = false,
    className = "",
}) {
    return (
        <div
            className={`${
                carousalCards
                    ? `${styles.learningContainer} ${styles.noHorizontalPad} ${
                          borderBtm && styles.borderBtm
                      }`
                    : `${styles.learningContainer} ${
                          borderBtm && styles.borderBtm
                      }`
            } ${className}`}
            id="container"
            style={{
                backgroundColor: bg,
            }}
        >
            <Image
                src={count}
                alt="count_icon"
                className={
                    carousalCards
                        ? `${styles.count} ${styles.horizontalPad}`
                        : styles.count
                }
            />
            <h2 className={styles.head}>{head}</h2>
            {children}
            {/* <Learning /> */}
        </div>
    );
}
