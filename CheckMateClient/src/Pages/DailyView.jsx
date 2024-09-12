import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { DateContext } from "../Contexts/DateContext";
import { SettingsContext } from "../Contexts/SettingsContext";
import { TaskContext } from "../Contexts/TaskContext";
import TaskList from "../Components/TaskList";
import TaskForm from "../Components/TaskForm";


const setModalTitle = (year, month, day, locale) => {
    const date = new Date(Date.UTC(year, month, day));

    let options = {
        weekday: "long",
        month: "long",
        day: "numeric"
    }
    return new Intl.DateTimeFormat(`${locale}`, options).format(date);
};


const DailyView = (props) => {
    const { selectedDay, selectedMonth, selectedYear, currentDate, isToday, formatDate } = useContext(DateContext);
    const { fetchTasksByDate } = useContext(TaskContext);
    const { labels, locale } = useContext(SettingsContext);

    const [hideTaskForm, setHideTaskForm] = useState(true);
    const [title, setTitle] = useState("");
    const [todaysTasks, setTodaysTasks] = useState([]);
    const [todaysDate, setTodaysDate] = useState(formatDate(currentDate));


    useEffect(() => {
        if (isToday === true) {
            setTitle(() => setModalTitle(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), locale));
        } else {
            setTitle(() => setModalTitle(selectedYear, selectedMonth, selectedDay, locale));
        }
        setHideTaskForm(true);
        setTodaysDate(isToday ? formatDate(currentDate) : formatDate(new Date(selectedYear, selectedMonth, selectedDay)));

        fetchTasksByDate(todaysDate, setTodaysTasks);
    }, [selectedDay, selectedMonth, selectedYear, isToday, todaysDate, formatDate, currentDate, fetchTasksByDate, locale]);


    const closeModal = () => {
        setHideTaskForm(true);
        props.onHide();
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
                    <TaskList todaysDate={todaysDate} tasks={todaysTasks} setTasks={setTodaysTasks} />
                </Container>
                {!hideTaskForm &&
                    <Alert variant="success" onClose={() => setHideTaskForm(true)} dismissible>
                        <TaskForm setTodaysTasks={setTodaysTasks} />
                    </Alert>
                }
            </Modal.Body>
            <Modal.Footer className="w-100">
                <Button variant="success" className="me-auto" onClick={() => setHideTaskForm(false)}>{labels.newTodoButton}</Button>
            </Modal.Footer>

        </Modal>
    )
};

DailyView.propTypes = {
    props: PropTypes.any
};

export default DailyView;