import { createContext, useState, useContext, useMemo, useCallback } from "react";
import { SettingsContext } from "./SettingsContext";
import { monthLengthCounter, getStartDay, getWeekNumber } from "../library/dateUtils";
import { CURRENT_DATE } from "../library/constants";


export const DateContext = createContext();

export const DateProvider = ({ children }) => {
    const { weekStart } = useContext(SettingsContext);

    const [selectedYear, setSelectedYear] = useState(CURRENT_DATE.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(CURRENT_DATE.getMonth());
    const [selectedDay, setSelectedDay] = useState(CURRENT_DATE.getDate());
    const [isToday, setIsToday] = useState(false);
    const [daysInTheMonth, setDaysInTheMonth] = useState(monthLengthCounter(CURRENT_DATE.getMonth() + 1, CURRENT_DATE.getFullYear()));
    const [startDay, setStartDay] = useState(0);
    const [startDayIfMonday, setStartDayIfMonday] = useState(getStartDay(CURRENT_DATE.getMonth(), CURRENT_DATE.getFullYear(), 1) - 1);
    const [startDayIfSunday, setStartDayIfSunday] = useState(getStartDay(CURRENT_DATE.getMonth(), CURRENT_DATE.getFullYear(), 1));
    const [weekNumber, setWeekNumber] = useState(getWeekNumber(CURRENT_DATE.getMonth(), CURRENT_DATE.getFullYear()));


    const handleMonthChange = useCallback((monthIndex, year = selectedYear) => {
        const lengthOfMonth = monthLengthCounter(Number(monthIndex) + 1, year);
        const day1 = getStartDay(Number(monthIndex), year, 1) - 1;
        const day2 = getStartDay(Number(monthIndex), year, 1);

        day1 < 0 ? setStartDayIfMonday(6) : setStartDayIfMonday(day1);
        setStartDayIfSunday(day2);
        weekStart === "Monday" ? setStartDay(day1) : setStartDay(day2);

        setSelectedMonth(monthIndex);
        setWeekNumber(getWeekNumber(monthIndex, year));
        setDaysInTheMonth(lengthOfMonth);
    }, [selectedYear, weekStart]);

    const contextValue = useMemo(() => ({
        selectedYear, 
        setSelectedYear, 
        selectedMonth, 
        setSelectedMonth, 
        selectedDay, 
        setSelectedDay, 
        isToday, 
        setIsToday, 
        handleMonthChange, 
        daysInTheMonth, 
        startDay, 
        setStartDay, 
        startDayIfMonday, 
        startDayIfSunday, 
        weekNumber, 
        monthLengthCounter
    }), [selectedYear, 
        selectedMonth, 
        selectedDay, 
        isToday, 
        daysInTheMonth, 
        startDay, 
        weekNumber]);

    return (
        <DateContext.Provider value={contextValue}>
            {children}
        </DateContext.Provider>
    )
}