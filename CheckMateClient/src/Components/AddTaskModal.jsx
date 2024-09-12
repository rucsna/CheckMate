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
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="add-task-modal"
            animation={true}
        >
            <Modal.Header className="add-task-header" closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1>{labels.newTodoButton}</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="add-task-body">
                <TaskForm />
            </Modal.Body>
        </Modal>
    );
};

AddTaskModal.propTypes = {props: PropTypes.any};

export default AddTaskModal;