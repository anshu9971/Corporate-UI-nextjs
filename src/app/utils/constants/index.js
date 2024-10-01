// Icons --
import ShareIcon from "assets/images/shareIcon.png";
import ShareIcon2 from "assets/images/ShareIcon2.png";
import LinkedInIcon from "assets/images/linkedInIcon.png";
// import MoreActionsIcon from "assets/images/more-actions-icon.png";
import WhatsappIcon from "assets/images/whatsappIcon.png";
// import InstagramIcon from "assets/images/instagram-icon.png";
import DownloadIcon from "assets/images/downloadIcon.png";
import DownloadIcon2 from "assets/images/downloadIcon2.png";
import DownloadIcon3 from "assets/images/downloadIcon3.png";
import TopIcon from "assets/svgs/wizr-certificate-top-icon.svg";
import LeftIcon from "assets/svgs/wizr-certificate-left-icon.svg";
// import html2canvas from "html2canvas";
// import Nsdc from "assets/svgs/nsdc_transparent.svg";
import ABC from "assets/images/ABC.png";

// Functions ---
import {
    downloadHandler,
    linkedInShareHandler,
    whatsappShareHandler,
} from "utils/helpers/socialMediaShare";

export const formatWithCurrency = (price, curr) => {
    let currency = "INR";
    if (typeof curr === "string" && curr.length >= 2) {
        currency = curr;
    }
    return Intl.NumberFormat("en-IN", {
        style: "currency",
        currency, //
    }).format(price);
};
// filter labls mapped to its corresponding key
export const FILTER_KEYS = {
    "course level": "course_level",
    "course type": "course_type",
    ratings: "rating",
    duration: "duration",
    skills: "skills",
    "learning mode": "learning_mode",
    "delivery mode": "delivery_mode",
    institute: "institute",
    language: "language",
    "fees structure": "fee_structure",
    "work experience needed": "work_experience_needed",
    "education level required": "education_level_required",
    concepts: "concepts",
    // "zero cost finance": "zero_cost_finance",
    "No-Cost / Low-Cost EMI": "zero_cost_finance", // "low_cost_no_cost",
    "discount Available": "discount",
    "placement assistance": "placement_assistance",
    "No-Cost EMI": "zero_cost_finance",
};
export const ROUTE_FALLBACKS = {
    learn: "/start-skilling",
};
export const PENDING_COURSE_KEYS = [
    "Interested",
    "Await our call",
    "Profile approval pending",
    "Fee payment pending",
    "Additional details required",
    "Application accepted",
    "Seat block payment Rs. 500 pending",
    "Email Verification Pending",
    "Get Login details",
];
export const PRIVACY_POLICY_LINK = "/privacy-policy";
// "https://d7bvc5ocjh0yg.cloudfront.net/wizr/terms_condition/Privacy%20Policy%20-%20Discover%20Learn%20070723.pdf";
export const TC_LINK = "/terms-and-conditions";
// "https://d7bvc5ocjh0yg.cloudfront.net/wizr/terms_condition/T&Cs%20-%20Discover%20and%20Learn%20070723.pdf";
export const EMI_TC_LINK =
    "https://d7bvc5ocjh0yg.cloudfront.net/wizr/terms_condition/TCs-%20General%20and%20Finance%20070723.pdf";
export const WA_LINK = "https://wa.me/918655327104";
export const TRAITS_FOR_WIZR = [
    "Ambiguity Tolerance",
    "Sustained Attention",
    "Fluid Intelligence",
    "Working Memory",
    "Selective Attention",
    "Divided Attention",
    "Processing Speed",
    "Planning",
    "Concept Grasping",
    "Efficiency",
    "Patience",
];

export const TRAITS_LABELS = {
    "Divided Attention": "Multitasking",
    "Concept Grasping": "Learning Agility",
    Efficiency: "Task Efficiency",
};

export const UTM_PARAMS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "paywall",
];
export const COLLECTIONS_FILTER = {
    NO_COST_EMI: {
        slug: "collections/no-cost-emi-courses",
        title: "No-cost EMI",
        filterCriteria: {
            zero_cost_finance: ["Yes"],
        },
    },
};

// function clickLink(link) {
//     link.click();
// }

// function accountForFirefox(click, link) {
//     // wrapper function
//     document.body.appendChild(link);
//     click(link);
//     document.body.removeChild(link);
// }

