import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

export const FormContext = createContext();

export default function FormProvider({ children }) {
    const [data, setData] = useState({});

    const setFormValues = useCallback(
        (values) => {
            setData((prevValues) => ({
                ...prevValues,
                ...values,
            }));
        },
        [setData],
    );
    const contextValue = useMemo(
        () => ({ data, setFormValues }),
        [data, setFormValues],
    );
    return (
        <FormContext.Provider value={contextValue}>
            {children}
        </FormContext.Provider>
    );
}

export const useFormData = () => useContext(FormContext);
