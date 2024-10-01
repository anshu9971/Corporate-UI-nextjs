// import { useGetItemsFromCollectionMutation } from "services/webflow";

import ArrowRight from "assets/svgs/PlayIcon.svg";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setVideoUrl } from "redux/store/globalSlice";
import { staticData } from "./constant";
import styles from "./index.module.scss";

// export function Stories({ setSource = () => {}, setvideo = () => {} }) {
export function Stories() {
    const dispatch = useDispatch();

    const [activeStory, setActiveStory] = useState(staticData[0]);
    const [itemsData] = useState(staticData);

    // /// WEBFLOW INTEGRATION START
    // const [performGetItemsFromCollectionQuery] =
    //     useGetItemsFromCollectionMutation();

    // const getItems = useCallback(async () => {
    //     const res = await performGetItemsFromCollectionQuery({
    //         collectionId: "64ea103807334aa0d94be961",
    //     });

    //     if (res?.data?.status === 200) {
    //         const itemsRes = res.data.data;
    //         if (itemsRes?.items?.length > 0) {
    //             const item = itemsRes.items[0];
    //             const filteredCollection =
    //                 itemsRes.items.length > 5
    //                     ? itemsRes.items.filter((i, idx) => idx < 3 && i)
    //                     : itemsRes.items;
    //             setItemsData(filteredCollection || []);
    //             setActiveStory(item);
    //         }
    //     }
    // }, [performGetItemsFromCollectionQuery]);

    // useEffect(() => {
    //     getItems();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    // /// WEBFLOW INTEGRATION END

    // useEffect(() => {
    //     if (activeStory["youtube-video-link"]?.url) {
    //         setSource(activeStory["youtube-video-link"].url);
    //     }

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [activeStory]);

    return (
        <div className={styles.stories}>
            <div className={styles.thumbnailWrapper}>
                {itemsData?.length > 0 &&
                    itemsData?.map((item) => (
                        <button
                            key={item["thumbnail-image"]?.url}
                            type="button"
                            onClick={() => {
                                setActiveStory(item);
                            }}
                        >
                            <Image
                                style={{ borderRadius: "100%" }}
                                src={item["thumbnail-image"].url}
                                alt="thumbnail"
                                width={80}
                                height={80}
                            />
                        </button>
                    ))}
            </div>
            <div className={`${styles.storyCard} ${styles.desktopVideos}`}>
                <div className={styles.cover} />
                <Image
                    src={
                        activeStory["thumbnail-image"] &&
                        activeStory["thumbnail-image"].url
                    }
                    alt=""
                    fill
                />

                <div className={styles.playBtnWrapper}>
                    <Image
                        src={ArrowRight}
                        alt=""
                        onClick={() => {
                            dispatch(
                                setVideoUrl(
                                    activeStory["youtube-video-link"].url,
                                ),
                            );
                        }}
                    />
                </div>
            </div>

            {itemsData?.length > 0 &&
                itemsData?.map((item) => (
                    <div
                        className={`${styles.storyCard} ${styles.mobileVideos}`}
                        key={item["thumbnail-image"]?.url}
                    >
                        <Image
                            src={
                                item["thumbnail-image"] &&
                                item["thumbnail-image"].url
                            }
                            alt=""
                            width={248}
                            height={393}
                        />
                        <div className={styles.playBtnWrapper}>
                            <Image
                                src={ArrowRight}
                                alt=""
                                onClick={() => {
                                    setActiveStory(item);
                                    dispatch(
                                        setVideoUrl(
                                            activeStory["youtube-video-link"]
                                                .url,
                                        ),
                                    );
                                }}
                            />
                        </div>
                    </div>
                ))}
        </div>
    );
}
