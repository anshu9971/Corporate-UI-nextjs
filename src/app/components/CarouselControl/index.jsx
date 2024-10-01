import Image from "next/image";
import ArrowIcon from "assets/svgs/back-icon.svg";
import { forwardRef, useCallback } from "react";
import gsap from "gsap";
import styles from "./CarouselControl.module.scss";

export const CarouselControl = forwardRef((props, ref) => {
    const scroll = useCallback(
        (type = "right") => {
            switch (type) {
                case "left":
                    gsap.to(ref.current, {
                        scrollLeft: "-=100px",
                    });
                    break;
                case "right":
                    gsap.to(ref.current, {
                        scrollLeft: "+=100px",
                    });
                    break;
                default:
                    break;
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ref.current],
    );
    return (
        <div className={styles.cardControls}>
            <Image onClick={() => scroll("left")} src={ArrowIcon} alt="back" />
            <Image onClick={() => scroll("right")} src={ArrowIcon} alt="next" />
        </div>
    );
});
