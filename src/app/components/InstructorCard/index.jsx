import { useMemo } from "react";
import { COLORS } from "components/JobRoles";
import styles from "./InstructorCard.module.scss";

export default function InstructorCard({ instructor = "", position, org }) {
    const nameInitials = useMemo(() => {
        let initials = "";
        if (instructor.length > 0) {
            const fullName = instructor.split(" ");
            initials = (
                (fullName?.shift()?.charAt(0) ?? "") +
                (fullName?.pop()?.charAt(0) ?? "")
            ).toUpperCase();
        }
        return initials?.padEnd(2, " ");
    }, [instructor]);

    const colorIdx = Math.floor(Math.random() * 22);
    return (
        <div className={styles.instructorCardContainer}>
            <h1
                className={styles.initials}
                style={{
                    backgroundColor: COLORS[colorIdx]?.bgColor,
                    color: COLORS[colorIdx]?.fontColor,
                }}
            >
                {nameInitials}
            </h1>
            <div className={styles.textContent}>
                <h2>{instructor}</h2>
                <p>{position}</p>
                <p>{org}</p>
            </div>
        </div>
    );
}
