import { useContext } from "react";
import { SettingsContext } from "../Contexts/SettingsContext";
import Table from "react-bootstrap/esm/Table";
import DayCard from "./DayCard";


const MonthTable = ({daysInTheMonth, startDay, weekNumber, setDailyViewShow}) => {
    const {weekStart, weekDays} = useContext(SettingsContext);

    const headers = weekStart === "M" ? [...weekDays.slice(1), weekDays[0]] : weekDays;

    const totalCells = daysInTheMonth + startDay;
    const totalRows = Math.ceil(totalCells / 7);
    let current = weekNumber;

    return (
            <Table striped hover variant="warning">
                <thead>
                    <tr>
                        <th className="text-center align-middle"><i className="bi bi-calendar-check"></i></th>
                        {headers.map((day, index) => (
                            <th key={index++} className="text-center align-middle text-success shadow-lg">{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.from({ length: totalRows }, (_, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className="text-center align-middle text-success shadow-lg">{current++}</td>
                                {
                                    Array.from({ length: 7 }, (_, colIndex) => {
                                        const dayIndex = rowIndex * 7 + colIndex;
                                        const currentDay = dayIndex - startDay + 1;
                                        if (dayIndex < startDay || currentDay > daysInTheMonth) return <td key={colIndex}></td>;
                                        return (
                                            <td className="shadow-lg" key={colIndex}>
                                                <div className="card-wrapper">
                                                <DayCard className="day-card" currentDay={currentDay} setModalShow={setDailyViewShow} />
                                                </div>
                                            </td>
                                        );
                                    })
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
   
    )
}

export default MonthTable;