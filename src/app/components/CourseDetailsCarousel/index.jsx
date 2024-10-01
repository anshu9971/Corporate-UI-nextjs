import { Button } from "components/Button";
import Image from "next/image";
import { Carousel } from "@mantine/carousel";
import ArrowLeft from "assets/svgs/CarouslArrowLeft.svg";
import ArrowRight from "assets/svgs/CarouslArrowRight.svg";
import styles from "./CourseDetailsCarousel.module.scss";
import { useStyles } from "./styles";

export default function CourseDetailsCarousel({
    courses,
    handleFileChange,
    isLoading,
}) {
    const { classes } = useStyles();

    return (
        <div className={styles.coursesCarousalContainer}>
            <h2 className={styles.title}>Completed Courses</h2>
            <Carousel
                slideSize="30%"
                breakpoints={[
                    { maxWidth: "sm", slideSize: "80%", slideGap: "20px" },
                ]}
                classNames={{
                    controls: classes.controls,
                    container: classes.container,
                    control: classes.indicator,
                }}
                slideGap="xl"
                align="start"
                slidesToScroll={1}
                nextControlIcon={<Image src={ArrowRight} alt="arrow_left" />}
                previousControlIcon={
                    <Image src={ArrowLeft} alt="arrow_right" />
                }
                containScroll="trimSnaps"
            >
                {courses?.map((course) => (
                    <Carousel.Slide
                        key={course.cart_id?.toString()}
                        className={classes.slide}
                    >
                        <div className={styles.card} key={course.cart_id}>
                            <div className={styles.cardContainer}>
                                <div className={styles.logo}>
                                    {course?.course_logo ? (
                                        <Image
                                            src={course.course_logo}
                                            alt="logo"
                                            width={2000}
                                            height={1000}
                                        />
                                    ) : null}
                                </div>
                                <div className={styles.title}>
                                    {course.product_name}
                                </div>
                                <div className={styles.level}>
                                    {course.course_level || "Intermediate"}
                                </div>
                                {course.completed_certificate_path ? (
                                    <Button
                                        className={styles.cta}
                                        variant="primary"
                                        widthStyle="small"
                                        onClick={(e) => {
                                            window.open(
                                                course.completed_certificate_path,
                                                "_blank",
                                            );
                                            e.stopPropagation();
                                        }}
                                    >
                                        View certificate
                                    </Button>
                                ) : (
                                    <div className={styles.cta}>
                                        <Button
                                            variant="primary"
                                            widthStyle="small"
                                            onClick={(e) => {
                                                e.stopPropagation();

                                                const file =
                                                    document.getElementById(
                                                        `file-uploader-${course.cart_id}`,
                                                    );

                                                if (file) {
                                                    file.click();
                                                }
                                            }}
                                            loading={isLoading}
                                        >
                                            {course.completed_certificate_path
                                                ? "View certificate"
                                                : "Upload"}
                                            <input
                                                id={`file-uploader-${course.cart_id}`}
                                                type="file"
                                                accept="application/pdf,image/png,image/jpeg, image/jpg"
                                                style={{
                                                    display: "none",
                                                }}
                                                onChange={(e) =>
                                                    handleFileChange(e, course)
                                                }
                                            />
                                        </Button>
                                        <p
                                            style={{
                                                fontSize: "14px",
                                                color: "#545a7d",
                                                marginTop: "0.5rem",
                                            }}
                                        >
                                            (Certificate/ Proof of Completion)
                                        </p>
                                    </div>
                                )}
                            </div>
                            {/* <div className={styles.level}>{course.level}</div> */}
                        </div>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </div>
    );
}

//     return (
//         <div className={styles.sliderContainer}>
//             <Carousel
//                 w="100%"
//                 px="50px"
//                 withIndicators
//                 height={320}
//                 dragFree
//                 slideGap="md"
//                 align="start"
//                 slidesToScroll={3}
//                 nextControlIcon={
//                     courses?.length > 3 ? (
//                         <Image
//                             src={ArrowRight}
//                             alt="arrow_left"
//                             className={styles.control}
//                         />
//                     ) : null
//                 }
//                 previousControlIcon={
//                     courses?.length > 3 ? (
//                         <Image
//                             src={ArrowLeft}
//                             alt="arrow_right"
//                             className={styles.control}
//                         />
//                     ) : null
//                 }
//                 breakpoints={[
//                     {
//                         maxWidth: "sm",
//                         slideSize: "80%",
//                         slideGap: "20px",
//                     },
//                 ]}
//                 classNames={{
//                     control: classes.control,
//                     controls:
//                         courses?.length > 3
//                             ? classes.controls
//                             : classes.hideControls,

//                     container: classes.container,
//                     indicators: classes.indicators,
//                     indicator: classes.indicator,
//                 }}
//             >
//                 {courses?.map((course) => (
//                     <div className={styles.card} key={course.cart_id}>
//                         <div className={styles.cardContainer}>
//                             <div className={styles.logo}>
//                                 {course?.logo ? (
//                                     <Image src={course.logo} alt="logo" />
//                                 ) : null}
//                             </div>
//                             <div className={styles.title}>
//                                 {course.product_name}
//                             </div>
//                             <div className={styles.level}>
//                                 {course.level || "Intermediate"}
//                             </div>
//                             <Button
//                                 className={styles.cta}
//                                 variant="primary"
//                                 widthStyle="small"
//                                 onClick={() => {
//                                     // push("/completed-courses");
//                                 }}
//                             >
//                                 {course.completed_certificate_path
//                                     ? "View certificate"
//                                     : "Upload certificate"}
//                             </Button>
//                         </div>
//                         {/* <div className={styles.level}>{course.level}</div> */}
//                     </div>
//                 ))}
//             </Carousel>
//         </div>
//     );
// }
