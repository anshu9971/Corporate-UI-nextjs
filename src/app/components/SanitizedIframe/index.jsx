// to sanitize iframe response

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

export function SanitizedIframe({ iframeCode }) {
    const [sanitizedIframeCode, setSanitizedIframeCode] = useState("");

    useEffect(() => {
        const sanitizedCode = DOMPurify.sanitize(iframeCode);
        setSanitizedIframeCode(sanitizedCode);
    }, [iframeCode]);

    return (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: sanitizedIframeCode }} />
    );
}
