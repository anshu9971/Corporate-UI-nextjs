"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Dropdown } from "components/Dropdown";
import ChevronDown from "assets/svgs/chevron_down.svg";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useGetFunctionsQuery } from "services/microsite/master";
import { Tooltip } from "@mantine/core";
import { useLazyGetQuizConfigQuery } from "services/unberry";
import styles from "./DomainSelector.module.scss";

const getTextWidth = (inputText) => {
    if (!inputText) return false;
    const text = document.createElement("span");
    text.style.padding = "12px";
    text.style.fontWeight = "500";
    text.className = styles.subDomainItem;
    text.innerText = inputText;
    document.body.appendChild(text);
    const width = Math.ceil(text.offsetWidth);
    document.body.removeChild(text);
    return width;
};

function CustomRow({ value, label, description, ...others }) {
    return (
        <motion.div
            key={value}
            layoutId={value}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            transition={{
                type: "spring",
                damping: 7,
                mass: 0.5,
                stiffness: 45,
            }}
            {...others}
        >
            {label}
        </motion.div>
    );
}

export default function DomainSelector({
    onChangeSubDomain = () => {},
    onChangeDomain = () => {},
    useAllOptionInDomainDropdown = false,
    initialSelectedDomainId,
    initialSelectedSubDomainId,
    replaceUrlWithSubdomainSlug = false,
}) {
    const containerRef = useRef(null);
    const [visibleSubDomains, setVisibleSubDomains] = useState([]);
    const [remainingSubDomains, setRemainingSubDomains] = useState();
    const [allDomains, setAllDomains] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState(
        initialSelectedDomainId,
    );
    const [selectedSubDomain, setSelectedSubDomain] = useState(
        initialSelectedSubDomainId,
    );
    const { data: domainsRes } = useGetFunctionsQuery();
    const [fetchQuizConfigs, { isFetching }] = useLazyGetQuizConfigQuery();

    const [elementsToFit, setElementsToFit] = useState(3);

    useEffect(() => {
        if (initialSelectedSubDomainId) {
            setSelectedSubDomain(initialSelectedSubDomainId);
        }
        if (initialSelectedDomainId) {
            setSelectedDomain(initialSelectedDomainId);
        }
    }, [initialSelectedSubDomainId, initialSelectedDomainId]);

    useEffect(() => {
        const domains = domainsRes?.data?.data
            ?.map((domain) => ({
                ...domain,
                label: domain?.function_name,
                value: domain?.function_id,
                id: domain?.function_id,
            }))
            ?.filter((domain) => !!domain?.unberry_subject_id);

        if (domains?.length) {
            setAllDomains([
                ...(useAllOptionInDomainDropdown
                    ? [{ label: "All", value: -1, id: -1 }]
                    : []),
                ...domains,
            ]);
        }
    }, [domainsRes, useAllOptionInDomainDropdown, initialSelectedDomainId]);
    const moveElementToFront = (index, array) => {
        if (
            Number.isInteger(index) &&
            Array.isArray(array) &&
            index >= 0 &&
            index <= array.length
        ) {
            // Remove the element at index
            const removedElement = array.splice(index, 1)[0];

            // Add the removed element at the beginning of the array
            array.unshift(removedElement);
        }
    };

    useEffect(() => {
        if (!Number.isInteger(selectedDomain) || selectedDomain < 0) return;
        const domain = allDomains?.find(
            (el) => el?.function_id === selectedDomain,
        );
        fetchQuizConfigs({ domainId: domain?.unberry_subject_id }, true).then(
            ({ data = {} }) => {
                const subDomains = data?.map((subDomain) => ({
                    ...subDomain,
                    label: subDomain?.skill_name,
                    value: subDomain?.skill_id,
                    id: subDomain?.skill_id,
                }));
                const index = subDomains?.findIndex(
                    (el) => el.value === initialSelectedSubDomainId,
                );
                if (index > 0) {
                    moveElementToFront(index, subDomains);
                }
                if (subDomains?.length) {
                    setVisibleSubDomains(subDomains?.slice(0, elementsToFit));
                    setRemainingSubDomains(
                        subDomains?.slice(elementsToFit, subDomains?.length),
                    );
                    if (initialSelectedSubDomainId === subDomains?.[0]?.value)
                        setSelectedSubDomain(subDomains?.[0]);
                }
            },
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDomain, fetchQuizConfigs, initialSelectedSubDomainId]);
    useEffect(
        () => {
            onChangeSubDomain(selectedSubDomain);
            if (
                replaceUrlWithSubdomainSlug &&
                selectedSubDomain?.slug &&
                initialSelectedSubDomainId !== null &&
                initialSelectedSubDomainId !== selectedSubDomain.id
            ) {
                const newUrl = `${window.location.protocol}//${window.location.host}/${selectedSubDomain.slug}`;
                window.history.replaceState(
                    { ...window.history.state, as: newUrl, url: newUrl },
                    "",
                    newUrl,
                );
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedSubDomain],
    );
    useEffect(
        () =>
            onChangeDomain(
                allDomains?.find(
                    (domain) => domain?.function_id === selectedDomain,
                ),
            ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedDomain],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const availableWidth =
            document?.getElementById("visible-domains-container")
                ?.clientWidth || 800;
        const allSubDomains = [
            ...(visibleSubDomains || []),
            ...(remainingSubDomains || []),
        ];
        let visible = 0;
        let totalWidth = 0;
        while (visible <= allSubDomains.length && totalWidth < availableWidth) {
            const width = getTextWidth(allSubDomains?.[visible]?.label);
            if (!width) return;
            totalWidth += width;
            if (totalWidth >= availableWidth) break;
            visible += 1;
        }
        if (visible !== elementsToFit) setElementsToFit(Math.max(2, visible));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDomain, selectedSubDomain, domainsRes, isFetching]);
    useEffect(() => {
        if (elementsToFit === visibleSubDomains?.length) return;
        const allSubDomains = [
            ...(visibleSubDomains ?? []),
            ...(remainingSubDomains ?? []),
        ];
        setVisibleSubDomains(allSubDomains?.slice(0, elementsToFit));
        setRemainingSubDomains(
            allSubDomains?.slice(elementsToFit, allSubDomains?.length),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elementsToFit]);

    const selectVisibleSubDomain = useCallback(
        (item) => {
            containerRef.current.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
            const index = visibleSubDomains?.findIndex(
                (el) => el.value === item.value,
            );
            moveElementToFront(index, visibleSubDomains);
            setVisibleSubDomains(visibleSubDomains);
            setSelectedSubDomain(item);
        },
        [visibleSubDomains, containerRef],
    );

    const selectFromRemainingSubDomains = useCallback(
        (value) => {
            const index = remainingSubDomains.findIndex(
                (el) => el.value === value,
            );
            containerRef.current.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });

            setSelectedSubDomain(remainingSubDomains[index]);
            if (index !== -1) {
                // Remove the element at index
                const removedElement = remainingSubDomains.splice(index, 1)[0];

                const arr1 = [...visibleSubDomains];
                const arr2 = [...remainingSubDomains];

                arr1.unshift(removedElement);

                const lastElementArr1 = arr1.pop();
                arr2.unshift(lastElementArr1);
                setVisibleSubDomains(arr1);
                setRemainingSubDomains(arr2);
            }
        },
        [visibleSubDomains, remainingSubDomains],
    );
    useEffect(() => {
        const selected = allDomains?.find(({ id }) => id === selectedDomain);
        const element = document.getElementById("domain-category-selector");
        const contentLength = selected?.label?.length ?? 20;
        if (element && contentLength) element.size = contentLength + 2;
    }, [selectedDomain]);
    return (
        <div ref={containerRef} className={styles.container}>
            <div className={styles.domainCategoryContainer}>
                <Dropdown
                    className={`${styles.domainCategory}`}
                    options={allDomains}
                    value={selectedDomain}
                    onChange={(...args) => {
                        setSelectedSubDomain(null);
                        setSelectedDomain(...args);
                    }}
                    rightSection={<Image src={ChevronDown} />}
                    placeholder="Select your function"
                    id="domain-category-selector"
                />
            </div>
            <AnimatePresence>
                <div
                    className={styles.domainsWrapper}
                    key="domains-wrapper"
                    id="visible-domains-container"
                >
                    {selectedDomain > -1 &&
                        visibleSubDomains.map((item) => (
                            <Tooltip
                                label={item.label}
                                key={`${item.value}-${item.label}`}
                                positionDependencies={[selectedSubDomain]}
                                transitionProps={{ transition: "pop" }}
                                events={{
                                    hover: item?.label?.length > 20,
                                    focus: false,
                                    touch: false,
                                }}
                            >
                                <motion.div
                                    key={`${item.value}-${item.label}`}
                                    layoutId={item.value}
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                    }}
                                    transition={{
                                        type: "spring",
                                        damping: 8.1,
                                        mass: 0.5,
                                        stiffness: 45,
                                    }}
                                    type="button"
                                    className={`${styles.subDomainItem} ${
                                        item.value === selectedSubDomain?.value
                                            ? styles.selected
                                            : ""
                                    }`}
                                    onClick={() => selectVisibleSubDomain(item)}
                                >
                                    <span>{item.label}</span>
                                </motion.div>
                            </Tooltip>
                        ))}
                </div>
                {selectedDomain > -1 && remainingSubDomains?.length > 0 && (
                    <Dropdown
                        key="domain-dropdown"
                        className={styles.moreOptions}
                        options={remainingSubDomains}
                        onChange={selectFromRemainingSubDomains}
                        placeholder="More"
                        itemComponent={CustomRow}
                        value={{ label: "More", value: -1 }}
                        rightSection={
                            <Image src={ChevronDown} alt="down-chevron" />
                        }
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
