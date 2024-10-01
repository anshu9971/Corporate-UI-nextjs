"use client";

import Plus from "assets/svgs/plus.svg";
import Image from "next/image";
import { Accordion, createStyles, em, getBreakpointValue } from "@mantine/core";
import Script from "next/script";
import { getLdJsonFromFaqs } from "utils/helpers";
import styles from "./FAQ.module.scss";

export default function FAQ({
    faqs = [],
    withLdJsonScript = false,
    className,
    accordionValue = [],
    hideChevron = false,
    title = "These are commonly asked questions seeking information or clarification by learners for the courses listed on this platform.",
}) {
    const useStyles = createStyles((theme) => ({
        label: {
            // styles added to all items
            color: "#1D1B21",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "21px",
            // padding: "0",

            [`@media (min-width: ${em(
                getBreakpointValue(theme.breakpoints.md),
            )})`]: {
                fontSize: "25px",
                lineHeight: "32px",
            },
        },
        content: {
            color: "#A198AC",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "21px",
            // padding: "0 24px 20px 24px",

            [`@media (min-width: ${em(
                getBreakpointValue(theme.breakpoints.md),
            )})`]: {
                fontSize: "16px",
                lineHeight: "23px",
                // padding:"0 40px 35.5px 40px",
            },
        },
        item: {
            // padding:"20px 24px 17px 24px",

            [`@media (min-width: ${em(
                getBreakpointValue(theme.breakpoints.md),
            )})`]: {
                // padding:"35.5px 40px 24px 40px",
            },
        },
    }));

    const { classes } = useStyles();
    if (faqs?.length <= 0) return null;
    return (
        <div className={`${styles.faqContainer} ${className}`}>
            <div className={styles.left}>
                <h2 className={styles.title}>Frequently Asked Questions</h2>
                <p className={styles.subtitle}>{title}</p>
            </div>
            <div className={styles.right}>
                {faqs?.map((faq) => {
                    const question = faq?.question || faq?.question__c;
                    const answer = faq.answer || faq.answer__c;
                    const id = faq?.faqId ?? answer;
                    return question && answer ? (
                        <Accordion
                            chevron={
                                hideChevron ? null : (
                                    <Image src={Plus} alt="chevron" />
                                )
                            }
                            classNames={{
                                content: classes.content,
                                label: classes.label,
                                control: classes.item,
                            }}
                            multiple
                            {...(accordionValue?.length > 0
                                ? { value: accordionValue }
                                : {})}
                        >
                            <Accordion.Item value={id}>
                                <Accordion.Control>
                                    {question}
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <p className={styles.answerText}>
                                        {answer}
                                    </p>
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    ) : null;
                })}
            </div>

            {withLdJsonScript && (
                <Script id="faq-ld-json" type="application/ld+json">
                    {JSON.stringify(getLdJsonFromFaqs(faqs))}
                </Script>
            )}
        </div>
    );
}
