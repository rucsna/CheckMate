import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { DateContext } from "./DateContext";


export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const { selectedYear, selectedMonth } = useContext(DateContext);

    const [tasks, setTasks] = useState([]);
    const [dailyViewShow, setDailyViewShow] = useState(false);


    const loadTasksForMonth = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5295/api/todos/${selectedYear}/${selectedMonth + 1}`);
            if (!response.ok) {
                throw new Error("Problem with network response");
            }
            const taskData = await response.json();
            if (taskData) {
                setTasks(taskData);
            } else {
                //setErrorMessage("Your tasks couldn't be loaded, please contact the site manager");
                //setShowToast(true);
            }
        } catch (error) {
            console.error("Failed to load tasks: ", error);
        }
    }, [selectedYear, selectedMonth]);

    
    useEffect(() => {
        loadTasksForMonth();
    }, [loadTasksForMonth]);


    return (
        <TaskContext.Provider value={{ tasks, setTasks, dailyViewShow, setDailyViewShow }}>
            {children}
        </TaskContext.Provider>
    );
};