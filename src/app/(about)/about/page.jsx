"use client";

import Image from "next/image";
import { Button } from "components/Button";
import { TeamsData } from "utils/constants/about";
import { Carousel } from "@mantine/carousel";
import styles from "./about.module.scss";

export default function About() {
    return (
        <div className={styles.container}>
            <section className={styles.story}>
                <div>
                    <Image
                        src="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/map.png"
                        alt="about section image"
                        width={500}
                        height={600}
                        layout="responsive"
                    />
                </div>
                <div className={styles.div2}>
                    <h1>THE EDUVANZ STORY</h1>
                    <p>Supporting the Success of Learners & Leaders</p>
                    <p>
                        Eduvanz is a digital Fintech NBFC that helps learners
                        discover and finance their learning and career goals
                        with fast, convenient, and affordable no-cost financing
                        solutions.
                    </p>
                    <p>
                        Founded in 2016 to provide convenient and flexible
                        financial assistance, Eduvanz caters to students and
                        leaders seeking quick results, attractive benefits, and
                        transparent conversations.
                    </p>
                </div>
            </section>
            <section className={styles.section2}>
                <div>
                    <h1>Brand Purpose</h1>
                    <p>
                        Make the world more productive by enabling every
                        individual to learn and grow.
                    </p>
                </div>
            </section>

            <section className={styles.section3}>
                <div>
                    <h1>Leadership Team</h1>
                    <p>
                        Our brand purpose is steered by a visionary leadership
                        team, passionately driving the evolution of education,
                        and empowering the next generation of leaders.
                    </p>
                </div>
                <div className={styles.teamsContainer}>
                    {TeamsData.map((team) => (
                        <div key={team.id} className={styles.wrapper}>
                            <Image
                                src={team.img}
                                width={142}
                                height={184}
                                layout="responsive"
                                alt="team-memeber images"
                            />
                            <div className={styles.teamInfo}>
                                <div className={styles.name}>
                                    {team.name &&
                                        team.name.split(" ") &&
                                        team.name.split(" ")[0]}{" "}
                                    <span>Chopra</span>
                                </div>
                                <div className={styles.position}>
                                    {team.positon}
                                </div>
                                <div className={styles.experiences}>
                                    <span>{team.experience} years</span>{" "}
                                    experience
                                </div>
                                <div className={styles.about}>{team.about}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.section4}>
                <div>
                    <h1>CRISIL</h1>
                    <p>
                        Eduvanz has been rated by CRISIL Limited and enjoys BBB-
                        (minus) rating for Long-Term borrowings.
                    </p>
                    <Button variant="filled">Know More</Button>
                </div>
            </section>
            <div className={styles.section5}>
                <h1>PROUD MOMENTS</h1>
                <div>
                    <Carousel
                        withIndicators
                        height={200}
                        dragFree
                        slideSize="100%"
                        withControls={false}
                        // classNames={styles}
                        loop
                        slidesToScroll={1}
                    >
                        <Carousel.Slide className={styles.slide}>
                            <Image
                                src="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/about/top30-new.png"
                                alt=""
                                width={380}
                                height={200}
                                // layout="responsive"
                            />
                            <Image
                                src="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/about/top-30-new-2.png"
                                alt=""
                                width={380}
                                height={200}
                                // layout="responsive"
                            />
                        </Carousel.Slide>
                        <Carousel.Slide>
                            <Image
                                src="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/about/Champions-of-change1.png"
                                alt=""
                                width={380}
                                height={200}
                                // layout="responsive"
                            />
                            <Image
                                src="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/about/Proud-Moment-Champions1.png"
                                alt=""
                                width={380}
                                height={200}
                                // layout="responsive"
                            />
                        </Carousel.Slide>
                        <Carousel.Slide>
                            <Image
                                src="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/about/wharton-win1.png"
                                alt=""
                                width={380}
                                height={200}
                                // layout="responsive"
                            />
                            <Image
                                src="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/about/Proud-Moment---wharton-win1.png"
                                alt=""
                                width={380}
                                height={200}
                                // layout="responsive"
                            />
                        </Carousel.Slide>
                    </Carousel>
                </div>
            </div>

            <section className={styles.section6}>
                <div>
                    <h1>Newsroom</h1>
                    <div className={styles.sperator}>
                        <div />
                    </div>

                    <p>Noticed by some renowned news agency & media</p>
                </div>
                <div className={styles.teamsContainer}>
                    {[
                        {
                            id:1,
                            img:"https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsroom/81/bwedulogo.png",
                            para:"Eduvanz wins Best FinTech company in Education at BW Businessworld Awards 2022",
                            time:""
                        },
                        {
                            id:2,
                            img:"https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsroom/80/finexpress.jpg",
                            para:"How BNPL financing can transform learning",
                            time:"May 30 2022"
                        },
                        {
                            id:3,
                            img:"https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsroom/78/Print.1.jpg",
                            para:"Mass layoffs, offline classes: How edtech is coping with schools, colleges reopening",
                            time:"May 17 2022"
                        },
                    ].map((team) => (
                        <div key={team.id} >
                            <Image
                                src={team.img}
                                width={150}
                                height={124}
                                layout="responsive"
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
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
