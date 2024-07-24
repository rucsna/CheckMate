import Modal from "react-bootstrap/Modal";
import TaskForm from "./TaskForm";

const AddTaskModal = (props) => {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1 className="text-info">What should I do today?</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-info">
                <TaskForm />
            </Modal.Body>
        </Modal>
    )
}

export default AddTaskModal;