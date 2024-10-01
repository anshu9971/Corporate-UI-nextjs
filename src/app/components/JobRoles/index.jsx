import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import ArrowRight from "assets/images/ArrowRight.png";
import splitArray from "components/LandingPageSections/LearnAnimatedComponents/ChooseSubject/splitArr";
import { randomIntFromInterval } from "utils/helpers";
import { motion } from "framer-motion";
import { Tooltip } from "@mantine/core";
import styles from "./JobRoles.module.scss";

export const COLORS = [
    {
        id: 1,
        bgColor: "var(--learn-purple-4)",
        fontColor: "#FFFFFF",
    },
    {
        id: 2,
        bgColor: "var(--learn-purple-2)",
        fontColor: "#403D46",
    },
    {
        id: 3,

        bgColor: "#B5CECD",
        fontColor: "#2D3737",
    },
    {
        id: 4,
        bgColor: "#BACFE8",
        fontColor: "#403D46",
    },
    {
        id: 5,
        bgColor: "#C0C0C0",
        fontColor: "#403D46",
    },
    {
        id: 6,
        bgColor: "#C0C0C0",
        fontColor: "#403D46",
    },

    {
        id: 7,
        bgColor: "var(--learn-purple-2)",
        fontColor: "#403D46",
    },

    {
        id: 8,
        bgColor: "var(--learn-purple-4)",
        fontColor: "#fff",
    },

    {
        id: 9,
        bgColor: "#C0C0C0",
        fontColor: "#403D46",
    },
    {
        id: 10,
        bgColor: "var(--discover-brick-1)",
        fontColor: "#43332D",
    },
    {
        id: 11,
        bgColor: "var(--discover-brick-1)",
        fontColor: "#43332D",
    },
    {
        id: 12,
        bgColor: "#C0C0C0",
        fontColor: "#403D46",
    },
    {
        id: 13,
        bgColor: "#FEEC8D",
        fontColor: "#575131",
    },
    {
        id: 14,
        bgColor: "var(--discover-brick-1)",
        fontColor: "#43332D",
    },

    {
        id: 15,
        bgColor: "#BACFE8",
        fontColor: "#2E3A46",
    },
    {
        id: 16,
        bgColor: "#C0C0C0",
        fontColor: "#403D46",
    },

    {
        id: 17,
        bgColor: "#B5CECD",
        fontColor: "#2D3737",
    },
    {
        id: 18,
        bgColor: "#FEEC8D",
        fontColor: "#575131",
    },
    {
        id: 19,
        bgColor: "var(--learn-purple-4)",
        fontColor: "#FFFFFF",
    },
    {
        id: 20,
        bgColor: "var(--learn-purple-2)",
        fontColor: "#403D46",
    },
    {
        id: 21,
        bgColor: "#B5CECD",
        fontColor: "#2D3737",
    },

    {
        id: 22,
        bgColor: "#BACFE8",
        fontColor: "#403D46",
    },
];

