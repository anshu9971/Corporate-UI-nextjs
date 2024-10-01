import localFont from "next/font/local";

const patron = localFont({
    src: [
        { path: "./patron/patron-black.woff2", weight: "900", style: "black" },
        {
            path: "./patron/patron-blackitalic.woff2",
            weight: "900",
            style: "italic",
        },
        { path: "./patron/patron-bold.woff2", weight: "700", style: "bold" },
        {
            path: "./patron/patron-bolditalic.woff2",
            weight: "700",
            style: "italic",
        },
        {
            path: "./patron/patron-italic.woff2",
            weight: "400",
            style: "italic",
        },
        {
            path: "./patron/patron-regular.woff2",
            weight: "400",
            style: "normal",
        },
        { path: "./patron/patron-light.woff2", weight: "300", style: "light" },
        {
            path: "./patron/patron-lightitalic.woff2",
            weight: "300",
            style: "italic",
        },
        {
            path: "./patron/patron-medium.woff2",
            weight: "500",
            style: "medium",
        },
        {
            path: "./patron/patron-mediumitalic.woff2",
            weight: "500",
            style: "italic",
        },
        { path: "./patron/patron-thin.woff2", weight: "100", style: "thin" },
        {
            path: "./patron/patron-thinitalic.woff2",
            weight: "100",
            style: "italic",
        },
    ],
    variable: "--font-patron",
});

const quintus = localFont({
    src: [
        { path: "./quintus/Quintus_B_trial.ttf", weight: "700", style: "bold" },
        {
            path: "./quintus/Quintus_R_trial.ttf",
            weight: "400",
            style: "normal",
        },
    ],
    variable: "--font-quintus",
});

export { patron, quintus };
