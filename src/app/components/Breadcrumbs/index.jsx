"use client";

import Link from "next/link";
import React, { useEffect } from "react";
// import Script from "next/script";
import { addOrUpdateScript } from "utils/helpers";
import styles from "./Breadcrumbs.module.scss";

export default function Breadcrumbs({ items, className, withJsonLd = false }) {
    useEffect(() => {
        if (withJsonLd && items?.length > 0) {
            const json = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: items?.map((item, index) => {
                    const breadcrumbItem = {
                        "@type": "ListItem",
                        position: index + 1,
                        name: item?.title,
                    };
                    if (item?.href?.startsWith("/")) {
                        breadcrumbItem.item = `https://www.wizr.in${item?.href}`;
                    } else if (item?.href?.startWith("http")) {
                        breadcrumbItem.item = item?.href;
                    }
                    return breadcrumbItem;
                }),
            };
            addOrUpdateScript(json, "breadcrumb-ld-json");
        }
    }, [items, ...items, withJsonLd]);

    if (
        (!items || items?.length <= 0,
        items?.filter((i) => i.title === undefined)?.length > 0)
    )
        return null;
    return (
        <div className={`${styles.breadcrumbs} ${className}`}>
            {items?.map(({ title, href, action, showDivider = false }) => {
                if (href) {
                    return (
                        <Link className={styles.link} href={href}>
                            {title}
                        </Link>
                    );
                }
                if (action) {
                    return (
                        <button
                            type="button"
                            className={`unstyledButton ${styles.link}`}
                            onClick={action}
                        >
                            {title}
                        </button>
                    );
                }
                return <p className={showDivider && styles.divider}>{title}</p>;
            })}
        </div>
    );
}
