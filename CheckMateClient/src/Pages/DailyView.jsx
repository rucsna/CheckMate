import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect, useContext } from "react";
import TaskList from "../Components/TaskList";
import TaskForm from "../Components/TaskForm";
import { DateContext } from "../Contexts/DateContext";
import { SettingsContext } from "../Contexts/SettingsContext";
import { TaskContext } from "../Contexts/TaskContext";


const DailyView = (props) => {
    const { selectedDay, selectedMonth, selectedYear, currentDate, getMonthName, isToday} = useContext(DateContext);
    const {fetchTasksByDate} = useContext(TaskContext);
    const {labels, locale} = useContext(SettingsContext);

    const [hideForm, setHideForm] = useState(true);
    const [title, setTitle] = useState("");
    const [todaysTasks, setTodaysTasks] = useState([]);
    const [todaysDate, setTodaysDate] = useState(currentDate.toISOString().slice(0, 10));

    
    useEffect(() => {
        if(isToday === true){
            setTitle(() => setModalTitle(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));    
        } else {
            setTitle(() => setModalTitle(selectedYear, selectedMonth, selectedDay));
        }
        setHideForm(true);
    }, [selectedDay, selectedMonth, isToday]);

    useEffect(() => {
        setTodaysDate(isToday ? currentDate.toISOString().slice(0, 10) : `${selectedYear}-${selectedMonth < 10 ? "0" + (Number(selectedMonth)+1) : Number(selectedMonth)+1}-${selectedDay}`);
        
        fetchTasksByDate(todaysDate, setTodaysTasks);
    }, [selectedDay, selectedMonth, selectedYear, isToday, todaysDate]);
    //console.log('DATE', todaysDate);

    const closeModal = () => {
        setHideForm(true);
        props.onHide();
    };

    const setModalTitle = (year, month, day) => {
        const date = new Date(Date.UTC(year, month, day));

        let options = {
            weekday: "long",
            month: "long",
            day: "numeric"
        }
        return new Intl.DateTimeFormat(`${locale}`, options).format(date);
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header closeButton onHide={closeModal}>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1 className="text-success">{title}</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-warning">
                <h4>{labels.todaysTasks}</h4>
                <Container>
                    <TaskList todaysDate={todaysDate} tasks={todaysTasks} setTasks={setTodaysTasks}/>
                </Container>
                {!hideForm &&
                    <Alert variant="success" onClose={() => setHideForm(true)} dismissible>
                        <TaskForm setTodaysTasks={setTodaysTasks}/>
                    </Alert>
                }
            </Modal.Body>
            <Modal.Footer className="w-100">
                <Button variant="success" className="me-auto" onClick={() => setHideForm(false)}>{labels.newTodoButton}</Button>
            </Modal.Footer>

        </Modal>
    )
}

export default DailyView;