import ScoreBar from "components/ScoreBar";
import { TRAITS_LABELS } from "../../utils/constants";
import styles from "./ReportScore.module.scss";

export function ReportScore({
    traitName,
    score,
    traitDescription,
    className = "",
    color,
}) {
    const roundOffScore = score.toFixed(1);
    return (
        <div className={`${styles.report} ${className}`}>
            <div className={styles.traitOuterContainer}>
                <div
                    className={styles.leftColorBar}
                    style={{ backgroundColor: color }}
                >
                    {" "}
                </div>
                <div className={styles.traitContainer}>
                    <h4 className={styles.trait}>
                        {TRAITS_LABELS[traitName] ?? traitName}
                    </h4>
                    {traitDescription && (
                        <p className={styles.traitDescription}>
                            {traitDescription}
                        </p>
                    )}
                </div>
            </div>
            <div className={styles.scoreBarContainer}>
                <span>{roundOffScore ?? 0}</span>
                <ScoreBar score={roundOffScore ?? 0} color={color} />
            </div>
        </div>
    );
}
