"use client";

import Image from "next/image";
import { Button } from "components/Button";
import { TeamsData } from "utils/constants/teams";
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
                                    {team.name && team.name.split(" ") && team.name.split(" ")[0] } <span>Chopra</span>
                                </div>
                                <div className={styles.position}>
                                    {team.positon}
                                </div>
                                <div className={styles.experiences}>
                                    <span>{team.experience} years</span> experience
                                </div>
                                <div 
                                className={styles.about}
                                >{team.about}</div>
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
        </div>
    );
}
