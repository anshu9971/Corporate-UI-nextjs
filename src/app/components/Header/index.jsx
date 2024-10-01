"use client";

// import AnimatedLogo from "assets/gifs/wizrLogoCharcoalTransparent.gif";
import MenuIcon from "assets/images/menu-icon.png";
import Logo from "assets/svgs/wizrHeaderLogo.svg";
import Faq from "assets/svgs/faq.svg";
// import AdityaBirlaLogo from "assets/images/ABC.png";
// import Cross from "assets/images/red-cross.png";
import { Button } from "components/Button";
// import { SearchbarWithButton } from "components/SearchbarWithButton";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
// import { MENU_LINKS } from "utils/constants/header";
import splitArray from "components/LandingPageSections/LearnAnimatedComponents/ChooseSubject/splitArr";
// import { useGetSubjectsQuery } from "services/onboarding";
import { RegistrationModal } from "components/RegistrationModal";
import { useDispatch, useSelector } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import { logout } from "redux/store/authSlice";
import { storage } from "services/storage";
import { navigateToNearestOpenRoute } from "utils/helpers";
import {
    setFunctionsList,
    // setSubjectsList
} from "redux/store/configSlice";
// import { useReadUserQuery } from "services/readUser";
import {
    useGetFunctionsQuery,
    useGetHeaderLinksQuery,
} from "services/microsite/master";
import { useLazyLogoutQuery } from "services/microsite/auth";
import { setCorporateData } from "redux/store/globalSlice";
import { isEmpty } from "lodash";
import { SectionMenu } from "./SectionMenu";
import styles from "./index.module.scss";
import { ProfileMenu } from "../ProfileMenu";
import { InactiveAccountModal } from "../InactiveAccountModal";
import MobileDrawer from "./MobileDrawer";
import { SearchbarWithButton } from "../SearchbarWithButton";
// import { WhatsappContact } from "../WhatsappContact";

