import Image from "next/image";
import FlightSticker from "assets/svgs/flightSticker.svg";
import ProfileImage from "assets/images/profileImage.png";
import styles from "./StackCarousal.module.scss";

const STACK_CAROUSAL_DATA = {
    head: "Hear from Wizr Leaders",
    subHead:
        "Get insights and advice from experts in the industry on the importance of skilling courses.",
    slides: [
        {
            icon: FlightSticker,
            head: " Stay ahead in this rapidly changing job market!",
            profile: "Ravindra Nagpurkar, Chief Technology Officer",
            content: `“In today&apos;s rapidly changing job market,
            skilling courses are essential for staying
            relevant and competitive. They provide you with
            the latest skills and knowledge that employers
            are looking for.”`,
            profileImg: ProfileImage,
        },
        {
            icon: "",
            head: "",
            profile: "",
            content: ``,
            profileImg: "",
        },
        {
            icon: "",
            head: "",
            profile: "",
            content: ``,
            profileImg: "",
        },
    ],
};

export default function StackCarousal() {
    return (
        <section className={styles.stackCarousalContainer}>
            <div className={styles.stackCarousal}>
                <div className={styles.content}>
                    <h2>{STACK_CAROUSAL_DATA.head}</h2>
                    <p>{STACK_CAROUSAL_DATA.subHead}</p>
                </div>
                <div className={styles.carousal}>
                    <div className={styles.slidesContainer}>
                        {STACK_CAROUSAL_DATA.slides.map((slide, idx) => (
                            <div
                                className={styles.slide}
                                key={String(idx) + styles.slide}
                            >
                                {slide?.icon && (
                                    <Image
                                        src={slide?.icon}
                                        alt="flight_sticker_icon"
                                        className={styles.flightIcon}
                                    />
                                )}
                                <h2>{slide.head}</h2>
                                <h3>{slide.profile}</h3>
                                <p>{slide.content}</p>
                                {slide?.profileImg && (
                                    <div className={styles.profileImage}>
                                        <Image
                                            src={slide?.profileImg}
                                            alt="profile_image_icon"
                                            className={styles.profileImg}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={styles.controls}>
                        <div className={styles.control} />
                        <div className={styles.control} />
                        <div className={styles.control} />
                        <div className={styles.control} />
                    </div>
                </div>
            </div>
        </section>
    );
}
