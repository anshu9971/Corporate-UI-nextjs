import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./PhoneInput.module.scss";

export function PhoneNumberInput({
    value,
    onChange,
    className = "",
    ...props
}) {
    return (
        <PhoneInput
            countryCodeEditable={false}
            containerClass={`${styles.phoneInput} ${className}`}
            inputClass={styles.input}
            country="in"
            value={value}
            onChange={onChange}
            {...props}
        />
    );
}
