import Image from "next/image";
import Arrow from "assets/svgs/back_icon.svg";
import { useHorizontalScrollControls } from "utils/hooks/useScrollControls";
import styles from "./HorizontalScrollControls.module.scss";

export default function HorizontalScrollControls({ refToControl }) {
    const [
        scrollLeft,
        scrollRight,
        canScrollLeft,
        canScrollRight,
        isScrollable,
    ] = useHorizontalScrollControls(refToControl, {
        scrollOffset: 343,
        smooth: true,
    });
    if (!refToControl) return null;
    if (!isScrollable) return null;
    return (
        <div className={styles.controls}>
            <Image
                src={Arrow}
                alt="previous"
                onClick={scrollLeft}
                style={{
                    opacity: canScrollLeft ? 1 : 0.4,
                    cursor: canScrollLeft ? "pointer" : "not-allowed",
                }}
            />
            <Image
                src={Arrow}
                alt="next"
                onClick={scrollRight}
                style={{
                    opacity: canScrollRight ? 1 : 0.4,
                    cursor: canScrollRight ? "pointer" : "not-allowed",
                }}
            />
        </div>
    );
}
