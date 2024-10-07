import styles from "./newsRoom.module.scss";

const Newsroom = () => {
    const articles = [
        {
            id: 1,
            title: "Eduvanz wins Best FinTech company in Education at BW Businessworld Awards 2022",
            source: "https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsroom/81/bwedulogo.png",
            date: "Aug 20 2022",
            link: "#",
        },
        {
            id: 2,
            title: "How BNPL financing can transform learning",
            source: "	https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsroom/80/finexpress.jpg",
            date: "May 30 2022",
            link: "#",
        },
        {
            id: 3,
            title: "Mass layoffs, offline classes: How edtech is coping with schools, colleges reopening",
            source: "	https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/newsroom/78/Print.1.jpg",
            date: "May 17 2022",
            link: "#",
        },
    ];

    return (
        <div className={styles.newsroom}>
            <h2>NEWSROOM</h2>
            <p>Noticed by some renowned news agency & media</p>
            <div className={styles.articles}>
                {articles.map((article) => (
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
