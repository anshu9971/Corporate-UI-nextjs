import { Accordion } from "@mantine/core";
// import QrCode from "assets/images/app-qr-code.png";
// import AppStore from "assets/images/appStore.png";
import { useSelector } from "react-redux";
// import PartnerLogo from "assets/images/partnerLogo.png";
// import PlayStore from "assets/images/playStore.png";
import Plus from "assets/svgs/plus.svg";
import Logo from "assets/svgs/wizrLogo.svg";
import Facebook from "assets/svgs/facebook_logo.svg";
import Instagram from "assets/svgs/instagram_logo.svg";
// import Twitter from "assets/svgs/twitter_logo.svg";
import Twitter from "assets/images/twitter_logo.png";
import LinkedIn from "assets/svgs/linkedin_logo.svg";
import Threads from "assets/svgs/threads_logo.svg";
import Youtube from "assets/svgs/youtube_logo.svg";
import TM from "assets/svgs/trademark_icon.svg";
import splitArray from "components/LandingPageSections/LearnAnimatedComponents/ChooseSubject/splitArr";
import { useRouter } from "next/navigation";
// import { useGetSubjectsQuery } from "services/onboarding";
import { useGetFunctionsQuery } from "services/microsite/master";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { createSlug } from "utils/helpers";
import ArrowDown from "assets/svgs/black_arrow_down.svg";
import { PRIVACY_POLICY_LINK, TC_LINK } from "utils/constants";
import styles from "./index.module.scss";

const socialMedia = [
    {
        logo: Facebook,
        alt: "Facebook",
        url: "https://www.facebook.com/WizrIndia/",
    },
    {
        logo: Instagram,
        alt: "Instagram",
        url: "https://www.instagram.com/wizr_india/",
    },
    { logo: Twitter, alt: "Twitter", url: "https://twitter.com/WiZR_India" },
    {
        logo: Threads,
        alt: "Threads",
        url: "https://www.threads.net/@wizr_india",
    },
    {
        logo: LinkedIn,
        alt: "LinkedIn",
        url: "https://www.linkedin.com/company/wizr-india/",
    },
    {
        logo: Youtube,
        alt: "Youtube",
        url: "https://www.youtube.com/@WizrIndia",
    },
];

const SECTIONS = [
    {
        title: "Discover",
        linksList: [
            [
                {
                    label: "Mental Make-up Assessment",
                    route: "/discover/career-discovery",
                },
                {
                    label: "Skill Level Assessment",
                    route: "/discover/expertise-discovery",
                },
            ],
        ],
    },
    {
        title: "Learn",
        linksList: [
            [
                {
                    label: "IT & Development",
                    route: "/domain-detail/1",
                },
                {
                    label: "IT & Development",
                    route: "/domain-detail/1",
                },
                {
                    label: "IT & Development",
                    route: "/domain-detail/1",
                },
                {
                    label: "IT & Development",
                    route: "/domain-detail/1",
                },
            ],
            [
                {
                    label: "IT & Development",
                    route: "/domain-detail/1",
                },
                {
                    label: "IT & Development",
                    route: "/domain-detail/1",
                },
                {
                    label: "IT & Development",
                    route: "/domain-detail/1",
                },
                {
                    label: "IT & Development",
                    route: "/domain-detail/1",
                },
            ],
            [
                {
                    label: "IT & Development",
                    route: "/domain-detail/1",
                },
                {
                    label: "IT & Development",
                    route: "/domain-detail/1",
                },
                {
                    label: "IT & Development",
                    route: "/domain-detail/1",
                },
                {
                    label: "IT & Development",
                    route: "/domain-detail/1",
                },
                {
                    label: "IT & Development",
                    route: "/domain-detail/1",
                },
            ],
            [
                {
                    label: "IT & Development",
                    route: "/domain-detail/1",
                },
                {
                    label: "IT & Development",
                    route: "/domain-detail/1",
                },
                {
                    label: "IT & Development",
                    route: "/domain-detail/1",
                },
                {
                    label: "IT & Development",
                    route: "/domain-detail/1",
                },
            ],
            [
                {
                    label: "IT & Development",
                    route: "/domain-detail/1",
                },
                {
                    label: "IT & Development",
                    route: "/domain-detail/1",
                },
            ],
        ],
    },
    {
        title: "Finance",
        linksList: [
            [
                {
                    label: "Avail No-cost EMI",
                    route: "/finance",
                },

                // {
                //     label: "No-cost EMI Courses",
                //     route: "/collections/no-cost-emi-courses",
                // },
            ],
        ],
    },
    {
        title: "Grow",
        linksList: [
            [
                {
                    label: "WiZR Learners",
                    route: "/learners",
                },
                { label: "WiZR Voices", route: "/voices" },
                {
                    label: "WiZR Insights",
                    route: "/insights",
                },
                // {
                //     label: "WiZR Insights - Hindi",
                //     route: "https://www.wizr.in/hi/insights",
                // },
                { label: "Explore All", route: "/grow" },
            ],
        ],
    },
    // {
    //     title: "About WiZR",
    //     linksList: [
    //         [
    //             "About WiZR",
    //             "Meet the Leadership",
    //             "WiZR Career",
    //             "WiZR News",
    //             "Legal",
    //             "Our Investors",
    //             "Site Map",
    //             "FAQs",
    //         ],
    //     ],
    // },
];

