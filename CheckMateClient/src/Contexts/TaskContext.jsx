import { createContext, useState, useEffect, useContext } from "react";
import { DateContext } from "./DateContext";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const { selectedYear, selectedMonth, getMonthNumberFromName } = useContext(DateContext);

    const [tasks, setTasks] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const fetchTasks = async () => {
        try {
            const response = await fetch(`http://localhost:5295/api/todos/${selectedYear}/${getMonthNumberFromName(selectedMonth)}`);
            if (!response.ok) {
                throw new Error("Problem with network response");
            }
            const taskData = await response.json();
            if (taskData) {
                console.log(taskData);
                setTasks(taskData);
            } else {
                setErrorMessage("Your tasks couldn't be loaded, please contact the site manager");
                setShowToast(true);
            }
        } catch (error) {
            setErrorMessage("An unexpected error occured, we are already working on the solution. Please, check back later");
            setShowToast(true);
            console.error(error);
        };
    };

    useEffect(() => {
        fetchTasks();
        setShowToast(false);
    }, [selectedMonth, selectedYear]);


    return (
        <TaskContext.Provider value={{ tasks, fetchTasks }}>
            {children}
        </TaskContext.Provider>
    );
};