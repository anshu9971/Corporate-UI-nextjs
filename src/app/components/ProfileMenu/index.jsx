import { Menu } from "@mantine/core";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import ProfilePhoto from "assets/svgs/profile-placeholder.svg";
import Exclamation from "assets/svgs/error_exclamation_circle_red.svg";
import Image from "next/image";
import { useLazyCorporateTokenGenerationQuery } from "services/sso";
import styles from "../Header/index.module.scss";

export function ProfileMenu({
    isMenuOpened = false,
    setIsMenuOpened = () => {},
    logoutUser = () => {},
    isEmailVerified,
}) {
    const auth = useSelector((state) => state.auth);
    const isAccountActive = useMemo(() => auth.user?.profile_completed, [auth]);
    // const isMsdemo = useSelector(
    //     ({ global }) => global?.corporateData?.isMsdemo,
    // );

    const canAccessCorporatePortal = useMemo(
        () => auth?.user?.applicable_for_corporate_login === "yes",
        [auth],
    );

    const { push } = useRouter();
    const [generateCorporateToken] = useLazyCorporateTokenGenerationQuery();
    const handleCorporateRedirect = async () => {
        const { data: res } = await generateCorporateToken();
        const token = res?.data?.corporate_redirection_token;
        if (token) {
            window.open(
                `${process?.env?.NEXT_PUBLIC_CORPORATE_PORTAL_URL}/?sso_token=${token}`,
                "_blank",
            );
        }
    };
    return (
        <Menu opened={isMenuOpened} onChange={setIsMenuOpened}>
            <Menu.Target>
                <button
                    type="button"
                    className={`${styles.profileBtn} ${styles.primary}`}
                    onClick={() => {
                        setIsMenuOpened(true);
                    }}
                >
                    {auth.user?.first_name ? (
                        <span>
                            {auth.user?.first_name?.slice(0, 1)?.toUpperCase()}
                            {auth.user?.last_name?.slice(0, 1)?.toUpperCase()}
                        </span>
                    ) : (
                        <Image
                            style={{
                                position: "relative",
                            }}
                            src={ProfilePhoto}
                            alt="placeholder"
                        />
                    )}
                    {!isEmailVerified && (
                        <Image
                            src={Exclamation}
                            className={styles.exclamation}
                        />
                    )}
                </button>
            </Menu.Target>

            <Menu.Dropdown className={styles.profileDropdownMenu}>
                {isAccountActive ? (
                    <Menu.Item
                        className={styles.profileDropdownMenuItemContainer}
                        icon={null}
                        onClick={() => {
                            push("/dashboard");
                        }}
                    >
                        <div className={styles.profileDropdownMenuItem}>
                            <h4>Personal Dashboard</h4>
                        </div>
                    </Menu.Item>
                ) : null}

                {canAccessCorporatePortal ? (
                    <Menu.Item
                        className={styles.profileDropdownMenuItemContainer}
                        icon={null}
                        onClick={handleCorporateRedirect}
                    >
                        <div className={styles.profileDropdownMenuItem}>
                            <h4>HR Dashboard</h4>
                        </div>
                    </Menu.Item>
                ) : null}
                {isAccountActive ? (
                    <Menu.Item
                        className={styles.profileDropdownMenuItemContainer}
                        icon={null}
                        onClick={() => {
                            push("/profile");
                        }}
                    >
                        <div className={styles.profileDropdownMenuItem}>
                            <h4>View Profile</h4>
                            {/* {!isEmailVerified && <Image src={Exclamation} />} */}
                        </div>
                    </Menu.Item>
                ) : null}

                {/* <Menu.Item
                    className={styles.profileDropdownMenuItemContainer}
                    icon={null}
                    onClick={() => {
                        push("/dashboard/my-courses");
                    }}
                >
                    <div className={styles.profileDropdownMenuItem}>
                        <h4>My Courses</h4>
                    </div>
                </Menu.Item> */}
                <Menu.Item
                    className={styles.profileDropdownMenuItemContainer}
                    icon={null}
                    onClick={logoutUser}
                >
                    <div className={styles.profileDropdownMenuItem}>
                        <h4>Logout</h4>
                    </div>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
