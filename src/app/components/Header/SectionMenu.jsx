import { Menu } from "@mantine/core";
import { ChevronDown as ChevronSVG } from "assets/svgs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import {
    // useEffect,
    useState,
} from "react";
import { createSlug } from "utils/helpers";
import { useTrackEventMutation } from "services/tracking";
import styles from "./index.module.scss";

function MenuItem({
    title,
    description,
    slug,
    action = () => {},
    setSelectedOption = () => {},
    hideDescription = false,
    img_link: icon,
    type,
    id,
    // isMyFunction = false,
}) {
    const router = useRouter();
    const [trackEvent] = useTrackEventMutation();
    const handleMouseEnter = () => {
        setSelectedOption();
    };

    const handleTrackUserFunction = async (functionId) => {
        const payload = { function_id: functionId };
        await trackEvent({ payload });
    };

    return (
        <Menu.Item
            key={title}
            className={styles.menuItem}
            icon={null}
            onClick={() => {
                action();
                if (type === "function" && id) {
                    handleTrackUserFunction(id);
                }
                if (slug) router.push(createSlug(slug));
            }}
            onMouseEnter={handleMouseEnter}
            // style={{
            //     ...(isMyFunction
            //         ? { backgroundColor: "var(--primary-accent-1)" }
            //         : {}),
            // }}
        >
            <div className={styles.head}>
                {icon && <Image src={icon} width={20} height={20} />}
                <h4>{title}</h4>
                <ChevronSVG />
            </div>
            {description && !hideDescription && <p>{description}</p>}
        </Menu.Item>
    );
}

export function SectionMenu(props) {
    const {
        title,
        children,
        secondColumnChildren,
        hideDescription,
        isMsdemoSite,
    } = props;
    const auth = useSelector((state) => state?.auth);
    const [opened, setOpened] = useState(false);
    const sectionClass = title.toLowerCase();
    // const [selectedOption, setSelectedOption] = useState(null);
    const MenuButton = (
        <div
            key={title}
            className={`${styles.mainMenuBtn} ${styles[sectionClass]} ${
                opened ? styles.opened : ""
            }`}
        >
            <span>{title}</span>
            <ChevronSVG color="#BCBB9D" />
        </div>
    );
    // useEffect(() => {
    //     if (!opened) {
    //         if (children?.length > 0) {
    //             setSelectedOption(children[0]);
    //         }
    //     }
    // }, [opened]);

    return (
        <Menu position="bottom-start" opened={opened} onChange={setOpened}>
            <Menu.Target>{MenuButton}</Menu.Target>

            <Menu.Dropdown
                className={`${styles.dropdownMenu} ${styles[sectionClass]} ${
                    isMsdemoSite && styles.msDemoSite
                }`}
            >
                <div>
                    {children?.map((option) => (
                        <MenuItem
                            {...option}
                            hideDescription={hideDescription}
                            // setSelectedOption={() => setSelectedOption(option)}
                            isMyFunction={
                                option?.title === auth?.user?.function_name
                            }
                        />
                    ))}
                </div>
                {!!secondColumnChildren && (
                    <div>
                        {secondColumnChildren?.map((option) => (
                            <MenuItem
                                {...option}
                                hideDescription={hideDescription}
                                isMyFunction={
                                    option?.title === auth?.user?.function_name
                                }
                            />
                        ))}
                    </div>
                )}
                {/* {selectedOption && selectedOption?.children?.length > 0 && (
                    <div className={styles.subMenu}>
                        <p>SUBJECTS</p>
                        {selectedOption?.children?.map(
                            ({ title: t, description }) => (
                                <button
                                    type="button"
                                    className={`unstyledButton ${styles.subMenuItem}`}
                                >
                                    <h4>{t}</h4>
                                    <p>{description}</p>
                                </button>
                            ),
                        )}
                    </div>
                )} */}
            </Menu.Dropdown>
        </Menu>
    );
}
