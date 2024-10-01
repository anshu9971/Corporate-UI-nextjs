/* eslint-disable jsx-a11y/label-has-associated-control */

"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Logo from "assets/svgs/wizr-abc.svg";
import EditIcon from "assets/svgs/edit_icon.svg";
import { TextInput } from "components/TextInput";
import { DatePicker } from "components/DatePicker";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
// import { Dropdown } from "components/Dropdown";
import { Button } from "components/Button";
import { useDispatch } from "react-redux";
import {
    format,
    // isValid
} from "date-fns";
// import { Error } from "components/Error";
import { setUserData } from "redux/store/authSlice";
import Image from "next/image";
import MapPin from "assets/svgs/mapPin.svg";
import { useVerifyPincodeMutation } from "services/onboarding";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledDropdown from "components/ControlledDropDown";
import {
    useFunctionsByCompanyQuery,
    useGetCompaniesQuery,
    useJobBandsByCompanyFunctionAndRoleMutation,
    // useRolesByCompanyAndFunctionMutation,
} from "services/microsite/corporate";
import { OtpInput } from "components/OtpInput";
import ResendTimer from "components/ResendTimer";
import { Error } from "components/Error";
import { PRIVACY_POLICY_LINK, TC_LINK } from "utils/constants";
import {
    useMobileOtpMutation,
    useValidateMobileOtpMutation,
} from "services/microsite/auth";
import { useUpdateUserDetailsMutation } from "services/microsite/user";
import styles from "./Step1.module.scss";
import { Checkbox } from "../../../Checkbox";
import { schema } from "./validationSchema";

