import Image from "next/image";
import Peace from "assets/svgs/peace_icon.svg";
import styles from "./Tile.module.scss";

export function Tile({ text }) {
    return (
        <div className={styles.tileContainer}>
            <Image src={Peace} alt="tile_icon" className={styles.tileIcon} />
            <div className={styles.verticalPointer} />
            <h3 className={styles.textContent}>{text}</h3>
        </div>
    );
}
