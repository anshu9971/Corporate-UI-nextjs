"use client";

import React from "react";
import { Modal as MantineModal } from "@mantine/core";
import styles from "./Modal.module.scss";

function Modal({ children, ...props }) {
    const classNames = props?.classNames ?? {
        content: styles.modalContent,
        inner: styles.modalInner,
        root: styles.modalRoot,
    };
    return (
        <MantineModal
            classNames={classNames}
            styles={{
                root: {
                    backgroundColor: "yellow",
                },
                content: {
                    backgroundColor: "white",
                    borderRadius: 30,
                },
                overlay: {
                    background: "rgba(80, 73, 90, 0.6)",
                    backdropFilter: "blur(34px)",
                },
                body: {
                    height: "100%",
                    padding: 0,
                },
                inner: {
                    paddingTop: "0 !important",
                },
            }}
            {...props}
        >
            {children}
        </MantineModal>
    );
}

export default React.memo(Modal);
