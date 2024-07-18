import DayCard from "../Components/DayCard";
import Layout from "./Layout";
import Table from "react-bootstrap/Table";
import { useState, useEffect, useContext } from "react";
import DailyView from "./DailyView";
import AddTaskModal from "../Components/AddTaskModal";
import { StateContext } from "../StateContext";

const MonthlyView = () => {
    const { weekStart } = useContext(StateContext);

    const [daysInTheMonth, setDaysInTheMonth] = useState(31);
    const [startDay, setStartDay] = useState(0);
    const [weekNumber, setWeekNumber] = useState(31);

    const [dailyViewShow, setDailyViewShow] = useState(false);
    const [addTaskShow, setAddTaskShow] = useState(false);

    const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thirsday", "Friday", "Saturday"];
    const headers = weekStart === "M"
        ? [...days.slice(1), days[0]]
        : days;

    const totalCells = daysInTheMonth + startDay;
    const totalRows = Math.ceil(totalCells / 7);
    let current = weekNumber;

    useEffect(() => {
        if(weekStart === "M"){
            setStartDay(0);
        } else {
            setStartDay(0 + 1);
        }
        // this useEffect will set the
        //      daysInTheMonth, startDay, weekNumber states upon first rendering
    }, [weekStart]);
    

    return (
        <Layout >
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th><i className="bi bi-calendar-check"></i></th>
                        {headers.map((day, index) => (
                            <th key={index ++} className="text-info">{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.from({ length: totalRows }, (_, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className="text-info">{current++}</td>
                                {
                                    Array.from({ length: 7 }, (_, colIndex) => {
                                        const dayIndex = rowIndex * 7 + colIndex;
                                        const dayNumber = dayIndex - startDay + 1;
                                        if (dayIndex < startDay || dayNumber > daysInTheMonth) return <td key={colIndex}></td>;
                                        return (
                                            <td className="col-lg-2 col-md-2 col-sm-2 mb-6" key={colIndex}>
                                                <DayCard title={dayNumber} setModalShow={setDailyViewShow} />
                                            </td>
                                        );
                                    })
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <DailyView show={dailyViewShow} onHide={() => setDailyViewShow(false)} daynumber={2} />
            <AddTaskModal show={addTaskShow} onHide={() => setAddTaskShow(false)} daynumber={2} showdailyview={() => setDailyViewShow(true)} />
        </Layout>
    )
}

export default MonthlyView;