import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState([
        { id: 0, name: "feed the cat", completed: false, date: "2024.07.03" },
        { id: 1, name: "drink more water", completed: true, date: "2024.07.05"},
        { id: 2, name: "lunch", completed: true, date: "2024.07.03" },
        { id: 3, name: "call the plumber", completed: false, date: "2024.07.25" },
        { id: 4, name: "feed the dog, too", completed: true, date: "2024.07.27" },
        { id: 5, name: "go for a run", completed: false, date: "2024.07.27" },
        { id: 6, name: "practice English", completed: false, date: "2024.07.03" },
        { id: 7, name: "call Granny", completed: true, date: "2024.07.11"},
        { id: 8, name: "shopping", completed: true, date: "2024.07.03" },
        { id: 9, name: "pay the bills", completed: false, date: "2024.07.29" },
    ]);

    return(
        <TaskContext.Provider value={{tasks}}>
            {children}
        </TaskContext.Provider>
    );
};