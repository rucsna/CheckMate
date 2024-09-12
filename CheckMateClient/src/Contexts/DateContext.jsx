import { createContext, useState, useContext, useMemo } from "react";
import { SettingsContext } from "./SettingsContext";

// functions for date manipulation
const getMonthName = (monthIndex) => new Date(1970, monthIndex, 1).toLocaleString('en-US', { month: 'long' });

const getMonthNumberFromName = (monthName) => {
    const year = new Date().getFullYear();
    return new Date(`${monthName} 1, ${year}`).getMonth() + 1;
};

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

// initializing functions for creating the month table
const monthLengthCounter = (month, year) => new Date(year, month, 0).getDate();

const getStartDay = (month, year, day) => new Date(year, month, day).getDay();

const getWeekNumber = (month, year) => {
    var currDate = new Date(year, month, 1);
    var oneJan = new Date(year, 0, 1);
    var numberOfDays = Math.floor((currDate - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((currDate.getDay() + 1 + numberOfDays) / 7);
};


export const DateContext = createContext();

export const DateProvider = ({ children }) => {
    const { weekStart } = useContext(SettingsContext);
    const currentDate = new Date();

    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedDay, setSelectedDay] = useState(currentDate.getDate());
    const [isToday, setIsToday] = useState(false);
    const [daysInTheMonth, setDaysInTheMonth] = useState(monthLengthCounter(currentDate.getMonth() + 1, currentDate.getFullYear()));
    const [startDay, setStartDay] = useState(0);
    const [startDayIfMonday, setStartDayIfMonday] = useState(getStartDay(currentDate.getMonth(), currentDate.getFullYear(), 1) - 1);
    const [startDayIfSunday, setStartDayIfSunday] = useState(getStartDay(currentDate.getMonth(), currentDate.getFullYear(), 1));
    const [weekNumber, setWeekNumber] = useState(getWeekNumber(currentDate.getMonth(), currentDate.getFullYear()));


    const handleMonthChange = (monthIndex, year = selectedYear) => {
        const lengthOfMonth = monthLengthCounter(Number(monthIndex) + 1, year);
        const day1 = getStartDay(Number(monthIndex), year, 1) - 1;
        const day2 = getStartDay(Number(monthIndex), year, 1);

        day1 < 0 ? setStartDayIfMonday(6) : setStartDayIfMonday(day1);
        setStartDayIfSunday(day2);
        weekStart === "M" ? setStartDay(day1) : setStartDay(day2);

        setSelectedMonth(monthIndex);
        setWeekNumber(getWeekNumber(monthIndex, year));
        setDaysInTheMonth(lengthOfMonth);
    };

    const contextValue = useMemo(() => ({
        currentDate, selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, selectedDay, setSelectedDay, getMonthName, getMonthNumberFromName, formatDate, isToday, setIsToday, handleMonthChange, daysInTheMonth, startDay, setStartDay, startDayIfMonday, startDayIfSunday, weekNumber, monthLengthCounter
    }), [currentDate, selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, selectedDay, setSelectedDay, isToday, setIsToday, daysInTheMonth, startDay, weekNumber]);

    return (
        <DateContext.Provider value={contextValue}>
            {children}
        </DateContext.Provider>
    )
}