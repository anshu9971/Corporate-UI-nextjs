import Modal from "components/Modal";
import CloseIcon from "assets/svgs/close_icon.svg";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@mantine/core";
import { Button } from "components/Button";
import { useVerifyPincodeMutation } from "services/onboarding";
import ErrorIcon from "assets/svgs/error_exclamation_circle_red.svg";
import { Error } from "components/Error";

import styles from "./UpdateUserPinCodeModal.module.scss";

export default function UpdateUserPinCodeModal({
    visible,
    onClose,
    handleSave,
    isEditing,
}) {
    // const isMobile = window.innerWidth < 780;
    const [error, setError] = useState(true);
    const [pincode, setPincode] = useState("");
    const [location, setLocation] = useState("");

    const [performVerifyPincodeMutation, { isLoading }] =
        useVerifyPincodeMutation();

    const verifyPincode = useCallback(
        async (code) => {
            const res = await performVerifyPincodeMutation({
                payload: {
                    pincode: code,
                },
            });
            if (res?.data?.data?.status === "success") {
                const response = res?.data?.data;
                const city =
                    response?.city && response.city !== null
                        ? `${response.city},`
                        : "";
                const state =
                    response?.state && response.state !== null
                        ? `${response.state}-`
                        : "";
                const pin =
                    response?.pincode && response.pincode !== null
                        ? `${response.pincode}`
                        : "";

                setLocation(`${city}${state}${pin}`);
            } else {
                setError("Please Enter a valid pincode");
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [location],
    );

    useEffect(() => {
        if (pincode?.length === 6) {
            verifyPincode(pincode);
        }
        if (pincode?.length < 6) {
            setLocation("");
            setError(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pincode]);

    useEffect(() => {
        setPincode("");
        setLocation("");
    }, [visible]);

    return (
        <Modal
            opened={visible}
            onClose={onClose}
            destroyOnClose
            className={styles.userPincodeModal}
            withCloseButton={false}
            centered
            size="md"
            transitionProps={{ transition: "slide-up", duration: 250 }}
            lockScroll={false}
        >
            <div className={styles.pincodeModalContent}>
                <Image
                    src={CloseIcon}
                    className={styles.closeIcon}
                    onClick={() => {
                        // setPincode("");
                        onClose(false);
                    }}
                />
                <h2>{`${
                    isEditing ? "Update your pincode" : "Add yourpin code"
                }`}</h2>
                <div>
                    <Input
                        classNames={{
                            input: `${styles.pinInput} ${
                                error ? styles.error : ""
                            } ${location ? styles.success : ""}`,
                        }}
                        rightSection={
                            error ? (
                                <Image src={ErrorIcon} />
                            ) : // : areCoursesAvailableOnPincode ? (
                            //     <Image src={CheckIcon} />
                            // )
                            null
                        }
                        value={pincode}
                        onChange={(e) => {
                            const value = e.target.value || "";
                            const pattern = /^\d{0,6}$/;
                            if (pattern.test(+value)) {
                                setPincode(e.target.value);
                            }
                        }}
                        inputMode="numeric"
                    />
                </div>

                {error ? (
                    <Error
                        style={{
                            margin: "0 !important",
                            textAlign: "center",
                        }}
                        message={error}
                        className={styles.label}
                    />
                ) : null}
                {location ? (
                    <p className={styles.location}>{location}</p>
                ) : null}

                <Button
                    style={!location && { marginTop: "5px" }}
                    variant="primary"
                    disabled={pincode.length < 6 || error || isLoading}
                    className={styles.button}
                    onClick={() => handleSave(pincode)}
                >
                    Update
                </Button>
            </div>
        </Modal>
    );
}
