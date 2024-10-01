import { useState } from "react";

import { useFormData } from "context/FormContext";
import QuizMainCover from "components/QuizMainCover";
import QuizPlayer from "components/QuizPlayer";
import styles from "./StartQuizPage.module.scss";

export function StartQuizPage() {
    const [currentQuizLevelId, setCurrentQuizLevelId] = useState(null);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const { data: formData } = useFormData();

    const quizStartHandler = () => {
        const id = formData?.selectedQuiz?.next_quiz_id;
        setSelectedQuiz(formData?.selectedQuiz);
        if (id) setCurrentQuizLevelId(id);
    };

    const quizCloseHandler = () => {
        setCurrentQuizLevelId(null);
    };

    return (
        <div className={styles.mainCover}>
            <QuizMainCover getStartedHandler={quizStartHandler} />
            {currentQuizLevelId && (
                <QuizPlayer
                    quizData={selectedQuiz}
                    quizLevelId={currentQuizLevelId}
                    redirectTo="/recommendations"
                    onClose={quizCloseHandler}
                />
            )}
        </div>
    );
}
