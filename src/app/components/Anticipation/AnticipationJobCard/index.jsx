import React, { useCallback, useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import { isEmpty } from "lodash";
import JobRoles from "components/JobRoles";
import { useStyles } from "../mantineStyles";
import styles from "./AnticipationJobCard.module.scss";
import Pill from "../../Pill";

export default function AnticipationJobCard({
    skillObj,
    tabs = true,
    activeLevel = "",
}) {
    const { classes } = useStyles();
    const [rolesCardData, setRolesCardData] = useState({});

    // Setting beginner level in the initial render
    useEffect(() => {
        if (!isEmpty(skillObj)) {
            setRolesCardData({
                level: "Beginner",
                roles: skillObj?.beginner_jobs,
            });
        }
    }, [skillObj, setRolesCardData]);

    // On changing tabs
    const onChangeRolesTab = useCallback(
        (val) => {
            const data = {
                level: val.charAt(0).toUpperCase() + val.slice(1),
                roles: skillObj[`${val}_jobs`],
            };
            setRolesCardData(data);
        },
        [skillObj],
    );

    useEffect(() => {
        if (!isEmpty(activeLevel)) {
            onChangeRolesTab(activeLevel);
        }
    }, [activeLevel, onChangeRolesTab]);

    return (
        <div className={styles.card} id="cardJob">
            <h3 className={styles.head} style={{ color: "#ffffff" }}>
                Future Job Roles
                <Pill
                    title={activeLevel}
                    backgroundColor="#D1D0D8"
                    className={styles.levelPill}
                />
            </h3>
            {tabs && (
                <Tabs
                    variant="pills"
                    defaultValue="beginner"
                    color="transparent"
                    value={rolesCardData?.level?.toLowerCase() || "beginner"}
                    onTabChange={onChangeRolesTab}
                    classNames={{
                        root: classes.tabRoot,
                        tab: classes.tab,
                    }}
                >
                    <Tabs.List>
                        <Tabs.Tab value="beginner">Beginner</Tabs.Tab>
                        <Tabs.Tab value="intermediate">Intermediate</Tabs.Tab>
                        <Tabs.Tab value="advanced">Advanced</Tabs.Tab>
                    </Tabs.List>
                </Tabs>
            )}

            <div className={styles.group}>
                <JobRoles roles={rolesCardData.roles && rolesCardData.roles} />
            </div>
            <div className={styles.description}>
                <p>
                    Positions that are anticipated to be in demand in the coming
                    years.
                </p>
            </div>
        </div>
    );
}
