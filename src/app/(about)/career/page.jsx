"use client";

import Image from "next/image";
import { Button } from "components/Button";
import styles from "./career.module.scss";

export default function Impact() {
    return (
        <div className={styles.container}>
            <section className={styles.section1}>
                <div className={styles.div2}>
                    <h1>The Eduvanz Story</h1>
                    <h6>
                        EDUCATION SHOULDNT BE A PRIVILEGE, IT SHOULD BE A RIGHT.
                    </h6>
                    <p>
                        Eduvanz believes in making education accessible for all.
                    </p>
                    <p>
                    Join us if your aim aligns with ours!
                    </p>

                    <Button variant="filled">
                        View Openings
                    </Button>
                </div>
                <div>
                    <Image
                        src="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/hiring.png"
                        alt="about section image"
                        width={500}
                        height={600}
                        layout="responsive"
                    />
                </div>
            </section>
            <section className={styles.section2}>
                <div>
                    Ready for a new career!
                </div>
            </section>
        </div>
    );
}
