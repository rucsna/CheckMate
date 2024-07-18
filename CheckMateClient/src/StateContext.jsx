import { createContext, useState } from "react";

export const StateContext = createContext();

export const ContextProvider = ({children}) => {
    const [weekStart, setWeekStart] = useState("M");
    const [mode, setMode] = useState();
    const currentDate = new Date();

    const [tasks, setTasks] = useState([
        { id: 0, name: "feed the cat", completed: false, date: "2024.07.03" },
        { id: 1, name: "drink more water", completed: false, date: "2024.07.05"},
        { id: 2, name: "lunch", completed: true, date: "2024.07.03" },
        { id: 3, name: "call the plumber", completed: false, date: "2024.07.25" }]);

    return(
        <StateContext.Provider value={{weekStart, setWeekStart, mode, setMode, tasks, setTasks, currentDate}}>
            {children}
        </StateContext.Provider>
    )
}