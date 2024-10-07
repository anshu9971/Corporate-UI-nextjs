"use client";

import LoanProcess from "components/LandingPageSections/applyLoan";
import ExclusiveBenefits from "components/LandingPageSections/benefits";
import DownloadApp from "components/LandingPageSections/downloadApp";
import Hero from "components/LandingPageSections/Hero";
import NewsRoom from "components/LandingPageSections/newsRoom";
import PartneredBenefits from "components/LandingPageSections/partneredBenefits";
import Script from "next/script";

export default function Home() {
    return (
        <main>
            <div>
                <Hero />
                <LoanProcess />
                <ExclusiveBenefits />
                <PartneredBenefits />
                <DownloadApp />
                <NewsRoom />
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
