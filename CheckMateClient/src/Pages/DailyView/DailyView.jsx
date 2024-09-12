import { useState, useEffect, useContext } from "react";
import { DateContext } from "../../Contexts/DateContext";
import { SettingsContext } from "../../Contexts/SettingsContext";
import { TaskContext } from "../../Contexts/TaskContext";
import {Modal, Button, Container, Alert} from "react-bootstrap";
import TaskList from "../../Components/TaskList";
import TaskForm from "../../Components/TaskForm";
import PropTypes from "prop-types";
import "../DailyView/DailyView.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


// create the title of the daily view
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
    const [showNewTodoButton, setShowNewTodoButton] = useState(true);
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
        setShowNewTodoButton(true);

        setTodaysDate(isToday ? formatDate(currentDate) : formatDate(new Date(selectedYear, selectedMonth, selectedDay)));

        fetchTasksByDate(todaysDate, setTodaysTasks);
    }, [selectedDay, selectedMonth, selectedYear, isToday, todaysDate, formatDate, currentDate, fetchTasksByDate, locale, setTodaysTasks]);


    const closeModal = () => {
        setHideTaskForm(true);
        props.onHide();
    };

    const handleNewTodoButtonClick = () => {
        setHideTaskForm(false);
        setShowNewTodoButton(false);
    };

    const closeAlert = () => {
        setShowNewTodoButton(true);
        setHideTaskForm(true);
    };


    return (
        <DndProvider backend={HTML5Backend}>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="daily-view-modal"
        >

            <Modal.Header closeButton onHide={closeModal}>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1 className="daily-view-title">{title}</h1>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="daily-view-body">
                <TaskList todaysDate={todaysDate} todaysTasks={todaysTasks} setTodaysTasks={setTodaysTasks} />
                {!hideTaskForm &&
                    <Alert className="daily-view-alert mt-3" onClose={closeAlert} dismissible>
                        <TaskForm setTodaysTasks={setTodaysTasks} />
                    </Alert>
                }
            </Modal.Body>

            <Modal.Footer>
                {showNewTodoButton &&
                    <Button className="new-todo-button me-auto" onClick={handleNewTodoButtonClick}><strong><i className="bi bi-plus-lg"></i></strong></Button>
                }
            </Modal.Footer>

        </Modal>
        </DndProvider>
    )
};

DailyView.propTypes = {
    props: PropTypes.any
};

export default DailyView;