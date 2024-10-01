// import Pill from "components/Pill";
// import { RightArrow } from "assets/svgs";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import styles from "./CareerRecommendationCard.module.scss";

export function CareerRecommendationCard({ title, description, icon, traits }) {
    // const { push } = useRouter();

    return (
        <div className={styles.card}>
            {/* <Pill className={styles.pill} title={`${matchPercentage}% Match`} /> */}
            <div className={styles.firstLine}>
                {icon && (
                    <Image
                        className={styles.icon}
                        src={icon}
                        width={162}
                        height={162}
                    />
                )}
                <p className={styles.tag}>FUNCTION</p>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            {traits?.length > 0 && (
                <ul>
                    {traits?.map((trait) => (
                        <li>{trait}</li>
                    ))}
                </ul>
            )}

            {/* <button
                className={styles.courseCTA}
                type="button"
                onClick={() => push(slug)}
            >
                <span>Explore courses</span> <RightArrow color="white" />
            </button> */}
            {/* <Button
                    onClick={() =>
                        push(`/subdomain-detail/${subjectId}/${roleId}`)
                    }
                >
                    Start learning
                    <Image src={ArrowRight} />
                </Button>{" "} */}
        </div>
    );
}
