"use client";

import { Controller } from "react-hook-form";
import { Dropdown } from "components/Dropdown";

export default function ControlledDropdown({
    control,
    name,
    dropdownClassName = "",
    ...dropdownProps
}) {
    const resetScroll = () => {
        const s = document?.body?.scrollTop;
        if (s && document?.body?.scrollTop) {
            setTimeout(() => {
                document.body.scrollTop = s;
            }, 5);
        }
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <Dropdown
                    className={dropdownClassName}
                    styles={{
                        input: {
                            height: 50,
                            borderRadius: 10,
                            border: "1px solid #CAC8CD",
                        },
                    }}
                    {...dropdownProps}
                    {...field}
                    onDropdownOpen={resetScroll}
                />
            )}
        />
    );
}
