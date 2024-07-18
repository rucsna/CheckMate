import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";

const TaskForm = () => {
    const [task, setTask] = useState("");
    const [date, setDate] = useState();

    const saveTask = (event) => {
        event.prevent.default();

    }

    return (
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formTaskName">
                <Form.Label column sm="2">
                    Task
                </Form.Label>
                <Col sm="10">
                    <Form.Control 
                    type="text" 
                    placeholder="Type your todo here..."
                    onChange={e => setTask(e.target.value)}
                    value={task}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formTaskDate">
                <Form.Label column sm="2">
                    Date
                </Form.Label>
                <Col sm="10">
                    <Form.Control 
                    type="date" 
                    defaultValue="2024-07-09"
                    onChange={e => setDate(e.target.value)}
                    value={date}
                    />
                </Col>
            </Form.Group>
            <Button variant="light" type="submit"><strong className="text-danger" onSubmit={saveTask}>Save</strong></Button>
        </Form>
    )
};

export default TaskForm;