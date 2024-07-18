import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import TaskForm from "./TaskForm";

const AddTaskModal = (props) => {

    const handleDailyViewModal = () => {
        props.showdailyview();
        props.onHide();
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1 className="text-info">What should I do today?</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TaskForm />
            </Modal.Body>
            <Modal.Footer>
                <Row className="w-100">
                    <Col className="text-end">
                        <Button onClick={handleDailyViewModal}>Back to day {props.daynumber}</Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}

export default AddTaskModal;