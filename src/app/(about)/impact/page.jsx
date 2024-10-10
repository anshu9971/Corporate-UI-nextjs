"use client";

import Image from "next/image";
import { impactStats, userReviewData } from "utils/constants/about";
import styles from "./impact.module.scss";

export default function Impact() {
    return (
        <div className={styles.container}>
            <section className={styles.section1}>
                <div className={styles.div2}>
                    <h2>OUR</h2>
                    <h1>IMPACT</h1>
                    <p>
                        We re democratising access to quality education. Over
                        the last few years, we have touched the lives of
                        thousands of students from hundreds of institutes across
                        India by helping them get low-cost & flexible education
                        finance.
                    </p>
                </div>
                <div>
                    <Image
                        src="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/our-impact-hero-img.png"
                        alt="about section image"
                        width={500}
                        height={600}
                        layout="responsive"
                    />
                </div>
            </section>
            <section className={styles.section2}>
                <div className={styles.statWrapper}>
                    {impactStats &&
                        impactStats.map((stat) => (
                            <div key={stat.id}>
                                <h4>{stat.heading}</h4>
                                <div>
                                    <Image
                                        src={stat.icon}
                                        alt={stat.heading}
                                        width={50}
                                        height={50}
                                    />
                                    <div>{stat.count}</div>
                                </div>
                            </div>
                        ))}
                </div>
            </section>
            <div className={styles.section3}>
                <h1>What our users have to say...</h1>
                <div>
                    {userReviewData.map((user) => (
                        <div key={user.id} className={styles.wrapper}>
                            <div className={styles.name}>
                                <Image
                                    src={user.image}
                                    alt={user.name}
                                    width={100}
                                    height={100}
                                />
                                <div>
                                    <h5>{user.name}</h5>
                                    <p>{user.company}</p>
                                </div>
                            </div>
                            <div className={styles.education}>
                                <div className={styles.course}>
                                    <h6>Institude</h6>
                                    <p>{user.institude}</p>
                                </div>
                                <div className={styles.course}>
                                    <h6>Course</h6>
                                    <p>{user.course}</p>
                                </div>
                            </div>
                            <p>
                                {user.para} 
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.section4}>
                <h1>CSR</h1>
                <div>
                    <Image
                        src="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/csr-img.png"
                        alt="about section image"
                        width={300}
                        height={300}
                        // layout="responsive"
                        className={styles.csrImage}
                    />
                    <p>
                        Even though Simarjeet Kaur scored 449 out of 500, she
                        was unsure of continuing her studies due to the poor
                        financial condition of her family. My dream is to
                        become an IAS officer one day, said Simarjeet Kaur who
                        hails from Budhlada, a small town in Punjab. We came
                        across Simarjeet&quot;s story via an Indian Express Article.
                        When we spoke to her, Simarjit was proud of her
                        achievement, but also constrained that she would not be
                        able to pursue her dream. Eduvanz decided to help the
                        hardworking & ambitious girl at all costs the moment the
                        story was published, in line with our motto of Fuelling
                        the career growth of young India!
                    </p>
                </div>
            </div>
        </div>
    );
}
