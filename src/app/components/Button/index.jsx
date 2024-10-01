"use client";

import React from "react";
import { Button as MantineButton } from "@mantine/core";
import styles from "./Button.module.scss";

const getButtonStyle = (widthStyle) => {
    switch (widthStyle) {
        case "small":
            return {
                width: "auto",
            };
        case "long":
            return {
                minWidth: "25%",
                height: 45,
            };
        default:
            return {
                // width: "auto",
            };
    }
};

export function Button({
    children,
    variant,
    widthStyle,
    style = {},
    className = "",
    disabled = false,
    radius = "xl",
    ...props
}) {
    return (
        <MantineButton
            {...props}
            className={`${styles.button} ${styles[variant]} ${className}`}
            style={
                widthStyle
                    ? { ...getButtonStyle(widthStyle), ...style }
                    : { ...style }
            }
            styles={{
                label: {
                    zIndex: 1,
                },
            }}
            disabled={disabled}
            radius={radius}
        >
            {children}
        </MantineButton>
    );
}
