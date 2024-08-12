import Modal from "react-bootstrap/Modal";
import TaskForm from "./TaskForm";
import { useContext } from "react";
import { SettingsContext } from "../Contexts/SettingsContext";

const AddTaskModal = (props) => {
    const {labels} = useContext(SettingsContext);

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1 className="text-info">{labels.newTodoButton}</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-info">
                <TaskForm />
            </Modal.Body>
        </Modal>
    )
}

export default AddTaskModal;