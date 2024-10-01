import styles from "./index.module.scss";

export function Folder({ children }) {
    return <div className={styles.folder}>{children}</div>;
}
