import VideoPlayer from "components/VideoPlayer";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { resetVideoUrl } from "redux/store/globalSlice";

export function RootVideoPlayer() {
    const videoUrl = useSelector(({ global }) => global.videoUrl);
    const dispatch = useDispatch();

    return (
        <AnimatePresence>
            {videoUrl && (
                <VideoPlayer
                    showVideo={!!videoUrl}
                    title=""
                    subText=""
                    url={videoUrl}
                    onClose={() => {
                        dispatch(resetVideoUrl());
                    }}
                    autoPlay
                />
            )}
        </AnimatePresence>
    );
}
