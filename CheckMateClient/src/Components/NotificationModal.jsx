import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContext, useState } from "react";
import { SettingsContext } from "../Contexts/SettingsContext";

const NotificationModal = ({handleDelete, taskId}) => {
    const {labels} = useContext(SettingsContext);
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link" className="me-1" onClick={() => handleShow()}><i className="bi bi-trash3-fill"></i></Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="sm"
        centered
      >
        
        <Modal.Body className="bg-danger bg-opacity-75 text-center">
          {labels.notification}
          <div className="d-flex justify-content-center mt-3">
          <Button variant="secondary" onClick={handleClose} className="me-2 shadow-lg">
            <i className="bi bi-x-lg"></i>
          </Button>
          <Button variant="success" onClick={() => handleDelete(taskId)} className="text-primary shadow-lg"><i className="bi bi-check-lg"></i></Button>
          </div>
          </Modal.Body>
      </Modal>
    </>
  );
}

export default NotificationModal;