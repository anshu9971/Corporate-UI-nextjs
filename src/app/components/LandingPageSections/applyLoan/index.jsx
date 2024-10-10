// Import necessary modules
import React from "react";
import styles from "./applyLoan.module.scss";

// Individual step component
const LoanStep = ({ icon, title, description }) => {
    return (
        <div className={styles.step}>
            <h3>{title}</h3>
            <img src={icon} alt={title} className={styles.stepIcon} />

            <p>{description}</p>
        </div>
    );
};

// Main component for the loan application process
const LoanProcess = () => {
    return (
        <div className={styles.loanProcess}>
            <h2>Apply for Eduvanz Loans</h2>
            <p>
                Step towards a brighter future with Eduvanz Loan... Find out
                how!
            </p>
            <div className={styles.stepsGrid}>
                <LoanStep
                    icon="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/select.png" // Replace with actual icon path
                    title="1. Select"
                    description="Choose your desired Institute and course."
                />
                <LoanStep
                    icon="	https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/apply.png"
                    title="2. Apply"
                    description="Provide and verify your details and documents online."
                />
                <LoanStep
                    icon="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/sanction.png"
                    title="3. Approval"
                    description="On-the-spot approval and instant support from our loan advisors."
                />
                <LoanStep
                    icon="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/disbursal.png"
                    title="4. Learn & Repay"
                    description="Loan disbursed to your institute as you repay in flexible EMIs."
                />
            </div>
            <button className={styles.applyButton}>Apply Now</button>
        </div>
    );
};

export default LoanProcess;
