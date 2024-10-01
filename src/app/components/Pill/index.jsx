import React from "react";
import styles from "./Pill.module.scss";

function Pill({ backgroundColor = "#cecece", title, style, className }) {
    if (!title) return null;
    return (
        <div
            className={`${styles.pill} ${className}`}
            style={{
                backgroundColor,
                ...style,
            }}
        >
            <span>{title}</span>
        </div>
    );
}

export default React.memo(Pill);
