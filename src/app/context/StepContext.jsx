import { createContext, useCallback, useMemo, useState } from "react";

export const StepContext = createContext();

export function StepProvider({ children }) {
    const [currentStep, setCurrentStep] = useState(1);

    const resetStep = useCallback(() => {
        setCurrentStep(1);
    }, []);

    const nextStep = useCallback(
        (stepNumber) => {
            if (currentStep < 8) {
                setCurrentStep(
                    (step) =>
                        (typeof stepNumber === "number" && stepNumber) ||
                        step + 1,
                );
            }
        },
        [currentStep],
    );

    const prevStep = useCallback(() => {
        if (currentStep >= 1) {
            setCurrentStep((step) => step - 1);
        }
    }, [currentStep]);

    const contextValue = useMemo(
        () => ({
            currentStep,
            nextStep,
            prevStep,
            resetStep,
        }),
        [currentStep, resetStep, nextStep, prevStep],
    );

    return (
        <StepContext.Provider value={contextValue}>
            {children}
        </StepContext.Provider>
    );
}
