'use client'
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import { Button } from "components/Button";
import { useState } from "react";
import styles from "./newroom.module.scss";
import { newsRoomData } from "utils/constants/about";
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
                        classNames={{
                            indicators: styles.indicators,
                            indicator: styles.indicator
                        }}
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
                                    <div>
                                    <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                        {team.time}</div>
                                    <Button>
                                        <div
                                            style={{
                                                alignItems: "center",
                                                display: "flex",
                                                justifyContent: "center",
                                                textAlign: "center"
                                            }}
                                        >
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="px" width="20" height="20" viewBox="0,0,300,150">
                                                    <g fill="#fa5252" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.33333,5.33333)"><path d="M41.4707,4.98633c-0.05424,0.00162 -0.10836,0.00619 -0.16211,0.01367h-13.80859c-0.54095,-0.00765 -1.04412,0.27656 -1.31683,0.74381c-0.27271,0.46725 -0.27271,1.04514 0,1.51238c0.27271,0.46725 0.77588,0.75146 1.31683,0.74381h10.37891l-15.43945,15.43945c-0.39185,0.37623 -0.54969,0.9349 -0.41265,1.46055c0.13704,0.52565 0.54754,0.93616 1.07319,1.07319c0.52565,0.13704 1.08432,-0.0208 1.46055,-0.41265l15.43945,-15.43945v10.37891c-0.00765,0.54095 0.27656,1.04412 0.74381,1.31683c0.46725,0.27271 1.04514,0.27271 1.51238,0c0.46725,-0.27271 0.75146,-0.77588 0.74381,-1.31683v-13.81055c0.05983,-0.43681 -0.07551,-0.87782 -0.37007,-1.20587c-0.29456,-0.32804 -0.71852,-0.5099 -1.15922,-0.49726zM12.5,8c-4.1245,0 -7.5,3.3755 -7.5,7.5v20c0,4.1245 3.3755,7.5 7.5,7.5h20c4.1245,0 7.5,-3.3755 7.5,-7.5v-10c0.00765,-0.54095 -0.27656,-1.04412 -0.74381,-1.31683c-0.46725,-0.27271 -1.04514,-0.27271 -1.51238,0c-0.46725,0.27271 -0.75146,0.77588 -0.74381,1.31683v10c0,2.5035 -1.9965,4.5 -4.5,4.5h-20c-2.5035,0 -4.5,-1.9965 -4.5,-4.5v-20c0,-2.5035 1.9965,-4.5 4.5,-4.5h10c0.54095,0.00765 1.04412,-0.27656 1.31683,-0.74381c0.27271,-0.46725 0.27271,-1.04514 0,-1.51238c-0.27271,-0.46725 -0.77588,-0.75146 -1.31683,-0.74381z"></path></g></g>
                                                </svg>
                                            </span>
                                            <span>Full Story</span>
                                        </div>
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
                            {
                                newsRoomData && newsRoomData.map( ( team ) => (
                                    <div key={team.id} >
                                        <div className={styles.imgContainer}>
                                            <Image
                                                src={`https://d1idiaqkpcnv43.cloudfront.net/${ team.logo_url }`}
                                                width={250}
                                                height={60}
                                                // layout="responsive"
                                                alt="team-memeber images"
                                                style={{ objectFit: "contain" }}
                                            />
                                            <div className={styles.about}>
                                                {team.title}
                                            </div>
                                        </div>
                                        <div className={styles.time}>
                                            <div style={{ color: "gray", textAlign: "center" }}>
                                                <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                {team.news_added}</div>
                                            <Button

                                            >
                                                <div
                                                    style={{
                                                        alignItems: "center",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        textAlign: "center"
                                                    }}
                                                >
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="px" width="20" height="20" viewBox="0,0,300,150">
                                                            <g fill="#fa5252" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.33333,5.33333)"><path d="M41.4707,4.98633c-0.05424,0.00162 -0.10836,0.00619 -0.16211,0.01367h-13.80859c-0.54095,-0.00765 -1.04412,0.27656 -1.31683,0.74381c-0.27271,0.46725 -0.27271,1.04514 0,1.51238c0.27271,0.46725 0.77588,0.75146 1.31683,0.74381h10.37891l-15.43945,15.43945c-0.39185,0.37623 -0.54969,0.9349 -0.41265,1.46055c0.13704,0.52565 0.54754,0.93616 1.07319,1.07319c0.52565,0.13704 1.08432,-0.0208 1.46055,-0.41265l15.43945,-15.43945v10.37891c-0.00765,0.54095 0.27656,1.04412 0.74381,1.31683c0.46725,0.27271 1.04514,0.27271 1.51238,0c0.46725,-0.27271 0.75146,-0.77588 0.74381,-1.31683v-13.81055c0.05983,-0.43681 -0.07551,-0.87782 -0.37007,-1.20587c-0.29456,-0.32804 -0.71852,-0.5099 -1.15922,-0.49726zM12.5,8c-4.1245,0 -7.5,3.3755 -7.5,7.5v20c0,4.1245 3.3755,7.5 7.5,7.5h20c4.1245,0 7.5,-3.3755 7.5,-7.5v-10c0.00765,-0.54095 -0.27656,-1.04412 -0.74381,-1.31683c-0.46725,-0.27271 -1.04514,-0.27271 -1.51238,0c-0.46725,0.27271 -0.75146,0.77588 -0.74381,1.31683v10c0,2.5035 -1.9965,4.5 -4.5,4.5h-20c-2.5035,0 -4.5,-1.9965 -4.5,-4.5v-20c0,-2.5035 1.9965,-4.5 4.5,-4.5h10c0.54095,0.00765 1.04412,-0.27656 1.31683,-0.74381c0.27271,-0.46725 0.27271,-1.04514 0,-1.51238c-0.27271,-0.46725 -0.77588,-0.75146 -1.31683,-0.74381z"></path></g></g>
                                                        </svg>
                                                    </span>
                                                    <span>Full Story</span>
                                                </div>
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
                                    heading: "Study now pay later by Eduvanz"

                                },
                                {
                                    id: 2,
                                    img: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsnmedia-yourstorytv.jpg",
                                    para: "How BNPL financing can transform learning",

                                    heading: "Study now pay later by Eduvanz"

                                },
                                {
                                    id: 3,
                                    img: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsnmedia-eduvanzfounderstalk.jpg",
                                    para: "Mass layoffs, offline classes: How edtech is coping with schools, colleges reopening",
                                    heading: "Study now pay later by Eduvanz"
                                }
                            ].map( ( team ) => (
                                <div key={team.id} className={styles.videoClipsWrapper}>
                                    <div className={styles.imgContainer}>
                                        <Image
                                            src={team.img}
                                            width={600}
                                            height={350}
                                            layout="responsive"
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