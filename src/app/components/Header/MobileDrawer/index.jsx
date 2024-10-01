import { Accordion, Drawer } from "@mantine/core";
import { useMemo } from "react";
import WizrLogo from "assets/svgs/wizrLogo.svg";
import CloseIcon from "assets/svgs/close_icon.svg";
import Image from "next/image";
import { Button } from "components/Button";
import RightChevron from "assets/svgs/white_chevron_right.svg";
import ProfileBG from "assets/svgs/profile_bg.svg";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createSlug } from "utils/helpers";
import { setSubjectRecommendation } from "redux/store/configSlice";
import { useLazyCorporateTokenGenerationQuery } from "services/sso";
import { useGetHeaderLinksQuery } from "services/microsite/master";
import { useTrackEventMutation } from "services/tracking";
import styles from "./MobileDrawer.module.scss";

const MENU = [
    {
        title: "Dashboard",
        children: [
            {
                title: "Personal Dashboard",
                slug: "/dashboard",
            },
            {
                title: "HR Dashboard",
                slug: "hr-dashboard",
            },
        ],
    },
];

export default function MobileDrawer({
    opened,
    close,
    isLoggedIn,
    onClickLogin,
    logoutUser,
    // isEmailVerified,
}) {
    const { push } = useRouter();
    const auth = useSelector((state) => state.auth);
    const pathname = usePathname();
    const hideHeaders =
        pathname?.startsWith("/marketing-campaign/learn-lead-form") ||
        pathname?.startsWith("/verify-email") ||
        pathname?.startsWith("/sso");

    const canAccessCorporatePortal = useMemo(
        () => auth?.user?.applicable_for_corporate_login === "yes",
        [auth],
    );

    const {
        data: {
            data: {
                data: {
                    header: headerLinks = [],
                    // corporate = {},
                    // sample_certificate_urls: sampleUrls,
                } = {},
            } = {},
        } = {},
    } = useGetHeaderLinksQuery(undefined, { skip: hideHeaders });

    const dispatch = useDispatch();

    const goToProfile = () => {
        push("/profile");
        close();
    };

    const [generateCorporateToken] = useLazyCorporateTokenGenerationQuery();
    const [trackEvent] = useTrackEventMutation();

    const handleCorporateRedirect = async () => {
        const { data: res } = await generateCorporateToken();
        const token = res?.data?.corporate_redirection_token;
        if (token) {
            setTimeout(() => {
                window.open(
                    `${process?.env?.NEXT_PUBLIC_CORPORATE_PORTAL_URL}/?isMobile=true&&sso_token=${token}`,
                    "_blank",
                );
            });
        }
    };

    const header = (
        <div className={styles.headerContent}>
            {isLoggedIn ? (
                <div className={styles.profileInfoContainer}>
                    <div className={styles.profileContainer}>
                        <Image
                            src={ProfileBG}
                            className={styles.profileBg}
                            onClick={goToProfile}
                        />
                        <span>
                            {auth.user?.first_name?.slice(0, 1)}
                            {auth.user?.last_name?.slice(0, 1)}
                        </span>
                        {/* <Image
                            src={EditIcon}
                            className={styles.edit}
                            onClick={goToProfile}
                        /> */}
                    </div>
                    <div className={styles.nameContainer}>
                        <h4 className={styles.name}>
                            {`${auth.user?.first_name} ${auth.user?.last_name}`}
                            {/* {!isEmailVerified && <Image src={Exclamation} />} */}
                        </h4>

                        <button
                            className={`unstyledButton ${styles.dashboardCTA}`}
                            type="button"
                            onClick={() => push("/profile") || close()}
                        >
                            View Profile
                        </button>
                    </div>
                    <Image
                        src={CloseIcon}
                        className={styles.close}
                        onClick={close}
                    />
                </div>
            ) : (
                <div className={styles.loginInfoContainer}>
                    <Image
                        src={WizrLogo}
                        alt="WiZr"
                        className={styles.wizrLogo}
                    />
                    <Image
                        src={CloseIcon}
                        className={styles.closeIcon}
                        onClick={close}
                    />
                    {/* <p>Discover your career with us today!</p> */}
                    <Button
                        variant="primary"
                        className={styles.loginButton}
                        onClick={() => {
                            close();
                            onClickLogin();
                        }}
                    >
                        Login
                        <Image src={RightChevron} />
                    </Button>
                </div>
            )}
        </div>
    );

    const handleTrackUserFunction = async (id) => {
        const payload = { function_id: id };
        await trackEvent({ payload });
    };

    return (
        <Drawer
            opened={opened}
            onClose={close}
            title={header}
            classNames={{
                body: styles.body,
                inner: styles.inner,
                header: styles.header,
                title: styles.title,
                content: styles.content,
            }}
            withCloseButton={false}
            className={styles.drawer}
        >
            <div className={styles.accordionContainer}>
                <Accordion>
                    {[...(headerLinks ?? []), ...MENU]?.map(
                        ({ title, children }) => (
                            <Accordion.Item value={title}>
                                <Accordion.Control>
                                    <h3 className={styles.title}>{title}</h3>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <div className={styles.linksContainer}>
                                        {children?.map(
                                            ({
                                                title: label,
                                                slug: route,
                                                action,
                                                subjectId,
                                                id,
                                            }) => (
                                                <button
                                                    type="button"
                                                    className={`unstyledButton ${styles.link}`}
                                                    style={
                                                        route ===
                                                            "hr-dashboard" &&
                                                        !canAccessCorporatePortal
                                                            ? {
                                                                  display:
                                                                      "none",
                                                              }
                                                            : {}
                                                    }
                                                    onClick={() => {
                                                        if (
                                                            title === "Learn" &&
                                                            id
                                                        ) {
                                                            handleTrackUserFunction(
                                                                id,
                                                            );
                                                        }

                                                        if (action) action();
                                                        if (
                                                            route ===
                                                            "hr-dashboard"
                                                        ) {
                                                            handleCorporateRedirect();
                                                        } else if (route) {
                                                            dispatch(
                                                                setSubjectRecommendation(
                                                                    {
                                                                        id: subjectId,
                                                                        name: label,
                                                                    },
                                                                ),
                                                            );
                                                            push(
                                                                createSlug(
                                                                    route,
                                                                ),
                                                            );
                                                            close();
                                                        }
                                                    }}
                                                >
                                                    {label}
                                                </button>
                                            ),
                                        )}
                                    </div>
                                </Accordion.Panel>
                            </Accordion.Item>
                        ),
                    )}
                </Accordion>
            </div>
            {isLoggedIn && (
                <div className={styles.footer}>
                    <Button
                        variant="primary"
                        className={styles.logoutButton}
                        onClick={() => close() || logoutUser()}
                    >
                        Logout
                    </Button>
                </div>
            )}
        </Drawer>
    );
}
