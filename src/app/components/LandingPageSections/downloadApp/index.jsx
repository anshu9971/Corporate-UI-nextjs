import Image from "next/image";
import styles from "./downloadApp.module.scss";

const DownloadApp = () => {
    return (
        <section className={styles.downloadApp}>
            <h2 className={styles.title}>DOWNLOAD OUR APP</h2>
            <p className={styles.subtitle}>
                Take the First Step Towards a Successful Career
            </p>

            <div className={styles.container}>
                <div className={styles.form}>
                    <p>
                        Get Loan at Your Fingertips by applying via{" "}
                        <strong>Eduvanz App</strong>
                    </p>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Enter Your Mobile No."
                            className={styles.input}
                        />
                        <button className={styles.getAppButton}>Get App</button>
                    </div>
                    <p className={styles.or}>OR</p>
                    <a href="#" className={styles.downloadLink}>
                        <img
                            src="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/google.png"
                            alt="Google Play Store"
                        />
                    </a>
                </div>

                <div className={styles.imageContainer}>
                    <img
                        src="	https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/download-app-new.png"
                        alt="App Preview"
                        className={styles.appImage}
                    />
                </div>
            </div>

            <div className={styles.qrContainer}>
                <p>Scan the QR Code to Download Our App</p>
                <img
                    src="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/QR%20CODE.png"
                    alt="QR Code"
                    className={styles.qrCode}
                />
            </div>
        </section>
    );
};

export default DownloadApp;
