import { Select } from "@mantine/core";
import ChevronDown from "assets/svgs/Chevron.svg";
import Image from "next/image";
import classes from "./Dropdown.module.scss";

export function Dropdown({
    value,
    error,
    onChange,
    placeholder,
    options = [],
    className = "",
    styles = {
        input: {},
        item: {},
        root: {},
        dropdown: {},
    },
    ...props
}) {
    return (
        <Select
            rightSection={<Image src={ChevronDown} alt="down" />}
            classNames={{
                root: classes.dropdownRoot,
                rightSection: classes.dropdownRightSection,
                input: `${classes.dropdownInput} ${error ? classes.error : ""}`,
                item: classes.dropdownItem,
                dropdown: classes.dropdown,
            }}
            transitionProps={{
                transition: "fade",
                duration: 300,
                timingFunction: "ease",
            }}
            styles={{
                dropdown: {
                    ...styles.dropdown,
                },
                rightSection: {
                    paddingRight: 10,
                    pointerEvents: "none",
                },
                item: {
                    ...styles.item,
                },
                root: {
                    ...styles.root,
                },
                ...styles,
            }}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            data={options}
            {...props}
        />
    );
}
