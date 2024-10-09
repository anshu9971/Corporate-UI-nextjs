// Import necessary modules
import React from "react";
import styles from "./benefits.module.scss";

// Individual benefit component
const Benefit = ({ icon, title, description }) => {
    return (
        <div className={styles.benefit}>
            <img src={icon} alt={title} className={styles.benefitIcon} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

// Main component for the exclusive benefits section
const ExclusiveBenefits = () => {
    return (
        <div className={styles.exclusiveBenefits}>
            <h2>Exclusive Benefits for Students</h2>
            <p>Go Beyond Traditional Banks to Realize Your Dreams</p>
            <div className={styles.benefitsGrid}>
                <Benefit
                    icon="	https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/were-fast.png" // Replace with actual icon path
                    title="Get Instant Approval"
                    description="Know your approval status in seconds"
                />
                <Benefit
                    icon="	https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/paperless.png"
                    title="100% Online Process"
                    description="Submit your application form via mobile app or website"
                />
                <Benefit
                    icon="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/student-friendly.png"
                    title="Student-Friendly"
                    description="Low-cost loans, flexible tenures, no hidden charges"
                />
            </div>
            <button className={styles.getStartedBtn}>Get Started</button>
        </div>
    );
};

export default ExclusiveBenefits;
