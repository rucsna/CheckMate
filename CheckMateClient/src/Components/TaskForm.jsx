import { useState, useContext } from "react";
import { DateContext } from "../Contexts/DateContext";
import { SettingsContext } from "../Contexts/SettingsContext";
import { TaskContext } from "../Contexts/TaskContext";
import { Form, Row, Col, Button } from "react-bootstrap";
import { formatDate } from "../library/dateUtils";


const TaskForm = () => {
    const { currentDate, isToday, selectedYear, selectedMonth, selectedDay } = useContext(DateContext);
    const {labels} = useContext(SettingsContext);
    const { fetchTasks } = useContext(TaskContext);

    const [task, setTask] = useState("");
    const [date, setDate] = useState(isToday ? formatDate(currentDate) : formatDate(new Date(selectedYear, selectedMonth, selectedDay)));
    

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
        fetchTasks();
    };

    return (
        <Form onSubmit={saveTask} className="add-task-form">
            <Form.Group as={Row} className="mb-3" controlId="formTaskName">
                <Form.Label column sm="1">
                    {labels.task}
                </Form.Label>
                <Col sm="11">
                    <Form.Control
                        type="text"
                        placeholder={labels.placeholder}
                        value={task}
                        onChange={e => setTask(e.target.value)}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formTaskDate">
                <Form.Label column sm="1">
                    {labels.date}
                </Form.Label>
                <Col sm="11">
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Col sm={{span:11,offset:1}} className="text-end">
                <Button className="add-task-button" type="submit">{labels.save}</Button>
                </Col>
            </Form.Group>
        </Form>
    )
};

export default TaskForm;