const TnC = [
    { title: "Privacy policy", link: PRIVACY_POLICY_LINK },
    { title: "Terms & Conditions", link: TC_LINK },
    {
        title: "FAQs",
        route: "/faqs",
    },
    // {
    //     title: "Sitemap",
    //     route: "/html-sitemap",
    // },
    {
        title: (
            <>
                <span style={{ fontSize: "22px", marginTop: "2px" }}>©</span>
                <Image src={TM} alt="tm" width={18} height={18} />
                WiZR 2024.
            </>
        ),
        className: styles.trademark,
    },
];

function AccordionLinks({ menu = [] }) {
    const router = useRouter();
    return (
        <>
            {menu.map(({ title, linksList }) => (
                <Accordion
                    key={title}
                    className={styles.accordionLink}
                    chevron={<Image width={16} height={16} src={Plus} alt="" />}
                    styles={{
                        chevron: {
                            "&[data-rotate]": {
                                transform: "rotate(45deg)",
                            },
                        },
                        content: {
                            paddingLeft: "0",
                        },
                        control: {
                            "&:hover": {
                                backgroundColor: "transparent",
                            },
                        },
                    }}
                    transitionDuration={500}
                >
                    <Accordion.Item value={title}>
                        <Accordion.Control className={styles.control}>
                            <h4 className={styles.label}>{title}</h4>
                        </Accordion.Control>
                        <Accordion.Panel>
                            {linksList.map((links) => (
                                <div
                                    key={Math.random()}
                                    className={styles.columnSpace}
                                >
                                    {links.map((link) => (
                                        <button
                                            type="button"
                                            key={link.function_name}
                                            className={styles.linkLabel}
                                            onClick={() =>
                                                link.route &&
                                                router.push(
                                                    createSlug(link.route),
                                                )
                                            }
                                        >
                                            {link.label || link}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            ))}

            <div className={styles.footerNavWrapper}>
                {menu.slice(0, 4).map(({ title, linksList }) => (
                    <div className={styles.navSection} key={title}>
                        <div>{title}</div>

                        <div>
                            {linksList.map((links) => (
                                <div
                                    key={links.join("-")}
                                    className={
                                        links.length > 3 ? styles.pipeSpace : ""
                                    }
                                >
                                    {links.map((link) => (
                                        <button
                                            type="button"
                                            key={link.function_name}
                                            className={styles.linkLabel}
                                            onClick={() =>
                                                link.route &&
                                                router.push(
                                                    createSlug(link.route),
                                                )
                                            }
                                            style={{
                                                cursor: link.route
                                                    ? "pointer"
                                                    : "default",
                                            }}
                                        >
                                            {link.label || link}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export function Footer({ className, goTop = () => {} }) {
    const auth = useSelector((state) => state.auth);
    const router = useRouter();
    const { data } = useGetFunctionsQuery(
        { journey_type: "learn_journey" },
        { skip: !auth?.token },
    );

    const [menuCollection, setMenuCollection] = useState([]);
    const isMsdemo = useSelector(
        ({ global }) => global?.corporateData?.isMsdemo,
    );

    const subjectsData = useMemo(
        () =>
            data?.data?.data?.map((obj) => ({
                ...obj,
                route: obj.slug,
                label: obj.function_name,
            })) || [],
        [data?.data?.data],
    );

    const transformMenuObj = () => {
        const isBigDesktop = window?.innerWidth > 1470;
        const rowWiseOptions = splitArray(subjectsData, isBigDesktop ? 5 : 6);
        const learnObj = {
            title: "Learn",
            linksList: rowWiseOptions,
        };

        const clonedArr = [...SECTIONS];
        clonedArr.splice(1, 1, learnObj);

        setMenuCollection(clonedArr);
    };

    useEffect(() => {
        if (subjectsData.length > 0) {
            transformMenuObj();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subjectsData]);

    if (isMsdemo) return null;

    return (
        <div className={`${styles.footer} ${className || ""}`}>
            <div>
                <div>
                    <Image
                        className={styles.footerLogo}
                        width={200}
                        src={Logo}
                        alt="WiZR"
                    />

                    {/* <div className={styles.downloadApp}>
                        <div>
                            <h4>
                                Download the App <br />
                                now!
                            </h4>
                            <p>Available on all app stores</p>
                        </div>
                        <div className={styles.appStoreCtaWrapper}>
                            <Image src={QrCode} alt="QR Code" />
                            <Image src={AppStore} alt="" />
                            <Image src={PlayStore} alt="" />
                        </div>
                    </div> */}

                    <div className={styles.contactUs}>
                        <span>
                            <b>Powered by:</b>
                            <br />
                            <span>Educred Technology Private Limited</span>
                            <br />
                            <p style={{ margin: "8px 0px" }}>
                                Registered address: <br /> B/202, Times Square
                                Bldg, <br /> Opp, Mittal Industrial Estate{" "}
                                <br /> Andheri Kurla Road, Andheri East, Mumbai
                                City, Maharashtra, India, 400059
                            </p>
                            <p style={{ margin: "16px 0px" }}>
                                CIN : U93090MH2020PTC347290
                            </p>
                        </span>
                        <h4>Connect with us</h4>
                        <div className={styles.pipeSpace}>
                            {/* <span> */}{" "}
                            <a href="tel:022-41900000" className="telephone">
                                022-41900000
                            </a>
                            {/* </span>{" "} */}
                            <br />
                            <span>9 AM - 7 PM (Mon - Fri)</span>
                            <br />
                            <a
                                style={{ textDecoration: "underline" }}
                                href="mailto:service@wizr.in"
                            >
                                service@wizr.in
                            </a>
                        </div>
                        <div className={styles.socialMediaContainerMobile}>
                            {socialMedia?.map(({ logo, url, alt }) => (
                                <Image
                                    src={logo}
                                    alt={alt}
                                    width={33}
                                    height={33}
                                    onClick={() => window.open(url, "blank")}
                                />
                            ))}
                        </div>
                    </div>

                    {/* <div className={styles.partner}>
                        <Image src={PartnerLogo} alt="NSDC" />
                        <p>
                            Our Valuable <br /> Skilling <br /> Partner
                        </p>
                    </div> */}
                </div>
                <div>
                    {menuCollection.length > 0 && (
                        <AccordionLinks menu={menuCollection} />
                    )}
                </div>
            </div>

            <div className={styles.lastRowContainer}>
                {/* <div className={`${styles.pipeSpace} ${styles.aboutList}`}>
                    {menuCollection.length > 0 &&
                        menuCollection[4].linksList[0].map((text) => (
                            <span className={styles.bottomLinks}>{text}</span>
                        ))}
                </div> */}
                <div className={`${styles.pipeSpace} ${styles.tncContainer}`}>
                    {TnC.map((item) => (
                        <button
                            type="button"
                            onClick={() => {
                                if (item?.route) {
                                    router.push(createSlug(item.route));
                                } else if (item.link)
                                    window.open(item.link, "_blank");
                            }}
                            className={item.className}
                        >
                            <span>{item.title}</span>
                        </button>
                    ))}
                </div>
                <div className={styles.socialMediaContainerDesktop}>
                    {socialMedia?.map(({ logo, url, alt }) => (
                        <Image
                            src={logo}
                            alt={alt}
                            width={33}
                            height={33}
                            onClick={() => window.open(url, "blank")}
                        />
                    ))}
                </div>
            </div>
            <button
                className={`${styles.scrollToTop} unstyledButton`}
                type="button"
                onClick={() => {
                    goTop();
                    document.querySelector("body")?.scrollTo(0, 0);
                    document.querySelector("main")?.scrollTo(0, 0);
                }}
            >
                <Image
                    src={ArrowDown}
                    alt="scroll-to-top"
                    className={styles.scrollToTop}
                />
                <p> Scroll to top </p>
            </button>
        </div>
    );
}