// function simulateDownloadImageClick(uri, filename) {
//     const link = document.createElement("a");
//     if (typeof link.download !== "string") {
//         window.open(uri);
//     } else {
//         link.href = uri;
//         link.download = filename;
//         accountForFirefox(clickLink, link);
//     }
// }

// const downloadCertificate = () => {
//     const certificateNode = document.querySelector("#coc-wizr");
//     if (!certificateNode) return;
//     // cloning node to remove inline styles
//     const duplicatedNode = certificateNode.cloneNode(true);
//     duplicatedNode.removeAttribute("style");
//     document.body.appendChild(duplicatedNode);

//     html2canvas(duplicatedNode).then((canvas) => {
//         document.body.appendChild(canvas);

//         simulateDownloadImageClick(
//             canvas.toDataURL(),
//             "Cerifcate Of Completion.png",
//         );

//         canvas.remove();
//         duplicatedNode.remove();
//     });
// };

export const SOCIAL_SHARE = [
    {
        option: "Share with Manager",
        icon: ShareIcon,
    },
    {
        option: "Share on Linkedin",
        icon: LinkedInIcon,
        onClick: linkedInShareHandler,
    },
    {
        option: "Share on Whatsapp",
        icon: WhatsappIcon,
        onClick: whatsappShareHandler,
    },
    // {
    //     option: "Share on Facebook",
    //     icon: LinkedInIcon,
    // },
    // {
    //     option: "Share on Instagram",
    //     icon: InstagramIcon,
    // },
    {
        option: "Download Certificate",
        icon: DownloadIcon,
        onClick: (url) => downloadHandler(url, "Certificate.png"),
    },
    // {
    //     option: "Take More actions",
    //     icon: MoreActionsIcon,
    // },
];

const isIOSMobile = () =>
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const isAndroidPhone = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    return /android/.test(userAgent) && /mobile/.test(userAgent);
};

export const QUIZ_REPORT_SHARE_OPTIONS = [
    {
        option: "Download Report",
        icon: DownloadIcon2,
        onClick: (certificateUrl, reportUrl) => {
            if (isIOSMobile() || isAndroidPhone()) {
                const a = document.createElement("a");
                a.href = reportUrl;
                a.target = "_blank";
                a.download = "Report";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else {
                const prntWin = window.open();
                prntWin.document.write(
                    `<html><head><title>Report</title></head><body>` +
                        `<embed width="100%" height="100%" name="plugin" src="${reportUrl}" ` +
                        `type="application/pdf" internalinstanceid="21"></body></html>`,
                );
                prntWin.document.close();
            }
        },
    },
    {
        option: "Download Certificate",
        icon: DownloadIcon3,
        onClick: (certificateUrl) =>
            downloadHandler(certificateUrl, "Certificate.png"),
    },
    {
        option: "Share with Manager",
        icon: ShareIcon2,
    },
];

export const DUMMY_CERTIFICATE = {
    headingLineOne: "THE AGILE",
    headingLineTwo: "ANALYST",
    role: "THE PATIENT SCHOLAR",
    presentedTo: "Abhinav Singh Malhotra",
    level: "Intermediate",
    subject: "Advanced Python Development",
    topIcon: TopIcon,
    leftIcon: LeftIcon,
    rightIcon: ABC,
    description:
        "Abhinav excels by combining an exceptional ability to remain composed in challenging situations while possessing a keen aptitude for quick and effective learning. The Patient Scholar excels in acquiring new knowledge with a steadfast and patient approach.",
    topTraits: "Patience, Learning Agility",
};

export const EXPERIENCE_DROPDOWN_OPTIONS = [
    {
        label: "None",
        value: "None",
    },
    {
        label: "0 to 2 yrs",
        value: "0 to 2 yrs",
    },
    {
        label: "2 to 5 yrs",
        value: "2 to 5 yrs",
    },
    {
        label: "5 to 10 yrs",
        value: "5 to 10 yrs",
    },
    {
        label: "10 to 20 yrs",
        value: "10 to 20 yrs",
    },
    {
        label: "20 yrs and above",
        value: "20 yrs and above",
    },
];

export const QUALIFICATION_DROPDOWN_VALUES = [
    {
        label: "10th Standard",
        value: "10th Std.",
    },
    {
        label: "11/12th Standard",
        value: "11/12th Std.",
    },
    {
        label: "In College",
        value: "In College",
    },
    {
        label: "Graduate",
        value: "Graduate",
    },
    {
        label: "Post Graduate",
        value: "Post Graduate",
    },
];
