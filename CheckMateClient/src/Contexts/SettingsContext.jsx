import { createContext, useState, useEffect } from "react";

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

const changeLanguage = (lang, daySetter, monthSetter, labelSetter) => {
    switch (lang) {
        case "eng": {
            daySetter(getWeekDaysArray("en-US"));
            monthSetter(getMonthNamesArray("en-US"));
            labelSetter({newTodoButton: "New todo",
                todaysTasks: "Today's tasks",
                settings: "Settings",
                weekStartM: "Week starts with Monday",
                weekStartS: "Week starts with Sunday",
                chooseLanguage: "Select language",
                task: "Task",
                date: "Date",
                save: "Save",
                placeholder: "Enter your todo here..."});
        };
            break;
        case "ger": {
            daySetter(getWeekDaysArray("de-DE"));
            monthSetter(getMonthNamesArray("de-DE"));
            labelSetter({
                newTodoButton: "Neue Aufgabe",
                todaysTasks: "Aufgaben für heute",
                settings: "Einstellungen",
                weekStartM: "Woche beginnt mit Montag",
                weekStartS: "Woche beginnt mit Sonntag",
                chooseLanguage: "Sprache auswählen",
                task: "Aufgabe",
                date: "Datum",
                save: "Speichern",
                placeholder: "Aufgabe eingeben..."
            });
        };
            break;
        case "hun": {
            daySetter(getWeekDaysArray("hu-HU"))
            monthSetter(getMonthNamesArray("hu-HU"));
            labelSetter({
                newTodoButton: "Új feladat",
                todaysTasks: "Feladatok mára",
                settings: "Beállítások",
                weekStartM: "Hétfővel kezdődjön a hét",
                weekStartS: "Vasárnappal kezdődjön a hét",
                chooseLanguage: "Válassz nyelvet",
                task: "Feladat",
                date: "Dátum",
                save: "Mentés",
                placeholder: "Írd ide a teendődet..."
            });
        };
            break;
        case "kor": {
            daySetter(getWeekDaysArray("ko-KR"))
            monthSetter(getMonthNamesArray("ko-KR"));
            labelSetter({
                newTodoButton: "새 태스크",
                todaysTasks: "오늘의 태스크",
                settings: "설정",
                weekStartM: "주는 월요일부터 시작하다",
                weekStartS: "주는 일요일부터 시작하다",
                chooseLanguage: "언어 선택",
                task: "태스크",
                date: "날짜",
                save: "저장하다",
                placeholder: "작업을 입력하세요..."
            });
        };
            break;
        default: {
            daySetter(getWeekDaysArray("en-US"))
            monthSetter(getMonthNamesArray("en-US"));
        };
            break;
    }
};

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [weekStart, setWeekStart] = useState("M");
    const [language, setLanguage] = useState("eng");
    const [weekDays, setWeekDays] = useState([]);
    const [monthNames, setMonthNames] = useState([]);
    const [labels, setLabels] = useState({
        newTodoButton: "New todo",
        todaysTasks: "Today's tasks",
        settings: "Settings",
        weekStartM: "Week starts with Monday",
        weekStartS: "Week starts with Sunday",
        chooseLanguage: "Select language",
        task: "Task",
        date: "Date",
        save: "Save",
        placeholder: "Enter your todo here..."
    });

    useEffect(() => {
        changeLanguage(language, setWeekDays, setMonthNames, setLabels);
    }, [language]);


    return (
        <SettingsContext.Provider value={{ weekStart, setWeekStart, language, setLanguage, weekDays, monthNames, labels }}>
            {children}
        </SettingsContext.Provider>
    );
};