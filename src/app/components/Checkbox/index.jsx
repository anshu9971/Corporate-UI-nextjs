import React from "react";
import { Checkbox as MantineCheckBox } from "@mantine/core";
import Image from "next/image";
import CheckboxImg from "assets/svgs/checkbox-icon.svg";
import styles from "./Checkbox.module.scss";

function CheckboxIcon({ className }) {
    return <Image className={className} src={CheckboxImg} alt="checkbox" />;
}

export function Checkbox({ label, checked, onChange, ...props }) {
    return (
        <MantineCheckBox
            icon={CheckboxIcon}
            classNames={{
                root: styles.root,
                label: styles.label,
                inner: styles.inner,
                input: styles.input,
                error: styles.error,
            }}
            checked={checked}
            onChange={onChange}
            label={label}
            {...props}
        />
    );
}