export default function JobRoles({ roles = [] }) {
    // eslint-disable-next-line no-unused-vars
    const [showAllJobRoles, setShowAllJobRoles] = useState(false);
    const [rolesCollection, setRolesCollection] = useState([]);
    // const [rolesCollectioRes, setRolesCollectionRes] = useState([]);

    const ref = useRef(null);
    const [scrollFlags, setScrollFlags] = useState({
        atStartPosition: true,
        atEndPosition: false,
    });

    useEffect(() => {
        if (roles?.length) {
            const twoDCollectionDesk = splitArray(
                roles?.map((item) => ({
                    item,
                    colorIdx: Math.floor(Math.random() * 22),
                })),
                2,
            );
            let newRoleRes = [...roles];
            if (newRoleRes.length > 5) {
                newRoleRes.splice(5, 1);
                newRoleRes = newRoleRes.concat("Show All");
            }
            setRolesCollection(twoDCollectionDesk);
            // setRolesCollectionRes(newRoleRes);
        }
    }, [roles]);

    function updateScrollFlags(event) {
        const node = event?.target ?? ref.current;
        const atStartPosition = node.scrollLeft <= 0;
        const atEndPosition =
            node.scrollLeft + 1 >= node.scrollWidth - node.clientWidth;

        if (
            scrollFlags.atStartPosition !== atStartPosition ||
            scrollFlags.atEndPosition !== atEndPosition
        ) {
            setScrollFlags({
                atStartPosition,
                atEndPosition,
            });
        }
    }

    // const handleArrowClick = (direction) => {
    //     sideScroll(ref.current, 25, 100, 10 * direction);
    // };

    // router.push(`/domain-detail/${item.id}

    // const onPillClick = (item) => {
    //     if (item === "Show All") {
    //         setShowAllJobRoles(true);
    //     }
    // };

    return (
        <>
            <div className={styles.jobRolesContainer}>
                <div
                    ref={ref}
                    className={styles.rolesContainer}
                    onScroll={updateScrollFlags}
                >
                    {rolesCollection?.map((row) => (
                        <div
                            className={styles.rolesRow}
                            style={{
                                paddingRight: "20%",
                            }}
                        >
                            {row.map(({ colorIdx, item }) => (
                                <Tooltip.Floating
                                    label={item}
                                    disabled={item?.length < 30}
                                >
                                    <div
                                        // href={`/domain-detail/${item.id}`}
                                        className={styles.role}
                                    >
                                        <motion.div
                                            initial={{
                                                rotate: randomIntFromInterval(
                                                    -10,
                                                    15,
                                                ),
                                            }}
                                            key={item}
                                            style={{
                                                backgroundColor:
                                                    COLORS[colorIdx]?.bgColor,
                                                y: 0,
                                            }}
                                            className={styles.rolePill}
                                        >
                                            <p
                                                style={{
                                                    color: COLORS[colorIdx]
                                                        ?.fontColor,
                                                }}
                                            >
                                                {item}
                                            </p>
                                        </motion.div>
                                    </div>
                                </Tooltip.Floating>
                            ))}
                        </div>
                    ))}

                    {/* {rolesCollectioRes?.map((item) => {
                        const colorIdx = Math.floor(Math.random() * 22);

                        return (
                            <Tooltip.Floating label={item} defaultChecked>
                                <button
                                    type="button"
                                    onClick={() => onPillClick(item)}
                                    className={styles.resRole}
                                    key={item}
                                >
                                    <motion.div
                                        initial={{
                                            rotate: randomIntFromInterval(
                                                -10,
                                                10,
                                            ),
                                        }}
                                        key={item.label}
                                        style={{
                                            backgroundColor:
                                                COLORS[colorIdx].bgColor,
                                            y: 0,
                                        }}
                                        className={styles.rolePill}
                                    >
                                        <p
                                            style={{
                                                color: COLORS[colorIdx]
                                                    .fontColor,
                                            }}
                                        >
                                            {item}
                                        </p>
                                    </motion.div>
                                </button>
                            </Tooltip.Floating>
                        );
                    })} */}
                </div>
            </div>
            {/* {roles.length > 2 && (
                <div className={styles.arrows}>
                    <Image
                        src={ArrowRight}
                        onClick={() => handleArrowClick(-1)}
                        alt="arrow-left"
                        style={{
                            pointerEvents: scrollFlags.atStartPosition
                                ? "none"
                                : "all",
                            opacity: scrollFlags.atStartPosition ? 0.5 : 1,
                        }}
                    />
                    <Image
                        src={ArrowRight}
                        onClick={() => handleArrowClick(1)}
                        alt="arrow-right"
                        style={{
                            pointerEvents: scrollFlags.atEndPosition
                                ? "none"
                                : "all",
                            opacity: scrollFlags.atEndPosition ? 0.5 : 1,
                        }}
                    />
                </div>
            )} */}
            {/* <div className={styles.allJobRolesContainer}>
            <div className={styles.allJobRoles}></div>
        </div> */}
        </>
    );
}
