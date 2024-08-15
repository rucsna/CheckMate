import { createContext, useState, useEffect } from "react";

const languageSettings = {
    "GB": "en-GB",
    "DE": "de-DE",
    "HU": "hu-HU",
    "KR": "ko-KR"
};

const getWeekDaysArray = (locale) => {
    var baseDate = new Date(Date.UTC(2017, 0, 1));
    var weekDays = [];
    for (var i = 0; i < 7; i++) {
        weekDays.push(baseDate.toLocaleDateString(locale, { weekday: 'long' }));
        baseDate.setDate(baseDate.getDate() + 1);
    }
    return weekDays;
};

const getMonthNamesArray = (locale) => {
    var baseDate = new Date(Date.UTC(2017, 0, 1));
    var months = [];
    for (var i = 0; i < 12; i++) {
        months.push(baseDate.toLocaleDateString(locale, { month: 'long' }));
        baseDate.setMonth(baseDate.getMonth() + 1);
    }
    return months;
};

const changeLanguage = async (lang, daySetter, monthSetter, labelSetter, locSetter) => {
    const loc = languageSettings[lang] || "en-GB";
    locSetter(loc);
    const labelLang = languageSettings[lang] ? lang : "GB";

    daySetter(getWeekDaysArray(loc));
    monthSetter(getMonthNamesArray(loc));
    labelSetter(await loadLabels(labelLang));
};

const loadLabels = async (languageCode) => {
    const labels = await import(`./../locales/${languageCode}.json`);
    return labels.default;
};


export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [weekStart, setWeekStart] = useState("M");
    const [language, setLanguage] = useState("GB");
    const [weekDays, setWeekDays] = useState([]);
    const [monthNames, setMonthNames] = useState([]);
    const [labels, setLabels] = useState({});
    const [locale, setLocale] = useState("en-GB");

    useEffect(() => {
        changeLanguage(language, setWeekDays, setMonthNames, setLabels, setLocale);
    }, [language]);


    return (
        <SettingsContext.Provider value={{ weekStart, setWeekStart, language, setLanguage, weekDays, monthNames, labels, locale }}>
            {children}
        </SettingsContext.Provider>
    );
};