'use client'
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import { Button } from "components/Button";
import { useState } from "react";
import styles from "./newroom.module.scss";
export default function NewRoom() {
    const [ activeTab, setActiveTab ] = useState( "news" );
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
                                time: "May 30 2022"
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
            <div className={styles.tabContainer}>
                <div>
                    <div
                        style={{
                            borderBottom: activeTab === "news" && "5px solid #09c",
                            color: activeTab === "news" && "#09c",
                        }}
                        onClick={() => setActiveTab( "news" )}
                    >
                        News
                    </div>
                    <div
                        style={{
                            borderBottom: activeTab === "videoclip" && "5px solid #09c",
                            color: activeTab === "videoclip" && "#09c",
                        }}
                        onClick={() => setActiveTab( "videoclip" )}
                    >
                        VIDEO CLIPS
                    </div>
                </div>
            </div>
            {
                activeTab === "news" ? (
                    <section className={styles.section6}>
                        <div>
                            <h1>News</h1>
                        </div>
                        <div className={styles.teamsContainer}>
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
                                {
                                    id: 4,
                                    img: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsroom/79/TOI.1.jpg",
                                    para: "Eduvanz wins Best FinTech company in Education at BW Businessworld Awards 2022",
                                    time: ""
                                },
                                {
                                    id: 5,
                                    img: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsroom/77/financialexpress.jpg",
                                    para: "How BNPL financing can transform learning",
                                    time: "May 30 2022"
                                },
                                {
                                    id: 6,
                                    img: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsroom/75/Msn%20logo.jpg",
                                    para: "Mass layoffs, offline classes: How edtech is coping with schools, colleges reopening",
                                    time: "May 17 2022"
                                },
                                {
                                    id: 7,
                                    img: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsroom/74/business-standard-logo.png",
                                    para: "Eduvanz wins Best FinTech company in Education at BW Businessworld Awards 2022",
                                    time: ""
                                },
                                {
                                    id: 8,
                                    img: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsroom/73/Hindu%20logo.png",
                                    para: "How BNPL financing can transform learning",
                                    time: "May 30 2022"
                                },
                                {
                                    id: 9,
                                    img: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsroom/72/new_logo_insight.png",
                                    para: "Mass layoffs, offline classes: How edtech is coping with schools, colleges reopening",
                                    time: "May 17 2022"
                                },
                                {
                                    id: 10,
                                    img: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsroom/66/newsnmedia-logo-livemint.jpg",
                                    para: "Eduvanz wins Best FinTech company in Education at BW Businessworld Awards 2022",
                                    time: ""
                                },
                                {
                                    id: 11,
                                    img: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsroom/67/Hindustan_Times_HT.png",
                                    para: "How BNPL financing can transform learning",
                                    time: "May 30 2022"
                                },
                                {
                                    id: 12,
                                    img: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsroom/69/cnbc.png",
                                    para: "Mass layoffs, offline classes: How edtech is coping with schools, colleges reopening",
                                    time: "May 17 2022"
                                },
                            ].map( ( team ) => (
                                <div key={team.id} >
                                    <div className={styles.imgContainer}>
                                        <Image
                                            src={team.img}
                                            width={250}
                                            height={60}
                                            // layout="responsive"
                                            alt="team-memeber images"
                                            style={{ objectFit: "contain" }}
                                        />
                                        <div className={styles.about}>
                                            {team.para}
                                        </div>
                                    </div>
                                    <div className={styles.time}>
                                        <div>{team.time}</div>
                                        <Button>
                                            Full Story
                                        </Button>
                                    </div>
                                </div>
                            ) )}
                        </div>
                    </section>
                ) : (
                    <section className={styles.videoClips}>
                    <div>
                        <h1>Video Clips</h1>
                    </div>
                    <div className={styles.videoClipsContainer}>
                        {[
                            {
                                id: 1,
                                img: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsmedia-budget2021.jpg",
                                para: "Hear more from Varun Chopra the CEO of Eduvanz",
                                heading:"Study now pay later by Eduvanz"

                            },
                            {
                                id: 2,
                                img: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsnmedia-yourstorytv.jpg",
                                para: "How BNPL financing can transform learning",
                                 
                                heading:"Study now pay later by Eduvanz"

                            },
                            {
                                id: 3,
                                img: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsnmedia-eduvanzfounderstalk.jpg",
                                para: "Mass layoffs, offline classes: How edtech is coping with schools, colleges reopening",
                                heading:"Study now pay later by Eduvanz"
                            }
                        ].map( ( team ) => (
                            <div key={team.id} className={styles.videoClipsWrapper}>
                                <div className={styles.imgContainer}>
                                    <Image
                                        src={team.img}
                                        width={600}
                                        height={350}
                                        // layout="responsive"
                                        alt="team-memeber images"
                                        style={{ objectFit: "contain" }}
                                    />
                                    
                                </div>
                                <div className={styles.videoClipsContent}>
                                    <div>
                                        <h3>
                                            {team.heading}
                                        </h3>
                                        <p>
                                            {team.para}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) )}
                        </div>
                    </section>
                )
            }
           
        </div>
    )

}