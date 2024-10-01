"use client";

// eslint-disable-next-line import/no-extraneous-dependencies
import { Carousel } from "@mantine/carousel";
import CourseCard from "components/CourseCard";
import ArrowLeft from "assets/svgs/CarouslArrowLeft.svg";
import ArrowRight from "assets/svgs/CarouslArrowRight.svg";
import { useEffect, useMemo, useState } from "react";
import { createStyles, rem, em, getBreakpointValue } from "@mantine/core";
import Image from "next/image";
// import Autoplay from "embla-carousel-autoplay";
import { addOrUpdateScript, getCourseSchedule } from "utils/helpers";
import styles from "./CoursesCarousal.module.scss";

const useStyles = createStyles((theme) => ({
    card: {
        height: "340px",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        color: theme.white,
        lineHeight: 1.2,
        fontSize: rem(32),
        marginTop: theme.spacing.xs,
    },

    category: {
        color: theme.white,
        opacity: 0.7,
        fontWeight: 700,
        textTransform: "uppercase",
    },
    container: {
        marginLeft: "16px",
        marginRight: "0px !important",
        [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.md))})`]:
            {
                marginLeft: "50px",
                marginRight: "50px",
            },

        [`@media (min-width: ${em(
            getBreakpointValue(theme.breakpoints.xxl),
        )})`]: {
            marginLeft: "161px",
            marginRight: "50px",
        },
    },
    controls: {
        display: "none",
        position: "absolute",
        top: "-81px",
        backgrounColor: "red",
        left: "80vw",
        width: "100px",

        [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.lg))})`]:
            {
                width: "fit-content",
                display: "flex",
                gap: "18px",
                // top: "-121px",
                left: "calc(100vw - 150px)",
            },

        [`@media (min-width: ${em(
            getBreakpointValue(theme.breakpoints.xxl),
        )})`]: {
            display: "flex",
            top: "-100px",
            left: "calc(100vw - 261px)",
        },
    },
    hideControls: {
        display: "none",
    },
}));

function Card({ item }) {
    return (
        <div className={styles.card}>
            <CourseCard item={item} />
        </div>
    );
}

const data = [
    {
        image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Best forests to visit in North America",
        category: "nature",
    },
    {
        image: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Hawaii beaches review: better than you think",
        category: "beach",
    },
    {
        image: "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Mountains at night: 12 best locations to enjoy the view",
        category: "nature",
    },
    {
        image: "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Aurora in Norway: when to visit for best experience",
        category: "nature",
    },
    {
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Best places to visit this winter",
        category: "tourism",
    },
    {
        image: "https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Active volcanos reviews: travel at your own risk",
        category: "nature",
    },
];

export default function CoursesCarousal({ courses, withJsonLd }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (courses) {
            setItems(courses);
        } else {
            setItems(data);
        }
    }, [courses]);

    const slides = useMemo(
        () =>
            items.map((item) => (
                <Carousel.Slide key={item.entity_name}>
                    <Card item={item} />
                </Carousel.Slide>
            )),
        [items],
    );

    useEffect(() => {
        if (withJsonLd && items?.length > 0) {
            const listItems = items.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                    "@type": "Course",
                    url: `https://www.wizr.in/${item?.slug}`,
                    name: item?.product_name,
                    description: item?.meta_course_description,
                    offers: [
                        {
                            "@type": "Offer",
                            category: "Paid",
                            priceCurrency: item?.currency_type,
                            price: item?.offer_price,
                        },
                    ],
                    hasCourseInstance: {
                        courseMode: {
                            "Instructor-led (Live)": {
                                Online: "Online",
                                Hybrid: "Blended",
                                "In-person (Offline)": "Onsite",
                            }[item?.course_delivery_mode],
                            Online: "Online",
                            Hybrid: "Blended",
                            "Self-paced (Recorded)": "Online",
                        }[item?.course_learning_mode],
                        ...getCourseSchedule(
                            item?.course_duration,
                            item?.duration_medium,
                            item?.course_learning_mode,
                            item?.course_delivery_mode,
                        ),
                    },
                    provider: {
                        "@type": "Organization",
                        name: item?.secondary_provider_name, // Institute name //
                        sameAs: `https://www.wizr.in${window?.location?.pathname}`, // Same as page URL
                    },
                },
            }));
            const json = {
                "@context": "https://schema.org",
                "@type": "ItemList",
                itemListElement: listItems,
            };
            addOrUpdateScript(json, "most-popular-courses-ld-json");
        }
        return () => {
            document?.getElementById("most-popular-courses-ld-json")?.remove();
        };
    }, [items, withJsonLd]);
    const { classes } = useStyles();
    // const autoplay = useRef(Autoplay({ delay: 2000 }));

    return (
        <div className={styles.coursesCarousalContainer}>
            <h2 className={styles.title}>Most Popular Courses</h2>
            <Carousel
                slideSize="30%"
                breakpoints={[
                    { maxWidth: "sm", slideSize: "80%", slideGap: "20px" },
                ]}
                classNames={{
                    controls:
                        items.length > 3
                            ? classes.controls
                            : classes.hideControls,
                    container: classes.container,
                }}
                slideGap="xl"
                align="start"
                slidesToScroll={1}
                nextControlIcon={<Image src={ArrowRight} alt="arrow_left" />}
                previousControlIcon={
                    <Image src={ArrowLeft} alt="arrow_right" />
                }
                containScroll="trimSnaps"
                // plugins={[autoplay.current]}
                // onMouseEnter={autoplay.current.stop}
                // onMouseLeave={autoplay.current.reset}
            >
                {slides}
            </Carousel>
        </div>
    );
}
