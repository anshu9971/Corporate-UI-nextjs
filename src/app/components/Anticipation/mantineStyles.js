import { createStyles, em, getBreakpointValue } from "@mantine/core";
// import { createStyles, rem, em, getBreakpointValue } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    root: {
        height: "fit-content",
        position: "relative",
    },

    bar: {
        backgroundColor: "#CBFB62",
        height: "17px",
        transition: "all 0.3s ease-out",
        [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.md))})`]:
            {
                height: "28px",
            },
    },
    trackContainer: {
        backgroundColor: "#838F970",
        borderRadius: "22px",
    },
    track: {
        height: "17px",
        "&:before": {
            backgroundColor: "#838F9730",
            borderRadius: "22px",
        },
        [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.md))})`]:
            {
                height: "28px",
            },
    },
    markFilled: {
        backgroundColor: "#FFFFFF",
    },
    thumb: {
        backgroundColor: "#FFFFFF",
        border: "5px solid #CBFB62",
        height: "29px",
        width: "29px",
        overflow: "hidden",
        transition: "all 0.3s ease-out",
        [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.md))})`]:
            {
                height: "39px",
                width: "39px",
                transition: "all 0.3s ease-out",
            },
    },
    tabRoot: {
        [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.md))})`]:
            {
                border: "1px solid #d9d6de",
                borderRadius: "12px",
                padding: "4px",
                display: "inline-flex",
            },
    },
    salaryTab: {
        backgroundColor: "#e8e4ec",
        color: "#a198ac",
        borderRadius: "12px",
        "&[data-active]": {
            backgroundColor: "#fff",
            color: "#50495a",

            "&:hover": {
                backgroundColor: "#fff",
                color: "#50495a",
            },
        },

        "&:hover": {
            backgroundColor: "#fff",
            color: "#50495a",
        },

        [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.md))})`]:
            {
                fontSize: "16px",
            },
    },
    tab: {
        backgroundColor: "#91869e",
        color: "rgba(245,244,246,.376)",
        borderRadius: "12px",
        fontSize: "14px",
        "&[data-active]": {
            backgroundColor: "#fff",
            color: "#50495a",

            "&:hover": {
                backgroundColor: "#fff",
                color: "#50495a",
            },
        },

        "&:hover": {
            backgroundColor: "#fff",
            color: "#50495a",
        },

        [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.md))})`]:
            {
                fontSize: "16px",
            },
    },
}));
