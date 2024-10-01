import { useEffect, useState } from "react";
import styles from "./SemesterCard.module.scss";

export default function SemesterCard({ topics }) {
    const [content, setContent] = useState([]);

    function checkForSemesters() {
        // const arr = [];
        // // let start = 0;
        // let numberOfArray = 0;
        // for(let cont = 0; cont < (semesterStack.length - 1) ; cont + 1){
        //     if (semesterCollection[cont + 1].startsWith("Semester")) {
        //         alert("Semester found")
        //         console.log(numberOfArray+1)
        //         // arr.push(semesterCollection.slice(start, cont))
        //         // console.log(arr)
        //         // start = cont;
        //     }
        // }
        // console.log("DIVIDED ARRAYS !!!!!")
        // for (let item = 0; item < semesterCollection.length - 1; item + 1) {
        //     console.log(item);
        //     console.log("item ");
        // }
    }

    useEffect(() => {
        if (topics) {
            const arr = topics.split("<br>");
            const found = arr.find((ar) => ar?.startsWith("Semester"));
            if (found) {
                checkForSemesters(arr);
            }

            setContent(arr);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topics]);

    return (
        <div className={styles.semesterCardContainer}>
            <div className={styles.pointer}>
                <div className={styles.point} />
            </div>
            <h2 className={styles.title}>Semester 1</h2>
            {content.map((item) => (
                <div className={styles.content}>
                    <div className={styles.point} />

                    {/* <div className={styles.courseCount}>Course {idx + 1}</div> */}
                    <div className={styles.courseName}>{item}</div>
                </div>
            ))}
            <div className={styles.overlayt} />
            <div className={styles.overlayp} />
        </div>
    );
}
