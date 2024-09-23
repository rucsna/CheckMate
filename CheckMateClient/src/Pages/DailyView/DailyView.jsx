import { useState, useEffect, useContext } from "react";
import { DateContext } from "../../Contexts/DateContext";
import { SettingsContext } from "../../Contexts/SettingsContext";
import {Modal, Button, Alert} from "react-bootstrap";
import TaskList from "../../Components/TaskList";
import TaskForm from "../../Components/TaskForm";
import PropTypes from "prop-types";
import "../DailyView/DailyView.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { formatDate } from "../../library/dateUtils.js";
import { CURRENT_DATE } from "../../library/constants.js";

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
    const { selectedDay, selectedMonth, selectedYear, isToday } = useContext(DateContext);
    const { locale } = useContext(SettingsContext);

    const [hideTaskForm, setHideTaskForm] = useState(true);
    const [showNewTodoButton, setShowNewTodoButton] = useState(true);
    const [title, setTitle] = useState("");


    useEffect(() => {
        if (isToday === true) {
            setTitle(() => setModalTitle(CURRENT_DATE.getFullYear(), CURRENT_DATE.getMonth(), CURRENT_DATE.getDate(), locale));
        } else {
            setTitle(() => setModalTitle(selectedYear, selectedMonth, selectedDay, locale));
        }
    }, [selectedDay, selectedMonth, selectedYear, isToday, formatDate, locale]);

    useEffect(() => {
        setHideTaskForm(true);
        setShowNewTodoButton(true);
    }, [hideTaskForm, showNewTodoButton]);


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
                <TaskList />
                {!hideTaskForm &&
                    <Alert className="daily-view-alert mt-3" onClose={closeAlert} dismissible>
                        <TaskForm />
                    </Alert>
                }
            </Modal.Body>

            <Modal.Footer>
                {showNewTodoButton &&
                    <Button className="new-todo-button ms-auto" onClick={handleNewTodoButtonClick}><strong><i className="bi bi-plus-lg"></i></strong></Button>
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