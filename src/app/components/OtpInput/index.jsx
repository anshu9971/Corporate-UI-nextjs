/* eslint-disable import/no-named-default */

"use client";

import React from "react";
import { default as ReactOtpInput } from "react-otp-input";
import "./OtpInput.scss";

export function OtpInput({ value, onChange, ...props }) {
    return (
        <ReactOtpInput
            inputStyle="otpInput"
            value={value}
            onChange={onChange}
            numInputs={6}
            renderInput={(inpProps) => <input {...inpProps} />}
            isInputNum
            shouldAutoFocus
            {...props}
        />
    );
}
