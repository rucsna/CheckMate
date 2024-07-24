import { createContext, useState } from "react";

export const StateContext = createContext();

export const ContextProvider = ({children}) => {
    const getMonthName = (month) => new Date(1970, month, 1).toLocaleString('en-US', { month: 'long' });


    const currentDate = new Date();
    const [weekStart, setWeekStart] = useState("M");
    const [mode, setMode] = useState();
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(getMonthName(currentDate.getMonth()));
    const [selectedDay, setSelectedDay] = useState(currentDate.getDate());
    const [isToday, setIsToday] = useState(false);    

    const [tasks, setTasks] = useState([
        { id: 0, name: "feed the cat", completed: false, date: "2024.07.03" },
        { id: 1, name: "drink more water", completed: false, date: "2024.07.05"},
        { id: 2, name: "lunch", completed: true, date: "2024.07.03" },
        { id: 3, name: "call the plumber", completed: false, date: "2024.07.25" }]);

    return(
        <StateContext.Provider value={{
            weekStart, 
            setWeekStart, 
            mode, 
            setMode, 
            tasks, 
            setTasks, 
            currentDate,
            selectedYear, 
            setSelectedYear,
            selectedMonth,
            setSelectedMonth,
            selectedDay,
            setSelectedDay,
            getMonthName,
            isToday,
            setIsToday
            }}>
            {children}
        </StateContext.Provider>
    )
}