"use client";

import React from "react";
import styles from "./pdfViewer.module.scss";

function PDFViewerFile({ fileUrl, width, height }) {
    return (
        <div
            className={styles.wrapper}
            style={{
                width,
                overflowX: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
            }}
        >
            <div style={{ width: "180px" }}>
                <iframe
                    title="pdf"
                    style={{
                        overflowX: "hidden",
                        backgroundColor: "#fff",
                        width: "200px",
                    }}
                    frameBorder={0}
                    height={height}
                    type="application/pdf"
                    src={fileUrl}
                />
            </div>
        </div>
    );
}

export default PDFViewerFile;
