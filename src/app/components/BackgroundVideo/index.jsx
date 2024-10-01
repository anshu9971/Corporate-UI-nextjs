import { useEffect, useState } from "react";

export function BackgroundVideo({ videoName, className, ...props }) {
    const [isSafari, setIsSafari] = useState(null);

    useEffect(() => {
        const isBrowserSafari = /^((?!chrome|android).)*safari/i.test(
            window.navigator.userAgent,
        );
        setIsSafari(isBrowserSafari);
    }, []);

    return (
        isSafari !== null && (
            <video
                style={{
                    pointerEvents: "none",
                }}
                className={className}
                autoPlay
                muted
                loop
                playsInline
                {...props}
            >
                {isSafari && (
                    <source src={`/videos/${videoName}.mov`} type="video/mp4" />
                )}
                <source src={`/videos/${videoName}.webm`} type="video/webm" />
                Sorry, your browser doesn&apos;t support embedded videos.
            </video>
        )
    );
}
