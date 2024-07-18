import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import TaskList from "../Components/TaskList";
import TaskForm from "../Components/TaskForm";

const DailyView = (props) => {
    const [hideForm, setHideForm] = useState(true);
    const [tasks, setTasks] = useState([
        { id: 0, name: "feed the cat", completed: false },
        { id: 1, name: "drink more water", completed: false },
        { id: 2, name: "lunch", completed: true },
        { id: 3, name: "call the plumber", completed: false }]);

    useEffect(() => {
        setHideForm(true);
        // here the tasks will be fetched from the backend and sorted according to their completed status
    }, []);

    const closeModal = () => {
        setHideForm(true);
        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1 className="text-info">{props.daynumber}</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-warning">
                <h4>Tasks for today</h4>
                <Container>
                    <TaskList tasks={tasks} />
                </Container>
                {!hideForm &&
                    <Alert variant="info" onClose={() => setHideForm(true)} dismissible>
                        <TaskForm />
                    </Alert>
                }
            </Modal.Body>
            <Modal.Footer>
                <Row className="w-100">
                    <Col className="text-left">
                        <Button variant="info" onClick={() => setHideForm(false)}>Add a new task!</Button>
                    </Col>
                    <Col className="text-end">
                        <Button onClick={closeModal}>Close</Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}

export default DailyView;