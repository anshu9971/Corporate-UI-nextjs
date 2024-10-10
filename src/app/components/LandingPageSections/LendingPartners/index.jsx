// components/LendingPartners.js

import { PARTNERS } from "utils/constants/landingPage";
import styles from "./lendingPartners.module.scss";

const LendingPartnerCard = ({ partner }) => {
    return (
        <div className={styles.card}>
            <img
                src={partner.logo}
                alt={partner.name}
                className={styles.logo}
            />
            <h3>{partner.name}</h3>
            <p>
                <strong>Designation:</strong> {partner.designation}
            </p>
            <p>
                <strong>Customer Service:</strong> {partner.contact}
            </p>
            <p>
                <strong>Email:</strong> {partner.email}
            </p>
        </div>
    );
};

const LendingPartners = () => {
    return (
        <div className={styles.lendingPartnersContainer}>
            <h2>Our Lending Partners</h2>
            <div className={styles.grid}>
                {PARTNERS.map((partner, index) => (
                    <LendingPartnerCard partner={partner} key={index} />
                ))}
            </div>
        </div>
    );
};

export default LendingPartners;
