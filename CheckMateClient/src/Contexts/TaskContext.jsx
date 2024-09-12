import { createContext, useState, useEffect, useContext } from "react";
import { DateContext } from "./DateContext";
const apiUrl = import.meta.env.VITE_API_URL;

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const { selectedYear, selectedMonth } = useContext(DateContext);

    const [tasks, setTasks] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [dailyViewShow, setDailyViewShow] = useState(false);

    const fetchTasks = async () => {
        try {
            const response = await fetch(`${apiUrl}/todos/${selectedYear}/${selectedMonth + 1}`);
            if (!response.ok) {
                throw new Error("Problem with network response");
            }
            const taskData = await response.json();
            if (taskData) {
                console.log(taskData);
                setTasks(taskData);
            } else {
                //setErrorMessage("Your tasks couldn't be loaded, please contact the site manager");
                //setShowToast(true);
            }
        } catch (error) {
            // setErrorMessage("An unexpected error occured, we are already working on the solution. Please, check back later");
            // setShowToast(true);
            console.error(error);
        }
    };

    const fetchTasksByDate = async (date, setter) => {
        try {
            const response = await fetch(`${apiUrl}/todos/${date}`);
            if (!response.ok) {
                throw new Error("Problem with network response");
            }
            const taskData = await response.json();
            console.log(taskData);
            setter(taskData);
            // } else{
            //     // setErrorMessage("Your tasks couldn't be loaded, please contact the site manager");
            //     // setShowToast(true);
            //}
        } catch (error) {
            // setErrorMessage("An unexpected error occured, we are already working on the solution. Please, check back later");
            // setShowToast(true);
            // console.error(error);
        }
    };

    useEffect(() => {
        fetchTasks(setTasks, selectedYear, selectedMonth);
        setShowToast(false);
    }, [selectedMonth, selectedYear]);


    return (
        <TaskContext.Provider value={{ tasks, fetchTasks, fetchTasksByDate, dailyViewShow, setDailyViewShow }}>
            {children}
        </TaskContext.Provider>
    );
};