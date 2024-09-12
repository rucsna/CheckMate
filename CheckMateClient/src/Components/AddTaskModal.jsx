import { useContext } from "react";
import { SettingsContext } from "../Contexts/SettingsContext";
import { Modal } from "react-bootstrap";
import TaskForm from "./TaskForm";
import PropTypes from "prop-types";


const AddTaskModal = (props) => {
    const { labels } = useContext(SettingsContext);

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1 className="text-success">{labels.newTodoButton}</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-success bg-opacity-50">
                <TaskForm />
            </Modal.Body>
        </Modal>
    )
};

AddTaskModal.propTypes = {
    props: PropTypes.any
};

export default AddTaskModal;