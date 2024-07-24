import { useContext } from "react";
import { StateContext } from "../StateContext";
import Table from "react-bootstrap/esm/Table";
import DayCard from "./DayCard";


const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thirsday", "Friday", "Saturday"];


const MonthTable = ({daysInTheMonth, startDay, weekNumber, setDailyViewShow}) => {
    const {weekStart} = useContext(StateContext);

    const headers = weekStart === "M" ? [...days.slice(1), days[0]] : days;

    const totalCells = daysInTheMonth + startDay;
    const totalRows = Math.ceil(totalCells / 7);
    let current = weekNumber;

    return (
            <Table striped bordered hover variant="warning" >
                <thead>
                    <tr>
                        <th><i className="bi bi-calendar-check"></i></th>
                        {headers.map((day, index) => (
                            <th key={index++} className="text-info shadow">{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.from({ length: totalRows }, (_, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className="text-info shadow">{current++}</td>
                                {
                                    Array.from({ length: 7 }, (_, colIndex) => {
                                        const dayIndex = rowIndex * 7 + colIndex;
                                        const dayNumber = dayIndex - startDay + 1;
                                        if (dayIndex < startDay || dayNumber > daysInTheMonth) return <td key={colIndex}></td>;
                                        return (
                                            <td className="col-lg-2 col-md-2 col-sm-2 mb-6" key={colIndex}>
                                                <DayCard className="day-card" title={dayNumber} setModalShow={setDailyViewShow} />
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