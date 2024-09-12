import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useContext, useState } from "react";
import { TaskContext } from "../Contexts/TaskContext";
import { DateContext } from "../Contexts/DateContext";
import NotificationModal from "./NotificationModal";

const TaskList = ({ tasks, setTasks, todaysDate }) => {
    const { formatDate } = useContext(DateContext);
    const { fetchTasks, fetchTasksByDate } = useContext(TaskContext);

    const [taskId, setTaskId] = useState(0);
    const [name, setName] = useState("");
    const [date, setDate] = useState(null);


    const handleTask = async (event, id, isCompleted, name, date) => {
        event.preventDefault();

        const updatedTask = tasks.find(t => t.id === id);
        if (updatedTask) {
            updatedTask.isCompleted = isCompleted;
            updatedTask.name = name;
            updatedTask.date = date;
        }
        //console.log(updatedTask);

        try {
            const response = await fetch(`http://localhost:5295/api/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask)
            });
            if (response.ok) {
                //console.log("task successfully updated");

                const updatedResponse = await fetch(`http://localhost:5295/api/todos/${id}`);
                if (updatedResponse.ok) {
                    const taskData = await updatedResponse.json();
                    setTasks(prevTasks => prevTasks.map(task => task.id === id ? taskData : task));
                } else {
                    console.error("error fetching updated task");
                }
            } else {
                console.error("error updating task", response.status, response.statusText);
            }
        } catch (error) {
            console.error("internal server error", error);
        }
        
        setTaskId(-1);
        //fetchTasksByDate(todaysDate, setTasks);
        fetchTasks();
    };


    const handleUpdate = (id, date, name) => {
        const taskDate = new Date(date);

        setName(name);
        setDate(formatDate(taskDate));
        setTaskId(id);
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5295/api/todos/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                fetchTasksByDate(todaysDate, setTasks);
            } else {
                console.error("error deleting task", response.status, response.statusText);
            }
        } catch (error) {
            console.error("internal server error", error);
        }
        fetchTasks();
    };

    return (
        <ListGroup>
            {tasks && tasks.map((task) => (
                taskId !== task.id ? (
                    <ListGroup.Item key={task.id}>
                        <Form className="d-flex align-items-center justify-content-center">
                            <Form.Check
                                type="checkbox"
                                id={`task-${task.id}`}
                                label={task.name}
                                checked={task.isCompleted}
                                onChange={(e) => handleTask(e, task.id, !task.isCompleted, task.name, task.date)}
                            />
                            <Button variant="link" className="ms-auto" onClick={() => handleUpdate(task.id, task.date, task.name)}><i className="bi bi-pencil-square"></i></Button>
                            <NotificationModal handleDelete={handleDelete} taskId={task.id}/>
                        </Form>
                    </ListGroup.Item>
                ) : (
                    <ListGroup.Item key={task.id} className="task-update-form-control">
                        <Form onSubmit={(e) => handleTask(e, task.id, task.isCompleted, name, date)} className="d-flex align-items-center justify-content-center">
                            <InputGroup className="mb-3">
                                <Form.Control className="text-warning-emphasis task-update-form-control"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                                <Form.Control className="text-warning-emphasis task-update-form-control"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)} />
                                <Button variant="outline-light" className="text-warning-emphasis" type="submit"><i className="bi bi-floppy"></i></Button>
                                <Button variant="outline-light" className="text-warning-emphasis" onClick={() => setTaskId(-1)} aria-label="close"><i className="bi bi-x-lg"></i></Button>
                            </InputGroup>
                        </Form>
                    </ListGroup.Item>
                )
            ))}
        </ListGroup>
    )
};

export default TaskList;