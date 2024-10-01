import React, {
    useContext,
    // useEffect
} from "react";
import { StepContext } from "context/StepContext";
import FormProvider from "context/FormContext";
// import { useSelector } from "react-redux";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";

export function Questions({
    closeModal,
    stepOneCTAText,
    setTestimonial,
    showInactiveAccountModal,
    fromHeader,
    stepTwoCTAText,
}) {
    // const auth = useSelector((state) => state.auth);

    const {
        currentStep,
        //  nextStep
    } = useContext(StepContext);

    // useEffect(() => {
    //     if (auth?.user?.profile_status === "Personal details completed") {
    //         nextStep(2);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    return (
        <div style={{ height: "100%" }}>
            <FormProvider>
                {
                    {
                        1: (
                            <Step1
                                fromHeader={fromHeader}
                                stepOneCTAText={stepOneCTAText}
                                setTestimonial={setTestimonial}
                            />
                        ),
                        2: (
                            <Step2
                                showInactiveAccountModal={
                                    showInactiveAccountModal
                                }
                                closeModal={closeModal}
                                setFormState
                                setTestimonial={setTestimonial}
                                stepTwoCTAText={stepTwoCTAText}
                            />
                        ),
                    }[currentStep || 1]
                }
            </FormProvider>
        </div>
    );
}
