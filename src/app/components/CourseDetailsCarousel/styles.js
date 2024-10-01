import { createStyles, em, getBreakpointValue, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    card: {
        height: "440px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        color: theme.white,
        lineHeight: 1.2,
        fontSize: rem(32),
        marginTop: theme.spacing.xs,
    },

    category: {
        color: theme.white,
        opacity: 0.7,
        fontWeight: 700,
        textTransform: "uppercase",
    },
    container: {
        [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.md))})`]:
            {
                // marginRight: "50px",
            },

        [`@media (min-width: ${em(
            getBreakpointValue(theme.breakpoints.xxl),
        )})`]: {},
    },
    slide: {
        paddingBottom: "20px",
        [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.lg))})`]:
            {},
    },
    controls: {
        display: "none",
        position: "absolute",
        top: "0px",
        left: "80vw",
        width: "100px",
        transform: "scale(.8)",

        [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.md))})`]:
            {
                width: "fit-content",
                display: "flex",
                gap: "18px",
                top: "-70px",
                left: "calc(100vw - 220px)",
            },

        [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.lg))})`]:
            {
                width: "fit-content",
                display: "flex",
                gap: "18px",
                top: "-70px",
                left: "calc(100vw - 220px)",
            },

        [`@media (min-width: ${em(
            getBreakpointValue(theme.breakpoints.llg),
        )})`]: {
            width: "fit-content",
            display: "flex",
            gap: "18px",
            top: "-70px",
            left: "calc(100vw - 220px)",
        },

        [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.l))})`]:
            {
                width: "fit-content",
                display: "flex",
                gap: "18px",
                top: "-70px",
                left: "calc(100vw - 460px)",
            },

        [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.xl))})`]:
            {
                width: "fit-content",
                display: "flex",
                gap: "18px",
                top: "-70px",
                left: "calc(100vw - 460px)",
            },

        [`@media (min-width: ${em(
            getBreakpointValue(theme.breakpoints.xxl),
        )})`]: {
            display: "flex",
            top: "-75px",
            left: "calc(100vw - 460px)",
        },
    },
    indicator: {
        // color: "green",
        backgroundColor: "#e1e1d8",
        "&[data-active]": {
            background: "#292F1E",
        },
        "&[data-inactive]": {
            background: "#292F1E",
            opacity: ".5",
            cursor: "default",
        },
    },
}));
