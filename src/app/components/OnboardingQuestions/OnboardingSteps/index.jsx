import React, { useContext, useEffect } from "react";
import { StepContext } from "context/StepContext";
import FormProvider from "context/FormContext";
import { useRouter } from "next/navigation";
import { OnboardingStep1 } from "./Step1";
import { OnboardingStep2 } from "./Step2";
// import { OnboardingStep3 } from "./Step3";
// import { OnboardingStep4 } from "./Step4";
// import { OnboardingStep5 } from "./Step5";
// import { OnboardingStep6 } from "./Step6";
// import { FinalStep } from "./FinalStep";
import { StartQuizPage } from "./StartQuizPage";

export function OnboardingSteps({ handleProgress, hideOnboarding }) {
    const { currentStep } = useContext(StepContext);

    const { back } = useRouter();
    useEffect(() => {
        switch (currentStep) {
            case 0:
                // hideOnboarding();
                back();
                return handleProgress(0);
            case 1:
                return handleProgress(40);
            case 2:
                return handleProgress(70);
            case 3:
                return handleProgress(95);
            // case 4:
            //     return handleProgress(60);
            // case 5:
            //     return handleProgress(70);
            // case 6:
            //     return handleProgress(80);
            // case 7:
            //     return handleProgress(100);
            default:
                return handleProgress(0);
        }
    }, [currentStep, handleProgress, hideOnboarding]);

    return (
        <div style={{ height: "100%" }}>
            <FormProvider>
                {
                    {
                        1: <OnboardingStep1 />,
                        2: <OnboardingStep2 />,
                        3: <StartQuizPage />,
                        // 3: <OnboardingStep3 />,
                        // 4: <OnboardingStep4 />,
                        // 5: <OnboardingStep5 />,
                        // 6: <OnboardingStep6 />,
                        // 7: <FinalStep />,
                    }[currentStep || 1]
                }
            </FormProvider>
        </div>
    );
}
