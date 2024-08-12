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
            <Table striped bordered hover variant="warning" >
                <thead>
                    <tr>
                        <th><i className="bi bi-calendar-check"></i></th>
                        {headers.map((day, index) => (
                            <th key={index++} className="text-success shadow-lg">{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.from({ length: totalRows }, (_, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className="text-success shadow-lg">{current++}</td>
                                {
                                    Array.from({ length: 7 }, (_, colIndex) => {
                                        const dayIndex = rowIndex * 7 + colIndex;
                                        const currentDay = dayIndex - startDay + 1;
                                        if (dayIndex < startDay || currentDay > daysInTheMonth) return <td key={colIndex}></td>;
                                        return (
                                            <td className="col-lg-2 col-md-2 col-sm-2 mb-6" key={colIndex}>
                                                <DayCard className="day-card" currentDay={currentDay} setModalShow={setDailyViewShow} />
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