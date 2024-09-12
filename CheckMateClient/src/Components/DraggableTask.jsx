import { ListGroup, Form, Button } from "react-bootstrap";
import NotificationModal from "./NotificationModal";
import { useDrag } from "react-dnd";
import { useContext, useState } from "react";
import { TaskContext } from "../Contexts/TaskContext";
const apiUrl = process.env.VITE_API_URL;

const DraggableTask = ({ id, name, isCompleted, date, handleUpdateClick, handleUpdateTask, labelClassName }) => {
    const {fetchTasks} = useContext(TaskContext);


    const [{ isDragging }, drag] = useDrag(() => ({
        type: "listGroupItem",
        item: {id: id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/todos/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                console.error("error deleting task", response.status, response.statusText);
            }
        } catch (error) {
            console.error("internal server error", error);
        }
        fetchTasks();
    };


    return (
        <ListGroup.Item ref={drag}>
            <Form className="task-list-form d-flex align-items-center justify-content-center ms-3 mt-2">
                <Form.Check
                    type="checkbox"
                    id={`task-${id}`}
                    label={<span className={labelClassName}><h5>{name}</h5></span>}
                    checked={isCompleted}
                    onChange={(e) => handleUpdateTask(e, id, !isCompleted, name, date)}
                />
                <div className="task-list-buttons ms-auto me-4">
                    {!isCompleted &&
                    <Button
                        variant="link"
                        onClick={() => handleUpdateClick(id, date, name)}>
                        <i className="bi bi-pencil-square"></i>
                    </Button>}
                    <NotificationModal handleDelete={handleDelete} taskId={id} />
                </div>
            </Form>
        </ListGroup.Item> 
    )
}

export default DraggableTask