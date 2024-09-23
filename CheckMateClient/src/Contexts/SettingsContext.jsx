import { createContext, useState, useEffect } from "react";
import {getMonthNamesArray, getWeekDaysArray, loadLabels } from "../library/languageUtils.js"; 
import { LANGUAGE_OPTIONS, INITIAL_LANGUAGE } from "../library/constants";


export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [weekStart, setWeekStart] = useState("Monday");
    const [language, setLanguage] = useState(INITIAL_LANGUAGE.slice(-2));
    const [weekDays, setWeekDays] = useState([]);
    const [monthNames, setMonthNames] = useState([]);
    const [labels, setLabels] = useState({});
    const [locale, setLocale] = useState(INITIAL_LANGUAGE);

    useEffect(() => {
        const changeLanguage = async (lang, daySetter, monthSetter, labelSetter, locSetter) => {
            const loc = LANGUAGE_OPTIONS[lang] || INITIAL_LANGUAGE;
            locSetter(loc);
            const labelLang = LANGUAGE_OPTIONS[lang] ? lang : INITIAL_LANGUAGE.slice(-2);

            daySetter(getWeekDaysArray(loc));
            monthSetter(getMonthNamesArray(loc));
            labelSetter(await loadLabels(labelLang));
        };

        changeLanguage(language, setWeekDays, setMonthNames, setLabels, setLocale);
    }, [language]);


    return (
        <SettingsContext.Provider value={{ weekStart, setWeekStart, language, setLanguage, weekDays, monthNames, labels, locale }}>
            {children}
        </SettingsContext.Provider>
    );
};