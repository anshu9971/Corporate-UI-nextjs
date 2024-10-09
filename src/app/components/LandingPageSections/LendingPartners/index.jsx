// components/LendingPartners.js

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
    const partners = [
        {
            logo: "https://d1idiaqkpcnv43.cloudfront.net/assets/images/abfl-logo-new.png",
            name: "Aditya Birla Capital",
            designation: "Complaints Redressal Officer",
            contact: "080-45860196",
            email: "grievance.finance@adityabirlacapital.com",
        },
        {
            logo: "https://d1idiaqkpcnv43.cloudfront.net/assets/images/header-smfg.png",
            name: "SMFG India Credit",
            designation: "Grievance Redressal Officer",
            contact: "42241220",
            email: "GRO@smfgindia.com",
        },
        {
            logo: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/piramal-finance-logo1.png",
            name: "Piramal Finance",
            designation: "Nodal Officer",
            contact: "022-69181439",
            email: "nodal.officer@piramal.com",
        },
        {
            logo: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/Mas-logo.png",
            name: "MAS Financial Services Ltd.",
            designation: "Nodal Officer",
            contact: "079-41106500",
            email: "crm.masfin@mas.co.in",
        },
    ];

    return (
        <div className={styles.lendingPartnersContainer}>
            <h2>Our Lending Partners</h2>
            <div className={styles.grid}>
                {partners.map((partner, index) => (
                    <LendingPartnerCard partner={partner} key={index} />
                ))}
            </div>
        </div>
    );
};

export default LendingPartners;
