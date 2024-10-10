import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import styles from "./hero.module.scss";
import Autoplay from "embla-carousel-autoplay";
import Typewriter from "typewriter-effect";

export default function Hero() {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
    return (
        <div className={styles.carousel}>
            <div className={styles.embla} ref={emblaRef}>
                <div className={styles.emblaContainer}>
                    <div className={styles.emblaSlide}>
                        <div>
                            <div className={styles.firstSlideContent}>
                                <h1 className={styles.heading}>Smart Loans</h1>
                                <br />
                                <h1 className={styles.headingAgain}>
                                    to Accelerate
                                </h1>
                                <br />
                                <h1 className={styles.headingAgain}>
                                    Your Career
                                </h1>
                                <br />
                                <h3 className={styles.typeWriter}>
                                    <span>as</span>
                                    <span>
                                        <Typewriter
                                            options={{
                                                strings: [
                                                    "a Financial Analyst",
                                                    "a Developer",
                                                    "a Data Scientist",
                                                    "a Designer & More",
                                                ],
                                                autoStart: true,
                                                loop: true,
                                                cursor: "",
                                            }}
                                        />
                                    </span>
                                </h3>
                                <button className={styles.applyButton}>
                                    Apply Now
                                </button>
                            </div>
                        </div>
                        <div>
                            <img
                                src={
                                    "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/landing-screen-desktop.png"
                                }
                                alt="Hero1"
                            />
                        </div>
                    </div>
                    <div className={styles.emblaSlide}>
                        <img
                            className={styles.desktop}
                            style={{ width: "100%" }}
                            src={
                                "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/exalt-banner.gif"
                            }
                            alt="Hero2"
                        />
                        /
                        <img
                            className={styles.mobile}
                            style={{ width: "100%" }}
                            src="	https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/exalt-banner-mob.gif"
                            alt="Hero2"
                        />
                    </div>
                    <div className={styles.emblaSlide}>
                        <img
                            className={styles.desktop}
                            style={{ width: "100%" }}
                            src={
                                "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/Beware-of-Frauds.png"
                            }
                            alt="Hero3"
                        />
                        <img
                            className={styles.mobile}
                            style={{ width: "100%" }}
                            src={
                                "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/Mobile-Banner-Beware-of-Frauds.png"
                            }
                            alt="Hero3"
                        />
                    </div>
                    <div className={styles.emblaSlide}>
                        <img
                            className={styles.desktop}
                            style={{ width: "100%" }}
                            src={
                                "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/Desktop-Charted.png"
                            }
                            alt="Hero4"
                        />
                        <img
                            className={styles.mobile}
                            style={{ width: "100%" }}
                            src="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/Mobile-Charted.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
