import { Accordion, Checkbox } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Close from "assets/svgs/close_icon.svg";
// import { useGetFilterListMutation } from "services/listingServices";
import styles from "./FilterBox.module.scss";
import { useStyles } from "./styles";

export default function FilterBox({
    applyFilter,
    activeFilters,
    availableFilters,
    hideInstitueFilter,
}) {
    // console.log("Filter BOx rendered");
    const { classes } = useStyles();
    const [close, setClose] = useState(true);
    const [width, setWidth] = useState(1300);

    useEffect(() => {
        if (!window) return;
        setWidth(window.innerWidth);
    }, []);

    const preSelectKeys = useMemo(
        () => Object.entries(activeFilters)?.map(([key]) => key) || [],
        [activeFilters],
    );

    const getAvailableFilters = () => {
        if (hideInstitueFilter) {
            return availableFilters.filter((el) => el.key !== "institute");
        }
        return availableFilters;
    };

    return (
        <div
            className={width < 1024 && close ? styles.sticky : styles.container}
        >
            <button
                type="button"
                onClick={() => setClose(false)}
                className={
                    width < 1024 && close
                        ? styles.stickyBtn
                        : styles.stickyVanish
                }
            >
                All filters
            </button>
            <div
                className={
                    width < 1024 && close
                        ? styles.vanishFilterBox
                        : styles.filterBox
                }
            >
                <h2 className={styles.title}>Filters</h2>
                <button
                    type="button"
                    onClick={() => setClose(true)}
                    className={styles.cancel}
                >
                    <Image src={Close} alt="cancel_icon" />
                </button>
                <div className={styles.filters}>
                    <Accordion
                        classNames={{
                            chevron: classes.chevron,
                            label: classes.label,
                            content: classes.content,
                        }}
                        multiple
                        defaultValue={[
                            "course_level",
                            "rating",
                            "duration",
                            ...preSelectKeys,
                        ]}
                    >
                        {getAvailableFilters()?.map((filter) => (
                            <Accordion.Item
                                className={styles.accordionCategory}
                                value={filter.key}
                            >
                                <Accordion.Control>
                                    {filter.label}
                                </Accordion.Control>
                                <Accordion.Panel>
                                    {filter?.values?.length &&
                                        filter.values.map((filterItem) => (
                                            <Checkbox.Group
                                                value={
                                                    activeFilters[filter.key] ||
                                                    []
                                                }
                                                onChange={(value) => {
                                                    if (
                                                        filter?.key ===
                                                            "zero_cost_finance" &&
                                                        value.length === 2
                                                    ) {
                                                        applyFilter(
                                                            filter.key,
                                                            [value[1]],
                                                        );
                                                    } else {
                                                        applyFilter(
                                                            filter.key,
                                                            value,
                                                        );
                                                    }
                                                }}
                                            >
                                                <div
                                                    className={
                                                        styles.filterInput
                                                    }
                                                >
                                                    <Checkbox
                                                        value={
                                                            filterItem?.option_value
                                                        }
                                                        label={
                                                            filterItem?.option_label
                                                        }
                                                        classNames={{
                                                            label: classes.itemlabel,
                                                            icon: classes.itemIcon,
                                                        }}
                                                    />

                                                    {filter.key === "rating" &&
                                                        filterItem?.icon && (
                                                            <Image
                                                                className={
                                                                    styles.stars
                                                                }
                                                                src={
                                                                    filterItem?.icon
                                                                }
                                                                alt={
                                                                    filterItem?.icon
                                                                }
                                                            />
                                                        )}
                                                </div>
                                            </Checkbox.Group>
                                        ))}
                                </Accordion.Panel>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
