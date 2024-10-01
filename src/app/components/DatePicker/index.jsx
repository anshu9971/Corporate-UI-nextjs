import React from "react";
import { DatePickerInput } from "@mantine/dates";
import styles from "./DatePicker.module.scss";

export function DatePicker({
    value,
    error,
    onChange,
    className = "",
    placeholder,
    ...props
}) {
    return (
        <DatePickerInput
            mx="auto"
            maw={400}
            classNames={{
                root: styles.datePickerRoot,
                input: `${styles.datePickerInput} ${error ? styles.error : ""}`,
                wrapper: styles.datePickerWrapper,
                day: styles.datePickerDay,
                calendarHeader: styles.datePickerCalendarHeader,
                weekday: styles.datePickerWeekday,
                monthCell: styles.monthCell,
            }}
            styles={{
                input: {},
            }}
            className={className}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            popoverProps={{ position: "top-start" }}
            {...props}
        />
    );
}
