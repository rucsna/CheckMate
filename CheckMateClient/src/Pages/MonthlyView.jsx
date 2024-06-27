import DayCard from "../Components/DayCard";
import Layout from "./Layout";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";

const MonthlyView = () => {
    const [daysInTheMonth, setDaysInTheMonth] = useState(30);
    const [startDay, setStartDay] = useState(6);
    const [weekNumber, setWeekNumber] = useState(26);

    const totalCells = daysInTheMonth + startDay;
    const totalRows = Math.ceil(totalCells / 7);
    let current = weekNumber;

    useEffect(() => {
        // this useEffect will set the
        //      daysInTheMonth, startDay, weekNumber states upon first rendering
    }, []);
    

    return (
        <Layout>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thirsday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th>Sunday</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.from({ length: totalRows }, (_, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>{current++}</td>
                                {
                                    Array.from({ length: 7 }, (_, colIndex) => {
                                        const dayIndex = rowIndex * 7 + colIndex;
                                        const dayNumber = dayIndex - startDay + 1;
                                        if (dayIndex < startDay || dayNumber > daysInTheMonth) return <td key={colIndex}></td>;
                                        return (
                                            <td className="col-lg-1-7 col-md-4 col-sm-6 mb-4" key={colIndex}>
                                                <DayCard title={dayNumber} />
                                            </td>
                                        );
                                    })
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Layout>
    )
}

export default MonthlyView;