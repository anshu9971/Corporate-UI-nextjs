"use client";

import LoanProcess from "components/LandingPageSections/applyLoan";
import ExclusiveBenefits from "components/LandingPageSections/benefits";
import DownloadApp from "components/LandingPageSections/downloadApp";
import Hero from "components/LandingPageSections/Hero";
import NewsRoom from "components/LandingPageSections/newsRoom";
import PartneredBenefits from "components/LandingPageSections/partneredBenefits";
import Script from "next/script";
import styles from "./page.module.scss";
import FeaturesSLider from "components/LandingPageSections/featuresSlider";
import LendingPartners from "components/LandingPageSections/LendingPartners";

export default function Home() {
    return (
        <main>
            <div>
                <Hero />
                <div
                    style={{
                        backgroundColor: "#074764",
                        textAlign: "center",
                        padding: "6px 0px",
                    }}
                >
                    <p style={{ color: "#ffffff" }}>
                        To connect with us over a call click on
                        www.eduvanz.com/contact.
                    </p>
                </div>
                <section className={styles.section2}>
                    <div>
                        <p>CALCULATE THE COST OF YOUR LOAN!</p>
                        <button type="button">EMI Calculator</button>
                    </div>
                </section>
                <FeaturesSLider />
                <LoanProcess />
                <ExclusiveBenefits />
                <PartneredBenefits />
                <DownloadApp />
                <section className={styles.creditSection}>
                    <div className={styles.creditContainer}>
                        <div className={styles.creditHead}>
                            <h3>CREDIT RATING</h3>
                            <p>
                                Eduvanz has been rated by CRISIL Limited and
                                enjoys BBB- (minus) rating for Long-Term
                                borrowings.
                            </p>
                        </div>
                        <div
                            className={styles.creditButtonContainer}
                            align="center"
                        >
                            <div class="col-sm-12">
                                <a
                                    href="https://www.crisil.com/mnt/winshare/Ratings/RatingList/RatingDocs/EduvanzFinancingPrivateLimited_March%2030,%202022_RR_288556.html"
                                    target="_blank"
                                    class="btn btnAllBlue"
                                >
                                    Know More
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <LendingPartners />
                <NewsRoom />
                <section className={styles.testimonialSection}>
                    <div className={styles.testimonialContainer}>
                        <div className={styles.testimonialRow}>
                            <div>
                                <span>We are Backed By:</span>
                            </div>
                            <div>
                                <span>
                                    <img
                                        loading="lazy"
                                        src="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/sequoia-capital-logo.png"
                                        alt="sequoia Capital"
                                        title="sequoia Capital"
                                        width="260"
                                        height="40"
                                    />
                                </span>
                            </div>
                            <div>
                                <span>and</span>
                            </div>
                            <div>
                                <span>
                                    <img
                                        loading="lazy"
                                        src="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/Capria-logo-icon_horizontal.png"
                                        alt="unitus"
                                        title="unitus"
                                        class="img-responsive unitus-logo"
                                        width="154"
                                        height="60"
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Script id="og-scripts" type="application/ld+json">
                {`{
                        "@context": "http://www.schema.org",
                        "@type": "Organization",
                        "name": "WiZR",
                        "url": "https://www.wizr.in/",
                        "logo": "https://d7bvc5ocjh0yg.cloudfront.net/assets/wizr/Wizr_300Dpi.png",
                        "brand": "WiZR",
                        "telephone": "022-41900000",
                        "Email": "service@wizr.in",
                        "description": "Compare the best courses, finance with no-cost EMI, uncover your strengths through games, & receive career advice.",
                        "sameAs": [
                            "https://www.facebook.com/WizrIndia/",
                            "https://twitter.com/WiZR_India",
                            "https://www.linkedin.com/company/wizr-india/",
                            "https://www.instagram.com/wizr_india/",
                            "https://www.youtube.com/@WizrIndia"
                        ]
                    }`}
            </Script>
            <Script id="icon-script" type="application/ld+json">
                {`{
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "url": "https://www.wizr.in",
                        "logo": "https://d7bvc5ocjh0yg.cloudfront.net/assets/wizr/Wizr_300Dpi.png"
                    }`}
            </Script>
            <Script id="search-ld-json" async type="application/ld+json">
                {`{
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "url": "https://www.wizr.in/",
                        "potentialAction": {
                                "@type": "SearchAction",
                                "target": {
                                    "@type": "Entrypoint",
                                    "urlTemplate": "https://www.wizr.in/search?q={search_term_string}"
                                },
                                "query-input": "required name=search_term_string"
                            }
                    }`}
            </Script>
            <Script id="site-navigation-ld-json" type="application/ld+json">
                {`{
  "@context": "http://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "SiteNavigationElement",
      "position": 1,
      "name": "Compare Courses & Enroll",
      "url": "https://www.wizr.in/start-skilling"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 2,
      "name": "Career Discovery Games",
      "url": "https://www.wizr.in/discover/career-discovery"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 3,
      "name": "No-cost EMI Courses",
      "url": "https://www.wizr.in/collections/no-cost-emi-courses"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 4,
      "name": "Grow – Articles, Podcasts & Interviews",
      "url": "https://www.wizr.in/grow"
    }
  ]
}`}
            </Script>
        </main>
    );
}
