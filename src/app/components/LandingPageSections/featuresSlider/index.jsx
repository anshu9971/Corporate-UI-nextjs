import Styles from "./featuresSlider.module.scss";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";

function FeatureSlide({ item }) {
    return (
        <div className={Styles.slideSection}>
            <div className={Styles.slideHeader}>
                <h1>{item.header}</h1>
                <h4>{item.subHeader}</h4>
            </div>
            <div className={Styles.slideContainer}>
                <div className={Styles.slideContent}>
                    {item.bullets.map((bullet) => {
                        return (
                            <div>
                                <h2>{bullet.text}</h2>
                                <h5>{bullet.subText}</h5>
                            </div>
                        );
                    })}
                </div>
                <div className={Styles.slideImage}>
                    <Image
                        src={item.image}
                        alt={item.header}
                        height={260}
                        width={260}
                    />
                </div>
            </div>
        </div>
    );
}

import { FEATURES_SLIDERS } from "utils/constants/landingPage";

function FeaturesSLider() {
    return (
        <section style={{ backgroundColor: "#f3fafc" }}>
            <Carousel withIndicators className={Styles.Carousel}>
                {FEATURES_SLIDERS.map((item, i) => {
                    return (
                        <Carousel.Slide key={i}>
                            <FeatureSlide item={item} />
                        </Carousel.Slide>
                    );
                })}
            </Carousel>
        </section>
    );
}

export default FeaturesSLider;
