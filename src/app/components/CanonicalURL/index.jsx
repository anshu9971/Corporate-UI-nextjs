"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CanonicalURL({ id }) {
    const pathname = usePathname();
    const [url, setUrl] = useState();
    useEffect(() => {
        const updatedUrl = `https://www.wizr.in${
            pathname === "/" ? "" : pathname?.split("#")?.[0]?.split("?")?.[0]
        }`;
        setUrl(updatedUrl);
        const metaTags = [...(document?.getElementsByTagName("meta") ?? [])];
        const facebookTag = metaTags.find(
            (meta) => meta?.getAttribute("property") === "og:url",
        );
        facebookTag?.setAttribute("content", updatedUrl);
    }, [pathname]);

    return (
        <link
            rel="canonical"
            href={url}
            // ${page ? `?page=${page}` : ""}`}
            {...(id ? { id } : {})}
        />
    );
}
