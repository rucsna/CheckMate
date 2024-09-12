import { useState, useContext } from "react";
import { DateContext } from "../Contexts/DateContext";
import { SettingsContext } from "../Contexts/SettingsContext";
import { TaskContext } from "../Contexts/TaskContext";
import { Form, Row, Col, Button } from "react-bootstrap";


const TaskForm = ({ setTodaysTasks }) => {
    const { currentDate, formatDate, isToday, selectedYear, selectedMonth, selectedDay } = useContext(DateContext);
    const { labels } = useContext(SettingsContext);
    const { fetchTasks, fetchTasksByDate } = useContext(TaskContext);

    const [task, setTask] = useState("");
    const [date, setDate] = useState(isToday ? formatDate(currentDate) : `${selectedYear}-${selectedMonth < 10 ? "0" + (Number(selectedMonth) + 1) : Number(selectedMonth) + 1}-${selectedDay}`);


    const saveTask = async (event) => {
        event.preventDefault();

        const newTask = {
            name: task,
            isCompleted: false,
            date: date
        };

        try {
            const response = await fetch('http://localhost:5295/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask)
            });
            if (response.ok) {
                console.log("task successfully saved");
            }
            if (!response.ok) {
                console.error('error saving task');
            }
            setTask("");
            setDate(formatDate(currentDate));
        } catch (error) {
            console.error('Internal server error', error);
        }
        fetchTasksByDate(date, setTodaysTasks);
        fetchTasks();
    };

    return (
        <Form onSubmit={saveTask}>
            <Form.Group as={Row} className="mb-3" controlId="formTaskName">
                <Form.Label column sm="2">
                    {labels.task}
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="text"
                        placeholder={labels.placeholder}
                        value={task}
                        onChange={e => setTask(e.target.value)}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formTaskDate">
                <Form.Label column sm="2">
                    {labels.date}
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </Col>
            </Form.Group>
            <Button variant="outline-danger" type="submit" className="shadow-lg"><strong>{labels.save}</strong></Button>
        </Form>
    )
};

export default TaskForm;