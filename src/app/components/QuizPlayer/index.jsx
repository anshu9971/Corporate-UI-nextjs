import UnberryPlayer from "@tech.unberry/unberry-player";
import { Loader } from "components/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    useLazyCreateUnberryUserQuery,
    useLinkDynamicQuizMutation,
    useQuizReportWebhookMutation,
} from "services/unberry";
import CloseIcon from "assets/svgs/close_icon.svg";
import QuizCover from "components/QuizCover";
import Image from "next/image";
import { setUserData } from "redux/store/authSlice";
import styles from "./QuizPlayer.module.scss";

export default function QuizPlayer({
    quizLevelId,
    redirectTo = "/discover/expertise-discovery/report",
    searchParams = "",
    onClose = () => {},
    quizData,
}) {
    const { push } = useRouter();
    const dispatch = useDispatch();
    const [ubUserData, setUbUserData] = useState(null);
    const [quizId, setQuizId] = useState(null);
    const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
    const [startQuiz, setStartQuiz] = useState(false);

    const user = useSelector(({ auth }) => auth.user);

    const [getUserDetails] = useLazyCreateUnberryUserQuery();
    const [linkDynamicQuiz] = useLinkDynamicQuizMutation();
    const [quizReportWebhook] = useQuizReportWebhookMutation();

    const quizEndHandler = async () => {
        setShowLoadingOverlay(true);
        setTimeout(async () => {
            const { data } = await quizReportWebhook({
                userId: user.id,
                quizId,
                functionId: quizData?.master_function_id,
            });
            if (data?.status) {
                dispatch(setUserData({ is_account_active: true }));
                push(`${redirectTo}/${quizId}${searchParams}`);
            }
        }, 4 * 1000);
    };
    // "979b95b9-cccf-4a75-8a03-b9ea977b2c58"
    useEffect(() => {
        if (user && quizLevelId && !quizId) {
            const fetchUnberryUserDetails = async () => {
                // fectching ub user data linked with wizr user id
                const { data: userDataRes } = await getUserDetails({
                    userId: user.id,
                    type: "expertise",
                });
                // linking userId with the quizLevelId
                const { data: ubQuizId, error } = await linkDynamicQuiz({
                    userId: user.id,
                    quizLevelId,
                });

                if (error) {
                    console.error("Linking failed for quiz and user");
                    return;
                }

                if (userDataRes?.status) {
                    setUbUserData(userDataRes?.data?.data ?? {});
                    setQuizId(ubQuizId);
                }
            };

            fetchUnberryUserDetails();
        }
    }, [user, quizLevelId, getUserDetails, linkDynamicQuiz, quizId]);

    const startQuizHandler = () => {
        setStartQuiz(true);
    };

    return (
        <div className={styles.quizPlayer}>
            {showLoadingOverlay ? (
                <div className={styles.loadingOverlay}>
                    <Loader isLoading />;
                </div>
            ) : null}
            {ubUserData && quizId ? (
                <div className={styles.gameFrame}>
                    {!startQuiz &&
                    Object.keys(quizData ?? {})?.length &&
                    ubUserData &&
                    quizData?.traits?.length ? null : (
                        <Image onClick={onClose} src={CloseIcon} alt="close" />
                    )}

                    <UnberryPlayer
                        gameInfo={{
                            gameId: quizId,
                        }}
                        apiKey={ubUserData.apiKey}
                        onGameClose={quizEndHandler}
                        playerInfo={{
                            id: ubUserData.userId,
                            name: user.first_name + user.last_name,
                        }}
                        gameListMode={false}
                        showGameplayOnly
                        showBack={false}
                        organization="Wizr"
                        proctoring={{ tabSwitchLimit: 1 }}
                    />
                </div>
            ) : null}
            {!startQuiz &&
            Object.keys(quizData ?? {})?.length &&
            quizData?.traits &&
            ubUserData ? (
                <QuizCover
                    quizData={quizData}
                    startQuizHandler={startQuizHandler}
                    onClose={onClose}
                />
            ) : null}
        </div>
    );
}
