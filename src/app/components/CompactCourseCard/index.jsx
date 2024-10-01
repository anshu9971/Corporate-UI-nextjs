/* eslint-disable camelcase */
// import Pill from "components/Pill";
import Image from "next/image";
// import compareLogo from "assets/svgs/compare_courses.svg";
// import Rating from "components/Rating";
// import likeIcon from "assets/svgs/like_icon.svg";
// import discountIcon from "assets/svgs/discount.svg";
// import discountIcon from "assets/svgs/discount.svg";
import { Button } from "components/Button";
import { formatWithCurrency } from "utils/constants";
import styles from "./CompactCourseCard.module.scss";

export default function CompactCourseCard({
    product_name = "",
    cpp_horizontal_logo,
    offer_price,
    onClickViewDetails = () => {},
    currency_type,
}) {
    return (
        <div className={styles.card}>
            <h1>{product_name}</h1>
            <Image src={cpp_horizontal_logo} height={26} width={84} />
            <div className={styles.ctaRow}>
                <div className={styles.price}>
                    <p>Total Cost:</p>
                    <h4>{formatWithCurrency(offer_price, currency_type)}/-</h4>
                </div>
                <Button variant="primary" onClick={onClickViewDetails}>
                    View details
                </Button>
            </div>
        </div>
    );
}
