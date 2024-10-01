import BasicIcon from "assets/svgs/basic_level_icon.svg";
import IntermediateIcon from "assets/svgs/intermediate_level_icon.svg";
import AdvancedIcon from "assets/svgs/advanced_level_icon.svg";
import OnlineIcon from "assets/svgs/online_icon.svg";
import OfflineIcon from "assets/svgs/offline_icon.svg";
import FlexibleIcon from "assets/svgs/flexible_icon.svg";

export const SUBJECTS = [
    [
        {
            id: 1,
            label: "IT & Development",
            bgColor: "var(--learn-purple-4)",
            fontColor: "#FFFFFF",
        },
        {
            id: 2,
            label: "Marketing",
            bgColor: "var(--learn-purple-2)",
            fontColor: "#403D46",
        },
        {
            id: 3,
            label: "Healthcare",
            bgColor: "#B5CECD",
            fontColor: "#2D3737",
        },
        {
            id: 4,
            label: "Law",
            bgColor: "#BACFE8",
            fontColor: "#403D46",
        },
        {
            id: 5,
            label: "Science",
            bgColor: "#fff",
            fontColor: "#403D46",
        },
        {
            id: 6,
            label: "Human Resources",
            bgColor: "#fff",
            fontColor: "#403D46",
        },

        {
            id: 7,
            label: "Business Management",
            bgColor: "var(--learn-purple-2)",
            fontColor: "#403D46",
        },

        {
            id: 8,
            label: "Design",
            bgColor: "var(--learn-purple-4)",
            fontColor: "#fff",
        },
    ],
    [
        {
            id: 9,
            label: "Linguistics",
            bgColor: "#fff",
            fontColor: "#403D46",
        },
        {
            id: 10,
            label: "Engineering",
            bgColor: "var(--discover-brick-1)",
            fontColor: "#43332D",
        },
        {
            id: 11,
            label: "Personal Development",
            bgColor: "var(--discover-brick-1)",
            fontColor: "#43332D",
        },
        {
            id: 12,
            label: "BFSI",
            bgColor: "#fff",
            fontColor: "#403D46",
        },
        {
            id: 13,
            label: "Data Science",
            bgColor: "#FEEC8D",
            fontColor: "#575131",
        },
        {
            id: 14,
            label: "Computer Science",
            bgColor: "var(--discover-brick-1)",
            fontColor: "#43332D",
        },

        {
            id: 15,
            label: "Teaching and Academics",
            bgColor: "#BACFE8",
            fontColor: "#2E3A46",
        },
        {
            id: 16,
            label: "Test & Preparation",
            bgColor: "#fff",
            fontColor: "#403D46",
        },
    ],
    [
        {
            id: 17,
            label: "Travel & Hospitality",
            bgColor: "#B5CECD",
            fontColor: "#2D3737",
        },
        {
            id: 18,
            label: "Beauty and Wellness",
            bgColor: "#FEEC8D",
            fontColor: "#575131",
        },
        {
            id: 19,
            label: "IT & Development",
            bgColor: "var(--learn-purple-4)",
            fontColor: "#FFFFFF",
        },
        {
            id: 20,
            label: "Marketing",
            bgColor: "var(--learn-purple-2)",
            fontColor: "#403D46",
        },
        {
            id: 21,
            label: "Healthcare",
            bgColor: "#B5CECD",
            fontColor: "#2D3737",
        },

        {
            id: 22,
            label: "Law",
            bgColor: "#BACFE8",
            fontColor: "#403D46",
        },
    ],
];
export const DIFFICULTY_LEVELS = {
    Beginner: {
        desc: "Introduction to a subject, minimal skill and knowledge.",
        icon: BasicIcon,
    },
    Intermediate: {
        desc: "Moderate or middle-level skill and knowledge.",
        icon: IntermediateIcon,
    },
    Advanced: {
        desc: "Extensive experience and high level of  skill and knowledge.",
        icon: AdvancedIcon,
    },
};
export const SUB_LEARNING_MODE = [
    "Hybrid",
    "Instructor-led (Live)",
    "Self-paced (Recorded)",
];
export const LEARNING_MODES = {
    "In-person (Offline)": {
        desc: "I want to attend in class courses to upskill myself",
        icon: OfflineIcon,
        key: "Offline",
        validatePinCode: true,
    },
    Online: {
        desc: "I prefer learning from the comfort of my house",
        icon: OnlineIcon,
        key: "Online",
    },
    Hybrid: {
        desc: "I am open to hybrid modes of learning , as long as I find the course useful",
        icon: FlexibleIcon,
        key: "flexible",
    },
};
export const LEARNING_TIME = {
    "Full Time": "I want to learn throughout the week",
    "Part Time": "I can only take out time on the weekends and late evenings",
    Flexible: "I am okay with all the above options",
};
