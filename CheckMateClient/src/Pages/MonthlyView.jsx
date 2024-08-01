import Layout from "./Layout";
import { useState, useEffect, useContext } from "react";
import DailyView from "./DailyView";
import AddTaskModal from "../Components/AddTaskModal";
import { DateContext } from "../Contexts/DateContext";
import MonthTable from "../Components/MonthTable";
import { SettingsContext } from "../Contexts/SettingsContext";


// Initializing functions for dates
const monthLengthCounter = (month, year) => new Date(year, month, 0).getDate();

const getStartDay = (month, year, day) => new Date(year, month, day).getDay();

const getWeekNumber = (month, year) => {
    var currDate = new Date(year, month, 1);
    var oneJan = new Date(year, 0, 1);
    var numberOfDays = Math.floor((currDate - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((currDate.getDay() + 1 + numberOfDays) / 7);
}


const MonthlyView = () => {
    const { currentDate, setSelectedMonth, selectedMonth, selectedYear, getMonthName } = useContext(DateContext);
    const { weekStart } = useContext(SettingsContext);

    const [daysInTheMonth, setDaysInTheMonth] = useState(monthLengthCounter(currentDate.getMonth() + 1, currentDate.getFullYear()));
    const [startDay, setStartDay] = useState(0);
    const [startDayIfMonday, setStartDayIfMonday] = useState(getStartDay(currentDate.getMonth(), currentDate.getFullYear(), 1) - 1);
    const [startDayIfSunday, setStartDayIfSunday] = useState(getStartDay(currentDate.getMonth(), currentDate.getFullYear(), 1));
    const [weekNumber, setWeekNumber] = useState(getWeekNumber(currentDate.getMonth(), currentDate.getFullYear()));

    const [dailyViewShow, setDailyViewShow] = useState(false);
    const [addTaskShow, setAddTaskShow] = useState(false);


    useEffect(() => {
        if (weekStart === "M") {
            setStartDay(startDayIfMonday);
        } else {
            setStartDay(startDayIfSunday);
        }
    }, [weekStart, startDay, startDayIfMonday, startDayIfSunday]);


    const handleMonthChange = (monthIndex, year = selectedYear) => {
        const lengthOfMonth = monthLengthCounter(Number(monthIndex) + 1, selectedYear);
        const day1 = getStartDay(Number(monthIndex), year, 1) - 1;
        const day2 = getStartDay(Number(monthIndex), year, 1);

        day1 < 0 ? setStartDayIfMonday(6) : setStartDayIfMonday(day1);
        setStartDayIfSunday(day2);
        weekStart === "M" ? setStartDay(startDayIfMonday) : setStartDay(startDayIfSunday);
       
        setSelectedMonth(getMonthName(monthIndex));
        setWeekNumber(getWeekNumber(monthIndex, year));
        setDaysInTheMonth(lengthOfMonth);
    };


    return (
        <div className="table-container">
            <Layout handleMonthChange={handleMonthChange} selectedMonth={selectedMonth}>
                {{
                    component: (
                        <div className="table-wrapper">
                            <MonthTable
                                daysInTheMonth={daysInTheMonth}
                                startDay={startDay}
                                weekNumber={weekNumber}
                                setDailyViewShow={setDailyViewShow}
                            />

                            <DailyView show={dailyViewShow} onHide={() => setDailyViewShow(false)} />
                            <AddTaskModal show={addTaskShow} onHide={() => setAddTaskShow(false)} />

                        </div>
                    ),

                    setDailyViewShow: setDailyViewShow,
                    setAddTaskShow: setAddTaskShow,
                    setStartDay: setStartDay,
                }}
            </Layout>
        </div>
    )
}

export default MonthlyView;