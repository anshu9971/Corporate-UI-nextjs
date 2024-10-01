import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RangeSlider, Tabs } from "@mantine/core";
import { isEmpty } from "lodash";
import { useStyles } from "../mantineStyles";
import styles from "./AnticipationSalaryCard.module.scss";
import Pill from "../../Pill";

export default function AnticipationSalaryCard({
    skillObj,
    tabs = true,
    activeLevel = "",
}) {
    const { classes } = useStyles();
    const [salaryCardsData, setSalaryCardsData] = useState({});

    // On changing tabs
    const onChangeSalaryTab = useCallback(
        (val) => {
            const data = {
                level: val.charAt(0).toUpperCase() + val.slice(1),
                lower_salary: skillObj[`${val}_lower_salary`],
                upper_salary: skillObj[`${val}_upper_salary`],
            };
            setSalaryCardsData(data);
        },
        [skillObj],
    );

    // Setting beginner level in the initial render
    useEffect(() => {
        if (!isEmpty(skillObj)) {
            setSalaryCardsData({
                level: "Beginner",
                lower_salary: skillObj?.beginner_lower_salary,
                upper_salary: skillObj?.beginner_upper_salary,
            });
        }
    }, [skillObj, setSalaryCardsData]);

    useEffect(() => {
        if (!isEmpty(activeLevel)) {
            onChangeSalaryTab(activeLevel);
        }
    }, [activeLevel, onChangeSalaryTab]);
    // Slider
    const slider = useMemo(
        () => (
            <RangeSlider
                py="xl"
                step={10000}
                min={0}
                max={
                    (skillObj.advanced_upper_salary &&
                        skillObj.advanced_upper_salary * 1.2) ||
                    20
                }
                // max={10000000}
                value={[
                    salaryCardsData.lower_salary,
                    salaryCardsData.level !== "Advanced"
                        ? salaryCardsData.upper_salary
                        : skillObj.advanced_upper_salary * 1.2,
                ]}
                // value={[2000000, 4000000]}
                onChange={() => {}}
                classNames={{
                    root: classes.root,
                    bar: classes.bar,
                    markFilled: classes.markFilled,
                    thumb: classes.thumb,
                    markLabel: classes.markLabel,
                    trackContainer: classes.trackContainer,
                    track: classes.track,
                }}
            />
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [salaryCardsData, classes],
    );

    useEffect(() => {
        if (!tabs) {
            const rangeGraphElement = document.getElementById("rangeGraph");
            rangeGraphElement.style.marginTop = "0";
        }
    }, [tabs]);

    return (
        <div className={styles.card} id="cardSalary">
            <h3 className={styles.head}>
                Salary range{" "}
                <Pill
                    title={activeLevel}
                    backgroundColor="#CBC6D1"
                    className={styles.levelPill}
                />
            </h3>
            {tabs && (
                <Tabs
                    variant="pills"
                    defaultValue="beginner"
                    color="transparent"
                    value={salaryCardsData?.level?.toLowerCase() || "beginner"}
                    onTabChange={onChangeSalaryTab}
                    classNames={{
                        root: classes.tabRoot,
                        tab: classes.salaryTab,
                    }}
                >
                    <Tabs.List>
                        <Tabs.Tab value="beginner">Beginner</Tabs.Tab>
                        <Tabs.Tab value="intermediate">Intermediate</Tabs.Tab>
                        <Tabs.Tab value="advanced">Advanced</Tabs.Tab>
                    </Tabs.List>
                </Tabs>
            )}

            <div className={styles.rangeContainer}>
                <div className={styles.rangeGraph} id="rangeGraph">
                    {slider}
                </div>
                <div className={styles.rangeText}>
                    {salaryCardsData.lower_salary &&
                        salaryCardsData.lower_salary / 100000}
                    L{salaryCardsData.level !== "Advanced" ? " - " : "+"}
                    {salaryCardsData.level !== "Advanced" &&
                        salaryCardsData.upper_salary &&
                        salaryCardsData.upper_salary / 100000}
                    {salaryCardsData.level !== "Advanced" && "L"}
                    <div className={styles.annual}>Per Annum</div>
                </div>
                <div className={styles.descParent}>
                    <div className={styles.description}>
                        <p>
                            What people typically earn in this field with a
                            similar experience and profile
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
