// import PartnerSection from "PartnerSection";
// import PartnerSection from "PartnerSection";
import { Footer } from "components/Footer";
import { DiscoverAnimation } from "components/LandingPageSections/DiscoverAnimation";
import { FinanceAnimation } from "components/LandingPageSections/FinanceAnimation";
// import { FinanceAnimation } from "components/LandingPageSections/FinanceAnimation";
// import GrowAnimation from "components/LandingPageSections/GrowAnimation";
import { LearnAnimation } from "components/LandingPageSections/LearnAnimatedComponents";

export const SNAP_SECTION = [
    {
        title: "Discover",
        subTitle: "Your Potential",
        description: `Unleash your inner superhero!\nDiscover your mental make-up and find out how skilled you are. Get top-notch career & skill recommendations.`,
        animatedComponent: DiscoverAnimation,
    },
    {
        title: "Learn",
        subTitle: "with purpose",
        description: `Receive unbiased and personalized course recommendations from across India and the world. Filter, compare and enrol for a course that fits your unique needs.`,
        secondSnapDescription:
            "We have partnered with the top institutes from India and around the world to bring your the best upskilling opportunities and learning experiences.",
        animatedComponent: LearnAnimation,
        // animatedComponent: ChooseSubject,
        // showNsdcPartnerShipButton: true,
    },
    // { component: PartnerSection },
    {
        title: "Finance",
        subTitle: "your Goals",
        description: `Break free from financial limitations! Unlock your success with No-cost EMI to pay your course fees.`,
        animatedComponent: FinanceAnimation,
        isFinanceCard: true,
    },
    // {
    //     title: "Grow",
    //     subTitle: "beyond limits",
    //     description: `Fuel your growth with inspiring content! Listen to podcasts, receive mentor advice, and gain insights from our blog. Unleash your potential now!`,
    //     animatedComponent: GrowAnimation,
    // },
    { component: Footer },
];
