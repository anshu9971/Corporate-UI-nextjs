'use client'
import { Carousel } from "@mantine/carousel";
import styles from "./newroom.module.scss";
import { Button } from "@mantine/core";
import Image from "next/image";
export default function NewRoom() {
    return (
        <div className={styles.container}>
            <div className={styles.section1}>
                <div className={styles.headingContainer}>
                    <h1>NEWSROOM</h1>
                    <p>Explore what leading media houses have said about Eduvanz's journey so far.</p>
                </div>
                <div className={styles.carouselContainer}>
                    <Carousel
                        withIndicators
                        dragFree
                        slideSize="100%"
                        withControls={false}
                        // classNames={styles}
                        loop
                        slidesToScroll={1}
                    >
                        {[
                            {
                                id: 1,
                                img: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsroom/81/bwedulogo.png",
                                para: "Eduvanz wins Best FinTech company in Education at BW Businessworld Awards 2022",
                                time: ""
                            },
                            {
                                id: 2,
                                img: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsroom/80/finexpress.jpg",
                                para: "How BNPL financing can transform learning",
                                time: "May 30 2022"
                            },
                            {
                                id: 3,
                                img: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsroom/78/Print.1.jpg",
                                para: "Mass layoffs, offline classes: How edtech is coping with schools, colleges reopening",
                                time: "May 17 2022"
                            },
                        ].map( ( team ) => (
                            <Carousel.Slide className={styles.slide} key={team.id}>
                                <Image
                                    src={team.img}
                                    width={485}
                                    height={80}
                                    // layout="responsive"
                                    alt="team-memeber images"
                                />
                                <div className={styles.about}>
                                    {team.para}
                                </div>
                                <div className={styles.time}>
                                    <div>{team.time}</div>
                                    <Button>
                                        Full Story
                                    </Button>
                                </div>
                            </Carousel.Slide>
                        ) )}
                    </Carousel>
                </div>
            </div>

        </div>
    )
}