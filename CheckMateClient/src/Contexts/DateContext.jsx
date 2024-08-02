import { createContext, useState } from "react";

export const DateContext = createContext();

export const DateProvider = ({children}) => {
    const getMonthName = (monthIndex) => new Date(1970, monthIndex, 1).toLocaleString('en-US', { month: 'long' });

    const getMonthNumberFromName = (monthName) => {
        const year = new Date().getFullYear();
        return new Date(`${monthName} 1, ${year}`).getMonth() + 1;
    };

    const currentDate = new Date();
    
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(getMonthName(currentDate.getMonth()));
    const [selectedDay, setSelectedDay] = useState(currentDate.getDate());
    const [isToday, setIsToday] = useState(false);    

    


    return(
        <DateContext.Provider value={{
            currentDate,
            selectedYear, 
            setSelectedYear,
            selectedMonth,
            setSelectedMonth,
            selectedDay,
            setSelectedDay,
            getMonthName,
            isToday,
            setIsToday,
            getMonthNumberFromName,
            }}>
            {children}
        </DateContext.Provider>
    )
}