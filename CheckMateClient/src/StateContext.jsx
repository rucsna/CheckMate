import { createContext, useState } from "react";

export const StateContext = createContext();

export const ContextProvider = ({children}) => {
    const [weekStart, setWeekStart] = useState("M");
    const [mode, setMode] = useState();
    const [tasks, setTasks] = useState([]);

    return(
        <StateContext.Provider value={{weekStart, setWeekStart, mode, setMode, tasks, setTasks}}>
            {children}
        </StateContext.Provider>
    )
}