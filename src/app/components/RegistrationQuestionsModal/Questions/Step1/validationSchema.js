import * as yup from "yup";

export const schema = yup.object({
    first_name: yup
        .string()
        .trim()
        .required("First name is required")
        .matches(/^[a-zA-Z ]+$/, "Enter a valid name")
        .min(2, "Min length 2")
        .max(50, "Max length 50"),
    last_name: yup
        .string()
        .trim()
        .required("Last name is required")
        .matches(/^[a-zA-Z ]+$/, "Enter a valid name")
        .min(2, "Min length 2")
        .max(50, "Max length 50"),
    dob: yup.date().required("DOB is required"),
    gender: yup.string().required("Gender is required"),
    company_id: yup.number().required("Please select Company"),
    function_id: yup.number().required("Please select Function"),
    job_band_id: yup.number().required("Please select Job Band"),
    pincode: yup
        .string()
        .required("Pincode is required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(6, "Invalid pincode")
        .max(6, "Invalid pincode"),
    // experience: yup.string().required("Select experience"),
    // qualification: yup.string().required("Select qualification"),
    // subject_id: yup.number().required("Select subject"),
    mobile: yup
        .string()
        .required("Phone number is required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Invalid phone number")
        .max(10, "Invalid phone number"),
    // otp: yup
    //     .string()
    //     .required("OTP is required")
    //     .matches(/^[0-9]+$/, "Must be only digits")
    //     .min(6, "Invalid OTP")
    //     .max(6, "Invalid OTP"),
    wa_consent: yup.number().optional(),
    wizr_consent: yup.number().required(),
});