export function Header() {
    const dispatch = useDispatch();
    const { push } = useRouter();
    const auth = useSelector((state) => state.auth);
    const pathname = usePathname();
    const [startRegistration, setStartRegistration] = useState(false);
    const [menuCollection, setMenuCollection] = useState([]);
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
    const [inactiveAccountModalOpen, setInactiveAccountModalOpen] =
        useState(false);
    const [isDrawerOpen, { open: openDrawer, close: closeDrawer }] =
        useDisclosure(false);
    const [performLogOut] = useLazyLogoutQuery();
    const isLoggedIn = useMemo(() => !!auth.token, [auth]);
    const isPhoneVerified = useMemo(() => !!auth.isPhoneVerified, [auth]);
    const isMsdemoSite = useSelector(
        ({ global }) => global?.corporateData?.isMsdemo,
    );

    const hideHeaders =
        pathname?.startsWith("/marketing-campaign/learn-lead-form") ||
        pathname?.startsWith("/verify-email") ||
        pathname?.startsWith("/sso") ||
        pathname?.startsWith("/product-recommendations");

    const hideFaqs =
        pathname?.startsWith("/abc-faqs") ||
        pathname?.startsWith("/faqs") ||
        pathname?.startsWith("/course") ||
        pathname?.startsWith("/product-recommendations") ||
        isMsdemoSite;

    const skipRegistration = [
        "/sso",
        "/terms-and-conditions",
        "/privacy-policy",
        "/product-recommendations",
        "/product-recommendations/product",
        "/feedback",
    ].includes(pathname);

    const isProductRecommendationPage = [
        "/product-recommendations",
        "/product-recommendations/product",
    ].includes(window.location.pathname);

    // const { data: userData } = useReadUserQuery(
    //     { userId: auth?.user?.id },
    //     {
    //         skip: !auth?.user?.id,
    //         refetchOnFocus: true,
    //         refetchOnMountOrArgChange: true,
    //         refetchOnReconnect: true,
    //     },
    // );
    // const isEmailVerified = userData?.data?.data?.is_email_verified === 1;

    const navigateToRoot = () => {
        if (isProductRecommendationPage) return true;
        if (pathname === "/") {
            return window.location.reload();
        }
        return push("/");
    };

    useEffect(() => {
        if (!auth?.user?.id && !skipRegistration) {
            setStartRegistration(true);
        } else if (!isPhoneVerified && !skipRegistration) {
            setStartRegistration(true);
        }
    }, [auth]);

    useEffect(() => {
        if (!isPhoneVerified && !skipRegistration) {
            setStartRegistration(true);
        }
    }, [pathname, isPhoneVerified, skipRegistration]);

    useEffect(() => {
        const gifImageNode = document.querySelector(`.${styles.animatedLogo}`);
        const staticImageNode = document.querySelector(`.${styles.logo}`);

        function pauseGif() {
            staticImageNode.style.opacity = "";
            gifImageNode.style.display = "";
        }

        function playGif() {
            staticImageNode.style.opacity = 0;
            gifImageNode.style.display = "unset";
        }

        playGif();
        setTimeout(pauseGif, 10 * 1000);
    }, []);

    // const { data } = useGetSubjectsQuery({ journey_type: "learn_journey" });
    const { data: functionsRes } = useGetFunctionsQuery(undefined, {
        skip: !auth?.token,
    });
    const {
        data: {
            data: {
                data: {
                    header: headerLinks = [],
                    corporate = {},
                    sample_certificate_urls: sampleUrls,
                } = {},
            } = {},
        } = {},
    } = useGetHeaderLinksQuery(undefined, { skip: hideHeaders });

    useEffect(() => {
        const isMsdemo = window?.location?.href?.includes("demo.wizr.in");
        if (!isEmpty(corporate)) {
            dispatch(setCorporateData({ ...corporate, sampleUrls, isMsdemo }));
        }
    }, [corporate, sampleUrls]);
    // const subjectsData = useMemo(
    //     () => data?.data?.data || [],
    //     [data?.data?.data],
    // );

    const functionsData = useMemo(
        () => functionsRes?.data?.data || [],
        [functionsRes?.data?.data],
    );
    const transformMenuObj = () => {
        const rowWiseOptions = splitArray(
            [
                ...((headerLinks?.find((item) => item?.title === "Learn") ?? {})
                    ?.children ?? []),
            ],
            2,
        );
        const learnObj = {
            title: "Learn",

            children: isMsdemoSite
                ? (headerLinks?.find((item) => item?.title === "Learn") ?? {})
                      ?.children
                : rowWiseOptions?.[0] ?? [],
            secondColumnChildren: isMsdemoSite
                ? undefined
                : rowWiseOptions?.[1] ?? [],
            hideDescription: true,
        };
        const clonedArr = [...headerLinks];
        clonedArr.splice(1, 1, learnObj);
        setMenuCollection(clonedArr);
    };

    const onClickLogin = () => {
        setStartRegistration(true);
    };

    const logoutUser = useCallback(() => {
        performLogOut();
        dispatch(logout());
        storage.destroy.all();
        navigateToNearestOpenRoute();
    }, [dispatch]);

    const redirectToFaqPage = () => {
        push("/abc-faqs");
    };

    // useEffect(() => {
    //     if (subjectsData.length > 0) {
    //         dispatch(setSubjectsList(subjectsData));
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [subjectsData]);

    useEffect(() => {
        if (functionsData.length > 0) {
            dispatch(setFunctionsList(functionsData));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [functionsData]);

    useEffect(() => {
        if (headerLinks?.length > 0) {
            transformMenuObj();
        }
    }, [headerLinks]);

    const closeInactiveAccountModal = useCallback(() => {
        setInactiveAccountModalOpen(false);
    }, []);

    const onInputVisibleToggle = useCallback(
        (searchBarState) => setIsSearchBarVisible(searchBarState),
        [],
    );

    return (
        <div
            className={`global-header ${styles.header} 
            ${isSearchBarVisible ? styles.fullWidth : ""}
            ${isProductRecommendationPage ? styles.productRecomHeader : ""}
            `}
        >
            {!hideFaqs && (
                <Image
                    style={pathname === "/" && { bottom: "50px" }}
                    className={styles.faqLink}
                    onClick={redirectToFaqPage}
                    src={Faq}
                    width={60}
                    height={60}
                    alt="faq"
                />
            )}

            <div
                className={`${styles.logoContainer} ${
                    isSearchBarVisible ? styles.hide : ""
                }`}
            >
                <Image
                    className={styles.logo}
                    src={corporate?.combine_static_logo ?? Logo}
                    alt="WiZR"
                    width={1000}
                    height={1000}
                    onClick={navigateToRoot}
                />
                <Image
                    className={styles.animatedLogo}
                    src={corporate?.combine_motion_logo ?? Logo}
                    width={1000}
                    height={1000}
                    alt=""
                />
            </div>
            <div className={styles.links}>
                {!hideHeaders && menuCollection.length
                    ? menuCollection.map((item) => (
                          <SectionMenu {...item} isMsdemoSite={isMsdemoSite} />
                      ))
                    : null}
            </div>
            <div className={styles.searchContainer}>
                {!hideHeaders && (
                    <>
                        <SearchbarWithButton
                            onInputVisibleToggle={onInputVisibleToggle}
                        />
                        <div className={styles.mobileMenu}>
                            <Image
                                className={styles.menu}
                                src={MenuIcon}
                                alt="menu"
                                onClick={openDrawer}
                            />
                        </div>
                        <div className={styles.desktopMenu}>
                            {isLoggedIn ? (
                                <ProfileMenu
                                    isMenuOpened={isMenuOpened}
                                    setIsMenuOpened={setIsMenuOpened}
                                    logoutUser={logoutUser}
                                    isEmailVerified
                                    // ={isEmailVerified}
                                />
                            ) : (
                                <Button
                                    variant="primary"
                                    className={styles.loginCta}
                                    onClick={onClickLogin}
                                >
                                    Login
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </div>
            {startRegistration && (
                <RegistrationModal
                    fromHeader
                    startProcess={startRegistration}
                    closeModal={() => setStartRegistration(false)}
                    showInactiveAccountModal={() => {
                        setStartRegistration(false);
                        setInactiveAccountModalOpen(true);
                    }}
                    flow="login"
                />
            )}
            <InactiveAccountModal
                isVisible={inactiveAccountModalOpen}
                closeModal={closeInactiveAccountModal}
            />
            <MobileDrawer
                opened={isDrawerOpen}
                close={closeDrawer}
                isLoggedIn={isLoggedIn}
                onClickLogin={onClickLogin}
                logoutUser={logoutUser}
                isEmailVerified
                // ={isEmailVerified}
            />
            {/* <WhatsappContact /> */}
        </div>
    );
}
