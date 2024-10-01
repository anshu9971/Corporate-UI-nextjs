import { useState } from "react";
// import { useGetItemsFromCollectionMutation } from "services/webflow";
import ArticleIcon from "assets/svgs/Article.svg";
import Arrow from "assets/svgs/circularArrow.svg";
import Image from "next/image";
import Link from "next/link";
import { staticData } from "./constant";
import styles from "./index.module.scss";

export function Blogs() {
    const [insightsData] = useState(staticData);

    // /// WEBFLOW INTEGRATION START
    // const [performGetItemsFromCollectionQuery] =
    //     useGetItemsFromCollectionMutation();

    // const getItems = useCallback(async () => {
    //     const res = await performGetItemsFromCollectionQuery({
    //         collectionId: "64a01029b275c16702c09c95",
    //     });

    //     if (res?.data?.status === 200) {
    //         const itemsRes = res.data.data;
    //         if (itemsRes?.items?.length > 0) {
    //             const filteredCollection =
    //                 itemsRes.items.length > 3
    //                     ? itemsRes.items.filter((i, idx) => idx < 3 && i)
    //                     : itemsRes.items;
    //             setInsightsData(filteredCollection || []);
    //         }
    //     }
    // }, [performGetItemsFromCollectionQuery]);

    // useEffect(() => {
    //     getItems();

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    // /// WEBFLOW INTEGRATION END

    return (
        <div className={styles.blogs}>
            {insightsData?.length &&
                insightsData.map((blog, index) => (
                    <div className={styles.blogCardWrapper}>
                        <Link
                            className={styles.blogCard}
                            href={`/articles/${blog.slug}`}
                        >
                            <div className={styles.header}>
                                <div className={styles.blogImg}>
                                    {window.innerWidth > 1024 ? (
                                        <Image
                                            src={
                                                blog["thumbnail-image"].web_url
                                            }
                                            alt=""
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            style={{
                                                objectFit: "contain",
                                                width: "100%",
                                                height: "auto",
                                            }}
                                        />
                                    ) : (
                                        <Image
                                            src={
                                                blog["thumbnail-image"]
                                                    .mobile_url
                                            }
                                            alt=""
                                            width={232}
                                            height={259}
                                            style={{
                                                height:
                                                    window.innerWidth > 1281
                                                        ? "259px"
                                                        : "170px",
                                                width:
                                                    window.innerWidth > 1281
                                                        ? "232px"
                                                        : "100%",
                                            }}
                                        />
                                    )}
                                </div>
                                <div className={styles.headerInfo}>
                                    <Image src={ArticleIcon} alt="" />
                                    <p>Read the whole story</p>
                                </div>
                            </div>

                            <div className={styles.info}>
                                <h4>
                                    {" "}
                                    {blog.name} {index === 2 && <br />}
                                </h4>
                                {/* <p>Transform your unique traits</p> */}
                                <div className={styles.footer}>
                                    <h5> </h5>
                                    <Image src={Arrow} alt="" />
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
        </div>
    );
}
