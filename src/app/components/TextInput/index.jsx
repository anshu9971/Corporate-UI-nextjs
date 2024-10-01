"use client";

import { TextInput as MantineTextInput } from "@mantine/core";
import { forwardRef } from "react";
import classes from "./TextInput.module.scss";

export const TextInput = forwardRef(
    (
        { value, error, className = "", onChange, radius = "md", ...props },
        ref,
    ) => (
        <MantineTextInput
            ref={ref}
            classNames={{
                root: classes.textInputRoot,
                wrapper: classes.textInputWrapper,
                input: `${classes.textInputInput} ${
                    error ? classes.error : ""
                }`,
                rightSection: classes.rightSection,
            }}
            value={value}
            className={className}
            onChange={onChange}
            autoCorrect="off"
            autoComplete="off"
            radius={radius}
            {...props}
        />
    ),
);
