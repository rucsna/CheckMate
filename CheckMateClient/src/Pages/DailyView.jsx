import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect, useContext } from "react";
import TaskList from "../Components/TaskList";
import TaskForm from "../Components/TaskForm";
import { DateContext } from "../Contexts/DateContext";

const DailyView = (props) => {
    const { selectedDay, selectedMonth, currentDate, getMonthName, isToday } = useContext(DateContext);
    const [hideForm, setHideForm] = useState(true);
    const [title, setTitle] = useState("");

    
    useEffect(() => {
        if(isToday === true){
            setTitle(() => setModalTitle(getMonthName(currentDate.getMonth()), currentDate.getDate()));    
        } else {
            setTitle(() => setModalTitle(selectedMonth, selectedDay));
        }
        setHideForm(true);
    }, [selectedDay, selectedMonth, isToday]);

    const closeModal = () => {
        setHideForm(true);
        props.onHide();
    };

    const setModalTitle = (month, day) => {
        let dayEnding = day == 1 || day == 21 || day == 31 ? 'st' :
                        day == 2 || day == 22 ? 'nd' : 
                        day == 3 || day == 23 ? 'rd' :
                        'th';
        return `${day}${dayEnding} ${month}`;
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1 className="text-info">{title}</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-warning">
                <h4>Tasks for today</h4>
                <Container>
                    <TaskList />
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