export function Step1({
    setTestimonial = () => {},
    closeModal,
    // fromHeader
}) {
    setTestimonial("aboutYouScreen");
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        getValues,
        setError,
        trigger,
        watch,
        clearErrors,
    } = useForm({
        resolver: yupResolver(schema, undefined, { mode: "sync" }),
        defaultValues: { wizr_consent: 1, wa_consent: 1 },
        mode: "onChange",
    });
    const timerRef = useRef(null);
    const pincode = watch("pincode");
    const companyId = watch("company_id");
    const functionId = watch("function_id");
    const roleId = watch("role_id");
    const mobile = watch("mobile");
    const dispatch = useDispatch();
    const [apiError, setApiError] = useState(null);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [performVerifyPincodeMutation] = useVerifyPincodeMutation();
    const [location, setLocation] = useState({});
    const { data: companyDropdownValues } = useGetCompaniesQuery();
    const { data: functionDropdownValues } = useFunctionsByCompanyQuery(
        companyId,
        { skip: !companyId },
    );
    // const [getRolesByCompanyAndFunction] =
    //     useRolesByCompanyAndFunctionMutation();
    const [getJobBandsByCompanyFunctionAndRole] =
        useJobBandsByCompanyFunctionAndRoleMutation();
    const [updateUserDetails] = useUpdateUserDetailsMutation();
    const [sendOtpOnMobile] = useMobileOtpMutation();
    const [validateMobileOtp] = useValidateMobileOtpMutation();
    // const [rolesDropdownValues, setRolesDropdownValues] = useState([]);
    const [jobBandDropdownValues, setJobBandDropdownValues] = useState([]);

    useEffect(() => {
        // const updateRolesDropdownValues = async () => {
        //     const { data: roles } = await getRolesByCompanyAndFunction({
        //         company_id: companyId,
        //         function_id: functionId,
        //     });
        //     setRolesDropdownValues(roles);
        // };
        const updateJobBandDropdownValues = async () => {
            const { data: jobBands } =
                await getJobBandsByCompanyFunctionAndRole({
                    company_id: companyId,
                    function_id: functionId,
                    // role_id: roleId,
                });
            setJobBandDropdownValues(jobBands);
        };
        // if (functionId && companyId) {
        //     updateRolesDropdownValues();
        // }
        if (functionId && companyId) {
            updateJobBandDropdownValues();
        }
    }, [functionId, companyId, roleId]);

    const verifyPincode = useCallback(async (code) => {
        let isSuccess = false;
        const res = await performVerifyPincodeMutation({
            payload: {
                pincode: code,
            },
        });
        if (res?.data?.data?.status === "success") {
            setLocation(res.data.data);
            clearErrors("pincode");
            isSuccess = true;
        } else {
            setError("pincode", {
                message: "Please enter a pincode",
                type: "required",
            });
            setLocation({});
            isSuccess = false;
        }
        return isSuccess;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (pincode?.length === 6) {
            verifyPincode(pincode);
        }
        if (pincode?.length < 6) {
            setLocation({});
            clearErrors("pincode");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pincode]);

    const sendOtp = async (number) => {
        const { data: res } = await sendOtpOnMobile({ mobile: number });
        setOtpSent(res?.data?.status === "success");
    };
    const verifyOtp = async () => {
        const isValidForm = await trigger();
        if (!isValidForm) return;
        const { data: validateMobileOtpRes, error } = await validateMobileOtp({
            mobile,
            otp: parseInt(otp, 10),
        });
        if (error?.data?.message?.length > 0) {
            setApiError(error?.data?.message);
        } else if (validateMobileOtpRes?.data?.status === "success") {
            const form = getValues();
            setApiError(null);
            const payload = {
                first_name: form.first_name?.trim(),
                last_name: form.last_name?.trim(),
                dob: format(form.dob, "yyyy-MM-dd"),
                gender: form.gender,
                pincode: form.pincode,
                company_id: form.company_id,
                function_id: form.function_id,
                job_band_id: form.job_band_id,
                wizr_consent: Number(form.wizr_consent),
                wa_consent: Number(form.wa_consent),
                mobile: form.mobile,
            };
            const { data: updateDetailsRes, error: updateDetailsError } =
                await updateUserDetails(payload);
            if (updateDetailsRes?.data?.status === "success") {
                dispatch(setUserData(payload));
                closeModal();
            } else if (updateDetailsError) {
                setApiError(updateDetailsError?.data?.message ?? null);
                console.log(updateDetailsError);
            }
        }
    };

    const submitDetails = useCallback(async () => {
        const isValidForm = await trigger();
        if (!isValidForm) {
            return;
        }
        await sendOtp(mobile);
    }, [mobile, sendOtp, trigger]);

    function errorOrLabel(key, label) {
        return (
            <span className={errors?.[key] ? styles.error : ""}>
                {errors?.[key] ? errors?.[key]?.message : label}
            </span>
        );
    }
    const registerWithMaxLength = (name, maxLength) => {
        const { onChange, ...fields } = register(name);
        return {
            ...fields,
            onChange: (e) =>
                setValue(name, e?.target?.value?.slice(0, maxLength)),
        };
    };

    const onSubmitClick = () => {
        const btn = document.getElementById("submitbtn");
        if (btn) {
            btn.click();
        }
    };
    useEffect(() => {
        setValue("function_id", undefined);
        setValue("job_band_id", undefined);
    }, [companyId, setValue]);
    useEffect(() => {
        setValue("job_band_id", undefined);
    }, [functionId, setValue]);

    return (
        <div className={styles.content}>
            <Image src={Logo} className={styles.logo} />
            {otpSent ? (
                <div className={styles.otpScreen}>
                    <div>
                        <p className={styles.verifyPhonePill}>
                            Verify Phone Number
                        </p>
                        <p className={styles.sentHeading}>
                            We’ve sent you an OTP
                        </p>
                        <p
                            className={styles.numberText}
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            On your phone number{" "}
                            <button
                                className={styles.editPhone}
                                type="button"
                                onClick={() => {
                                    setError("");
                                    setOtpSent(false);
                                    setOtp("");
                                }}
                            >
                                <span>{mobile}</span>
                                <Image src={EditIcon} alt="edit" />
                            </button>
                        </p>
                        <div>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    verifyOtp();
                                }}
                            >
                                <OtpInput
                                    shouldAutoFocus
                                    onChange={setOtp}
                                    value={otp}
                                    renderInput={(
                                        { type, ...props },
                                        index,
                                    ) => (
                                        <motion.input
                                            type="number"
                                            pattern="[0-9]"
                                            inputMode="decimal"
                                            initial={{
                                                opacity: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                transition: {
                                                    delay: index * 0.08,
                                                },
                                            }}
                                            {...props}
                                        />
                                    )}
                                />
                                {/* OtpInput does not support onenter & onKeyDown, this is a hack to handle onenter event */}
                                <button
                                    type="submit"
                                    style={{
                                        display: "none",
                                    }}
                                >
                                    {" "}
                                </button>
                            </form>
                        </div>
                        <ResendTimer
                            ref={timerRef}
                            onResend={() => setOtp("") || sendOtp()}
                        />
                        <Error message={apiError} />
                    </div>
                    <Button
                        onClick={verifyOtp}
                        variant="primary"
                        className={styles.verifyOtpCta}
                    >
                        Continue
                    </Button>
                    <div className={styles.tnc}>
                        <span>
                            By using WiZR you agree to the{" "}
                            <button
                                type="button"
                                onClick={() => {
                                    window.open(TC_LINK, "_blank");
                                }}
                            >
                                <span className={styles.bold}>
                                    Terms of service
                                </span>
                            </button>{" "}
                            and{" "}
                            <button
                                type="button"
                                onClick={() => {
                                    window.open(PRIVACY_POLICY_LINK, "_blank");
                                }}
                            >
                                <span className={styles.bold}>
                                    Privacy Policy.
                                </span>
                            </button>
                        </span>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit(submitDetails)}>
                    <div>
                        <p className={styles.formHeading}>
                            {/* {fromHeader
                                ? "Hey! Looks like you are not registered with us. Please register here:"
                                : "A little more about you"} */}
                            A little more about you
                        </p>
                        {/* <p>Send me newsletters and updates about WiZR’s activities</p> */}
                    </div>
                    <div className={styles.firstNameLastName}>
                        <label>
                            {errorOrLabel("first_name", "First Name")}
                            <TextInput
                                {...register("first_name")}
                                maxLength={50}
                                placeholder="First Name"
                            />
                        </label>
                        <label>
                            {errorOrLabel("last_name", "Last Name")}
                            <TextInput
                                {...register("last_name")}
                                maxLength={50}
                                placeholder="Last Name"
                            />
                        </label>
                    </div>
                    <div className={styles.dobGender}>
                        <div>
                            <label>
                                {errorOrLabel("dob", "Date of Birth")}
                            </label>
                            <Controller
                                name="dob"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        placeholder="mm/dd/yy"
                                        className={styles.datePicker}
                                        weekendDays={[]}
                                        mx="auto"
                                        maw={400}
                                        maxDate={
                                            new Date(
                                                new Date().setFullYear(
                                                    new Date().getFullYear() -
                                                        16,
                                                ),
                                            )
                                        }
                                        minDate={
                                            new Date(
                                                new Date().setFullYear(
                                                    new Date().getFullYear() -
                                                        100,
                                                ),
                                            )
                                        }
                                    />
                                )}
                            />
                        </div>

                        <label>
                            {errorOrLabel("gender", "Gender")}
                            <ControlledDropdown
                                control={control}
                                name="gender"
                                placeholder="Select"
                                options={[
                                    {
                                        label: "Male",
                                        value: "Male",
                                    },
                                    {
                                        label: "Female",
                                        value: "Female",
                                    },
                                ]}
                            />
                        </label>
                    </div>
                    <div className={styles.companyFunction}>
                        <label>
                            {errorOrLabel("company_id", "Company")}
                            <ControlledDropdown
                                style={{ width: "100%" }}
                                control={control}
                                name="company_id"
                                placeholder="Select"
                                options={companyDropdownValues}
                            />
                        </label>
                        <label>
                            {errorOrLabel("function_id", "Function")}
                            <ControlledDropdown
                                style={{ width: "100%" }}
                                control={control}
                                name="function_id"
                                placeholder="Select"
                                options={functionDropdownValues}
                            />
                        </label>
                    </div>
                    <div className={styles.jobBandPincode}>
                        <label>
                            {errorOrLabel("job_band_id", "Job Band")}
                            <ControlledDropdown
                                style={{ width: "100%" }}
                                control={control}
                                name="job_band_id"
                                placeholder="Select"
                                options={jobBandDropdownValues}
                            />
                        </label>
                        <label>
                            {errorOrLabel("pincode", "Residence Pincode")}
                            <TextInput
                                style={{ width: "100%" }}
                                placeholder="000000"
                                type="number"
                                {...registerWithMaxLength("pincode", 6)}
                            />
                        </label>
                    </div>
                    {location?.city?.length > 0 && (
                        <p className={styles.locationText}>
                            <Image src={MapPin} alt="pin" />
                            {location.city}, {location.state}
                        </p>
                    )}
                    <label>
                        {errorOrLabel("mobile", "Phone Number")}
                        <TextInput
                            {...registerWithMaxLength("mobile", 10)}
                            placeholder="9999999999"
                            type="number"
                        />
                    </label>
                    <Controller
                        name="wa_consent"
                        control={control}
                        render={({ field: { value, onChange, ...rest } }) => (
                            <Checkbox
                                label="Get updates on WhatsApp"
                                className={styles.checkbox}
                                checked={value === 1}
                                onChange={(e) =>
                                    setValue(
                                        "wa_consent",
                                        e.target.checked ? 1 : 0,
                                    )
                                }
                                {...rest}
                            />
                        )}
                    />
                    {apiError && (
                        <label className={styles.error}>{apiError}</label>
                    )}
                    <div className={styles.submitBtn}>
                        <Button
                            onClick={onSubmitClick}
                            variant="primary"
                            widthStyle="short"
                            style={{
                                padding: "0 30px",
                                height: "50px",
                            }}
                        >
                            Continue
                        </Button>
                    </div>

                    <input
                        type="submit"
                        id="submitbtn"
                        style={{ display: "none" }}
                    />
                </form>
            )}
        </div>
    );
}
