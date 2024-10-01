import { storage } from "services/storage";
import * as Duration from "tinyduration";
import { ROUTE_FALLBACKS } from "../constants";

export const randomIntFromInterval = (min, max) =>
    Math.random() * (max - min + 1) + min;

/**
 * Function to provide horizontal scrolling
 * @param {object} element Dom element
 * @param {number} speed speed of the scroll
 * @param {number} distance By how much you want to scroll the element
 * @param {number} step base value
 */
export const sideScroll = (element, speed, distance, step) => {
    const node = element; // to avoid eslint parameter rule
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
        if (!node) {
            return clearInterval(slideTimer);
        }
        node.scrollLeft += step;
        scrollAmount += Math.abs(step);
        if (scrollAmount >= distance || node.scrollLeft === 0) {
            window.clearInterval(slideTimer);
        }
        return node;
    }, speed);
};
// convert number in terms of "k"
// 1200 ===> 1.2k
export const kFormatter = (num) =>
    Math.abs(num) > 999
        ? `${Math.sign(num) * (Math.abs(num) / 1000).toFixed(2)}K`
        : Math.sign(num) * Math.abs(num);

export const navigateToNearestOpenRoute = () => {
    const currentRoute = window.location.pathname?.replace("/", "");
    setTimeout(() => storage.destroy.all(), 10);
    if (ROUTE_FALLBACKS[currentRoute]) {
        window.location.pathname = ROUTE_FALLBACKS[currentRoute];
    } else if (window.location.pathname !== "/") window.location.pathname = "/";
};

// append filters to urlParams
export const appendFilterToUrl = (key, value, customerId) => {
    let { searchParams } = new URL(window.location.href);
    let paramUrl = "?";
    if (value?.length || customerId) {
        searchParams.set(key, value);
    } else searchParams.delete(key);
    searchParams = Array.from(searchParams);
    searchParams.forEach((pair) => {
        paramUrl += `${pair[0]}=${pair[1]}&`;
    });
    paramUrl = paramUrl.slice(0, -1);
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${paramUrl}`;
    window.history.replaceState(
        { ...window.history.state, as: newUrl, url: newUrl },
        "",
        newUrl,
    );
};
export const appendPageNoToUrl = (value) => {
    let { searchParams } = new URL(window.location.href);
    let paramUrl = "?";
    if (value) {
        searchParams.set("page", value);
    } else return;
    searchParams = Array.from(searchParams);
    searchParams.forEach((pair) => {
        paramUrl += `${pair[0]}=${pair[1]}&`;
    });
    paramUrl = paramUrl.slice(0, -1);
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${paramUrl}`;
    window.history.replaceState(
        { ...window.history.state, as: newUrl, url: newUrl },
        "",
        newUrl,
    );
};

export const removeParamFromUrl = (param) => {
    let { searchParams } = new URL(window.location.href);
    let paramUrl = "?";
    searchParams.delete(param);
    searchParams = Array.from(searchParams);
    searchParams.forEach((pair) => {
        paramUrl += `${pair[0]}=${pair[1]}&`;
    });
    paramUrl = paramUrl.slice(0, -1);
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${paramUrl}`;
    window.history.replaceState(
        { ...window.history.state, as: newUrl, url: newUrl },
        "",
        newUrl,
    );
};
// parse filters from urlParams
export const fetchFiltersFromUrl = () => {
    let { searchParams } = new URL(window.location.href);
    const obj = {};
    searchParams = Array.from(searchParams);
    searchParams.forEach((pair) => {
        // ignore search route param
        if (pair[0] !== "q") obj[pair[0]] = pair[1]?.split(",");
    });
    return obj;
};

// to fix inconsistent data from backend
export const fixIncorrectExplorationFilters = (filters) => {
    if (!filters) return {};
    const incorrectToCorrectValuesMap = {
        "<10000": "0 - 10000",
        ">10K AND <30K": "10000 - 30000",
        Advance: "Advanced",
    };
    const fixValues = (values) =>
        Array.isArray(values)
            ? values?.map(
                  (value) => incorrectToCorrectValuesMap[value] ?? value,
              ) ?? []
            : incorrectToCorrectValuesMap[values] ?? values;
    const updatedFilters = Object.keys(filters).reduce(
        (acc, currentKey) => ({
            ...acc,
            [currentKey]: fixValues(filters[currentKey]),
        }),
        {},
    );
    return updatedFilters;
};

export const getLdJsonFromFaqs = (faqs = []) =>
    faqs?.length > 0
        ? {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs?.map((faq) => {
                  const question = faq?.question || faq?.question__c;
                  const answer = faq.answer || faq.answer__c;
                  return {
                      "@type": "Question",
                      name: question,
                      acceptedAnswer: {
                          "@type": "Answer",
                          text: answer,
                      },
                  };
              }),
          }
        : null;

export const addOrUpdateScript = (json, scriptId) => {
    document?.getElementById(scriptId)?.remove();
    const script = document?.createElement("script");
    if (script) {
        script?.setAttribute("type", "application/ld+json");
        script?.setAttribute("id", scriptId);
        script.textContent = JSON.stringify(json);
        document?.head?.appendChild(script);
    }
};

export const formatTimeInISO8601 = (s) => {
    const [hours, minutes, seconds, sign] =
        s > 0
            ? [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60, ""]
            : [-s / 3600, (-s / 60) % 60, -s % 60, "-"];
    return Duration.serialize({
        hours,
        minutes,
        seconds,
        negative: sign === "-",
    });
};

export const formatDurationInISO8601 = (duration, durationMedium = "") => {
    const minutesInSeconds = (minutes) => minutes * 60;
    const hoursInSeconds = (hours) => minutesInSeconds(hours * 60);
    const daysInSeconds = (days) => hoursInSeconds(days * 24);
    const weeksInSeconds = (weeks) => daysInSeconds(weeks * 7);
    const monthsInSeconds = (months) => weeksInSeconds(months * 4);
    const yearsInSeconds = (years) => monthsInSeconds(years * 12);
    const durationMap = {
        minutes: minutesInSeconds,
        minute: minutesInSeconds,
        hours: hoursInSeconds,
        hour: hoursInSeconds,
        day: daysInSeconds,
        days: daysInSeconds,
        week: weeksInSeconds,
        weeks: weeksInSeconds,
        months: monthsInSeconds,
        month: monthsInSeconds,
        year: yearsInSeconds,
        years: yearsInSeconds,
    };
    return formatTimeInISO8601(
        durationMap[durationMedium?.toLowerCase()]?.(duration) ?? 0,
    );
};

export const getCourseSchedule = (duration, medium = "") => {
    const durationMedium = medium?.toLowerCase();
    const durationmap = {
        hour: "Hours",
        hours: "Hours",
        day: "Daily",
        days: "Daily",
        week: "Weekly",
        weeks: "Weekly",
        months: "Monthly",
        month: "Monthly",
        year: "Yearly",
        years: "Yearly",
    };
    if (durationMedium === "hours" || durationMedium === "minutes") {
        return {
            courseWorkload: formatDurationInISO8601(duration, durationMedium),
        };
    }
    return {
        courseSchedule: {
            "@type": "Schedule",
            repeatCount: duration,
            repeatFrequency: durationmap[durationMedium?.toLowerCase()],
        },
    };
};

export function createSlug(slug) {
    if (slug.startsWith("http")) return slug;
    if (slug.startsWith("/")) return slug;
    return `/${slug}`;
}
