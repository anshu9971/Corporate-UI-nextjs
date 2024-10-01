import { createStyles, em, getBreakpointValue } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    label: {
        // styles added to all items
        color: "#50495A",
        fontWeight: 600,
        fontSize: "14px",
        lineHeight: "19px",
        textTransform: "uppercase",
        [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.md))})`]:
            {
                fontSize: "16px",
                lineHeight: "26px",
            },
    },
    content: {
        maxHeight: "300px",
        overflowY: "auto",
    },
    chevron: {
        color: "#A198AC",
    },
    itemlabel: {
        cursor: "pointer",
        color: "#50495A",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "23px",
        [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.md))})`]:
            {
                fontSize: "14px",
                lineHeight: "20px",
            },
    },
    itemIcon: {
        color: "var(--learn-purple-3)!important",
    },
}));
