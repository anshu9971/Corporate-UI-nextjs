import ratingFilled from "assets/svgs/rating_filled.svg";
import ratingEmpty from "assets/svgs/rating_empty.svg";
import Image from "next/image";
import styles from "./Rating.module.scss";

export default function Rating({
    rating = 0,
    multiline = false,
    monostar = false,
}) {
    const stars = [1, 2, 3, 4, 5];
    return (
        <div className={styles.rating}>
            {!multiline && rating !== 0 && <h4>{rating}</h4>}
            {multiline && (
                <div className={styles.textContainer}>
                    <h1>
                        4.5<span>/5</span>
                    </h1>
                    <p>By 12,987 Users</p>
                </div>
            )}
            {monostar ? (
                <Image
                    src={ratingFilled}
                    alt="rating"
                    className={`${multiline} ? ${styles.multilineImg} : ""`}
                />
            ) : (
                stars.map((star) => (
                    <Image
                        src={rating >= star ? ratingFilled : ratingEmpty}
                        alt="rating"
                        className={`${multiline} ? ${styles.multilineImg} : ""`}
                    />
                ))
            )}
        </div>
    );
}
