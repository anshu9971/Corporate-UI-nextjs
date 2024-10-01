"use client";

// import { SearchIcon } from "assets/svgs";
import CallIcon from "assets/svgs/ph_phone_light.svg";
import CallIconFilled from "assets/svgs/phone_icon_filled.svg";
import { TextInput } from "components/TextInput";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "utils/hooks/useOnClickOutside";
import Image from "next/image";
import { useSelector } from "react-redux";
import styles from "./SearchbarWithButton.module.scss";
import SearchMenu from "../SearchMenu";

// const searchButtonVariants = {
//     visible: {
//         backgroundColor: "#161C20",
//     },
//     hidden: { backgroundColor: "rgba(203, 251, 98, 1)" },
// };

export function SearchbarWithButton({ onInputVisibleToggle }) {
    const inputRef = useRef(false);
    const [inputVisible, setInputVisible] = useState(false);
    const [searchText, setSearchText] = useState("");
    const inputControls = useAnimationControls();
    const searchBarContainerRef = useRef(null);
    const searchMenuRef = useRef(null);
    const isMsdemo = useSelector(
        ({ global }) => global?.corporateData?.isMsdemo,
    );

    useEffect(() => {
        setSearchText("");
        onInputVisibleToggle(inputVisible);
        inputControls.start({
            width: inputVisible ? "100%" : 0,
            transition: { duration: 0.25, ease: "easeOut" },
        });
        if (inputVisible) {
            inputRef.current?.focus?.();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputControls, inputVisible]);

    useOnClickOutside(searchBarContainerRef, () => {
        setInputVisible(false);
    });
    const onSelectOption = useCallback(() => {
        setSearchText("");
        setInputVisible(false);
    }, []);

    const searchAllResults = useCallback((text) => {
        if (text?.length) {
            searchMenuRef.current.searchAllResults(
                `/search?q=${encodeURIComponent(text)}`,
            );
        }
    }, []);
    return (
        <div
            ref={searchBarContainerRef}
            className={`${styles.searchBar} ${
                inputVisible ? styles.inputVisible : ""
            }`}
        >
            {!inputVisible && !isMsdemo && (
                <div className={styles.callUs}>
                    <a href="tel:022-41900000">
                        <span className={styles.number}>022-41900000</span>
                        <Image className={styles.callIcon} src={CallIcon} />
                        <Image
                            className={styles.callIconFilled}
                            src={CallIconFilled}
                        />
                    </a>
                </div>
            )}
            <AnimatePresence>
                {inputVisible && (
                    <motion.div
                        className={styles.inputWrapper}
                        initial={{
                            width: 0,
                        }}
                        animate={inputControls}
                    >
                        <TextInput
                            spellCheck="false"
                            ref={inputRef}
                            value={searchText}
                            enterKeyHint="search"
                            onChange={(e) => {
                                const text = e.target.value?.replace(
                                    / +/g,
                                    " ",
                                );
                                setSearchText(text);
                                searchMenuRef.current.fetchSearchProducts(text);
                            }}
                            onKeyDown={(e) => {
                                if (e.code === "Enter" || e.key === "Enter") {
                                    searchAllResults(searchText);
                                }
                            }}
                            radius="xl"
                            size="xs"
                            placeholder="Search for anything"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            {/* <motion.div
                initial="hidden"
                animate={inputVisible ? "visible" : "hidden"}
                variants={searchButtonVariants}
                onClick={() => {
                    setInputVisible((prevState) => !prevState);
                    searchAllResults(searchText);
                }}
                className={styles.searchIcon}
            >
                <SearchIcon color={inputVisible ? "#CBFB62" : "#000000"} />
            </motion.div> */}
            <AnimatePresence>
                {inputVisible && (
                    <SearchMenu
                        ref={searchMenuRef}
                        onSelectOption={onSelectOption}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
