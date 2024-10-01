import Image from "next/image";
import SealCheck from "assets/svgs/seal_check.svg";
import { useCallback } from "react";
import { formatWithCurrency } from "utils/constants";
import Rating from "../../../Rating";
import styles from "../../Comparison.module.scss";

const SEAL_CHECKED_PROPS = [
    "zero_cost_finance",
    "placement_assistance",
    "scholarship",
    "type_of_certification",
    "course_level",
    "course_delivery_mode",
];

export function Field({ type, value, courseDetail = {}, window }) {
    const format = (amount) =>
        formatWithCurrency(amount, courseDetail?.currency_type);
    const renderFields = useCallback(() => {
        switch (type) {
            case "offer_price":
                return (
                    <div className={styles.price}>
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {courseDetail?.price_on_request ? (
                            <p className={styles.priceOnRequestText}>
                                Price on request
                            </p>
                        ) : courseDetail.min_avi_emi ? (
                            <>
                                <p>Starting from</p>
                                <span>{format(courseDetail.min_avi_emi)}</span>
                                <span>/m</span>
                                <p>Or pay: {format(value)}/-</p>
                            </>
                        ) : (
                            format(value)
                        )}
                    </div>
                );
            case "course_eligibility":
                return value ?? "Information Not Available";
            case "average_ratings":
                return <Rating rating={value} />;
            case "merchant_logo_url": {
                const val =
                    courseDetail?.institute_horizontal_logo ||
                    courseDetail?.cpp_horizontal_logo;
                return (
                    <div className={styles.logo}>
                        <Image
                            {...(val ? { src: val } : {})}
                            width={window < 800 ? 72 : 113}
                            height={window < 800 ? 10 : 64}
                            alt={val ?? "Information Not Available"}
                            className={styles.logo}
                        />
                    </div>
                );
            }
            case "is_low_cost_emi":
                return String(value).toLowerCase() === "yes"
                    ? "Available"
                    : "Not Available";
            case "course_syllabus":
                return (
                    <ul style={{ maxWidth: "99%" }}>
                        {value?.split("<br>").map((text) => (
                            <li style={{ marginBottom: 5 }}>{text}</li>
                        ))}
                    </ul>
                );
            case "course_duration":
                return `${String(value).padStart(
                    2,
                    "0",
                )} ${courseDetail.duration_medium?.toLowerCase()}`;
            case "what_will_you_learn":
                return (
                    <ul style={{ maxWidth: "99%" }}>
                        {value?.map(({ concept }) => (
                            <li style={{ marginBottom: 5 }}>{concept}</li>
                        ))}
                    </ul>
                );
            case "course_faculty": {
                let newValue = value;
                if (value && typeof value === "string") {
                    newValue = JSON.parse(value);
                }
                return newValue?.length && Array.isArray(newValue) ? (
                    <ul style={{ maxWidth: "99%" }}>
                        {newValue?.map((text) => (
                            <li style={{ marginBottom: 5 }}>{text.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles.emptyValue}>
                        Information Not Available
                    </p>
                );
            }
            default:
                return typeof value === "number"
                    ? format(value)
                    : value || "Information Not Available";
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        type,
        value,
        courseDetail.product_sfid,
        courseDetail.merchant_product_sfid,
        window,
    ]);

    return (
        <div className={styles.value}>
            {SEAL_CHECKED_PROPS.includes(type) && (
                <Image
                    src={SealCheck}
                    alt="seal_checked"
                    className={styles.sealLogo}
                />
            )}
            {renderFields()}
        </div>
    );
}
