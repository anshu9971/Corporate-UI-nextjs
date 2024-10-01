import ArrowRight from "assets/svgs/PlayIcon.svg";
import Image from "next/image";
// import { useGetItemsFromCollectionMutation } from "services/webflow";
import Link from "next/link";
import { useState } from "react";
import { staticData } from "./constant";
import styles from "./index.module.scss";

function PodcastCard(data) {
    const { name, link, bg } = data ?? {};

    return (
        <div
            className={styles.podcastCard}
            style={{ backgroundImage: `url(${bg.src})` }}
        >
            <h4>{name}</h4>
            <div className={styles.infoWithPlay}>
                <div className={styles.creator}>
                    {/* {thumbnail && (
                        <Image
                            src={thumbnail.url}
                            alt=""
                            width={34}
                            height={34}
                        />
                    )} */}
                    {/* <h4>Text</h4> */}
                </div>
                {link && (
                    <Link className={styles.playBtn} href={`/podcasts/${link}`}>
                        {/* onClick={() => window.open(link, "_blank")}
                        onKeyDown={() => window.open(link, "_blank")}
                        role="button"
                        tabIndex="0" */}
                        <Image src={ArrowRight} alt="play" />
                    </Link>
                )}
                {!link && <div className={styles.comingSoon}>Coming Soon!</div>}
            </div>
        </div>
    );
}

export function Podcasts() {
    const [itemsData] = useState(staticData);

    // /// WEBFLOW INTEGRATION START
    // const [performGetItemsFromCollectionQuery] =
    //     useGetItemsFromCollectionMutation();

    // const getItems = useCallback(async () => {
    //     const res = await performGetItemsFromCollectionQuery({
    //         collectionId: "64b28ffe5e73b516e5236452",
    //     });

    //     if (res?.data?.status === 200) {
    //         const itemsRes = res.data.data;
    //         if (itemsRes?.items?.length > 0) {
    //             const filteredCollection =
    //                 itemsRes.items.length > 4
    //                     ? itemsRes.items.filter((i, idx) => idx < 4 && i)
    //                     : itemsRes.items;
    //             setItemsData(filteredCollection || []);
    //         }
    //     }
    // }, [performGetItemsFromCollectionQuery]);

    // useEffect(() => {
    //     getItems();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    // /// WEBFLOW INTEGRATION END

    return (
        <div className={styles.podcastGrid}>
            {itemsData.length > 0 &&
                itemsData?.map((data) => (
                    <div className={styles.staticCard}>
                        <PodcastCard {...data} />
                    </div>
                ))}
        </div>
    );
}
