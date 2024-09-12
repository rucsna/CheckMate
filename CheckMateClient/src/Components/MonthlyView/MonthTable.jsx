import { useContext, useEffect } from "react";
import { SettingsContext } from "../../Contexts/SettingsContext";
import { DateContext } from "../../Contexts/DateContext";
import { TaskContext } from "../../Contexts/TaskContext";
import {Card} from "react-bootstrap";
import DayCard from "./DayCard";



const MonthTable = () => {
    const { daysInTheMonth, startDay, setStartDay, weekNumber, selectedYear, selectedMonth, monthLengthCounter } = useContext(DateContext);
    const { weekStart, weekDays } = useContext(SettingsContext);
    const { setDailyViewShow } = useContext(TaskContext);

    useEffect(() => {
        if (startDay < 0) setStartDay(6);
    }, [setStartDay, startDay]);

    const headers = weekStart === "M" ? [...weekDays.slice(1), weekDays[0]] : weekDays;

    // calculate the cells for the month and set the number of the week for the first column of each row
    const totalCells = daysInTheMonth + startDay;
    const totalColumns = 8;
    const totalRows = Math.ceil(totalCells / 7);
    let current = weekNumber;

    // calculate the number of empty cells at the beginning and end of the calendar
    const previousMonthDays = monthLengthCounter(selectedYear, selectedMonth - 1);
    const emptyStartCells = startDay;


    return (
        <div className="calendar-grid-container">
            <h5 key="week-header" className="week-header-card"></h5>
            {headers.map((day, index) => (
                index < 5 ? (
                <h5 key={`header-${index}`} className="header-card">{day}</h5>
                ) : (
                <h5 key={`header-${index}`} className="weekend-header-card">{day}</h5>
                )
            ))}

            {Array.from({ length: totalRows * totalColumns }, (_, cellIndex) => {
                const columnIndex = cellIndex % totalColumns;
                const isWeekColumn = columnIndex === 0;

                const rowIndex = Math.floor(cellIndex / totalColumns);
                const dayIndex = rowIndex * 7 + (columnIndex - 1);
                const currentDay = dayIndex - startDay + 1;

                const isSaturday = columnIndex === 6;
                const isSunday = columnIndex === 7;

                if(isWeekColumn) {
                    const weekNumber = current + rowIndex;
                    return(
                        <div key={`week-${cellIndex}`} className="calendar-cell">
                            <Card className="week-card">{weekNumber}</Card>
                        </div>
                    )
                }

                if (cellIndex <= emptyStartCells) {
                    const prevMonthDay = previousMonthDays - (emptyStartCells - cellIndex);
                    return (
                        <div key={`prev-${cellIndex}`} className="calendar-cell">
                            <DayCard className="disabled-card" currentDay={prevMonthDay} />
                        </div>);

                }
                
                if (currentDay > daysInTheMonth) {
                    const nextMonthDay = currentDay - daysInTheMonth;
                    return (
                        <div key={`next-${cellIndex}`} className="calendar-cell">
                            <DayCard className="disabled-card" currentDay={nextMonthDay} />
                        </div>
                    );
                }

            return (
                <div key={`current-${cellIndex}`} className="calendar-cell">
                    <DayCard className="" currentDay={currentDay} setModalShow={setDailyViewShow} isSaturday={isSaturday} isSunday={isSunday}/>
                </div>
                );
            })}
        </div >
    );
}

export default MonthTable;