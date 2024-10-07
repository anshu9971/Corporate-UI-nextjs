import React from "react";
import styles from "./partnered.module.scss";
// Main component for Benefits for Partnered Institutes section
const PartneredBenefits = () => {
    return (
        <div className={styles.partneredBenefits}>
            <h2>Benefits for Partnered Institutes</h2>
            <p>Increase Enrollments by 40% with Our Partnership</p>
            <div className={styles.benefitsContent}>
                {/* Left side: Icon or Image */}
                <div className={styles.benefitsImage}>
                    <img
                        src="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/benefits.png"
                        alt="Partnership Icon"
                        className="icon"
                    />
                </div>
                {/* Right side: Benefits list */}
                <div className={styles.benefitsList}>
                    <ul>
                        <li>
                            <strong>Better</strong> Cash-Flows
                        </li>
                        <li>
                            <strong>Increase</strong> Enrollments
                        </li>
                        <li>
                            <strong>Instant Decisioning Tool</strong> Provided
                            to Your Team
                        </li>
                        <li>
                            <strong>Simple Technology</strong> Providing
                            Complete Transparency
                        </li>
                        <li>
                            <strong>Reduce Drop-Outs</strong> as Students Get
                            Easy Financial Assistance
                        </li>
                        <li>
                            <strong>
                                Run Impactful Campaigns with Eduvanz
                            </strong>{" "}
                            to Reach Out to New Students
                        </li>
                    </ul>
                </div>
            </div>
            {/* Button at the bottom */}
            <button className={styles.getInTouchbtn}>Get In Touch</button>
        </div>
    );
};

export default PartneredBenefits;
