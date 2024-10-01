import Image from "next/image";
import GreenTick from "assets/svgs/green_tick.svg";
import styles from "./Learning.module.scss";

export function Learning({ id, concept, description }) {
    return (
        <div className={styles.learnings} key={id}>
            <div className={styles.learning}>
                <Image src={GreenTick} alt="learning_icon" />
                <div className={styles.content}>
                    <h3>{concept}</h3>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}
