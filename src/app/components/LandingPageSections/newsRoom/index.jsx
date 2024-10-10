import { ARTICLES } from "utils/constants/landingPage";
import styles from "./newsRoom.module.scss";

const Newsroom = () => {
    return (
        <div className={styles.newsroom}>
            <h2>NEWSROOM</h2>
            <p>Noticed by some renowned news agency & media</p>
            <div className={styles.articles}>
                {ARTICLES.map((article) => (
                    <div key={article.id} className={styles.article}>
                        <img src={article.source} alt="article" />
                        <p>{article.title}</p>
                        <div className={styles.meta}>
                            <span>{article.date}</span>
                            <a
                                href={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                FULL STORY
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            <button className={styles.viewMore}>View More</button>
        </div>
    );
};

export default Newsroom;
