import { useEffect, useState } from "react";

export const useHorizontalScrollControls = (
    ref,
    { scrollOffset = 250, smooth = false } = {},
) => {
    if (!ref) {
        throw new Error("Missing required parameter ref");
    }
    const [canScroll, setCanScroll] = useState({
        left: true,
        right: true,
        isScrollable: true,
    });

    if (smooth && ref?.current?.style) {
        const item = ref?.current;
        item.style.scrollBehavior = "smooth";
    }

    const scroll = (scrollBy) => {
        const item = ref?.current;
        if (!Number.isInteger(Math.round(item?.scrollLeft))) return;

        const newScroll = item.scrollLeft + scrollBy;
        item.scrollLeft = newScroll;
    };

    const scrollLeft = () => scroll(Math.abs(scrollOffset) * -1);
    const scrollRight = () => scroll(Math.abs(scrollOffset));

    useEffect(() => {
        if (!ref) return () => {};
        const node = ref.current;

        const scrollEndHandler = () => {
            const newScroll = node.scrollLeft;
            setCanScroll(() => ({
                left: newScroll > 0,
                right:
                    Math.round(newScroll + node.clientWidth) < node.scrollWidth,
                isScrollable:
                    (node?.scrollWidth ?? 0) > (node?.offsetWidth ?? 0),
            }));
        };

        node.addEventListener("scrollend", scrollEndHandler);

        return () => node.removeEventListener("scrollend", scrollEndHandler);
    }, [ref]);

    useEffect(() => {
        const item = ref?.current;
        setCanScroll(() => ({
            left: item.scrollLeft > 0,
            right: item.scrollWidth - item.scrollLeft > 0,
            isScrollable: (item?.scrollWidth ?? 0) > (item?.offsetWidth ?? 0),
        }));
    }, []);

    return [
        scrollLeft,
        scrollRight,
        canScroll?.left,
        canScroll?.right,
        canScroll?.isScrollable,
    ];
};
