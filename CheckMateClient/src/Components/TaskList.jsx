import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { TaskContext } from "../Contexts/TaskContext";

const TaskList = ({ tasks, setTasks }) => {
    const {fetchTasks} = useContext(TaskContext);

    const handleTask = async (id, isCompleted) => {
        const updatedTask = tasks.find(t => t.id === id);
        if (updatedTask) {
            updatedTask.isCompleted = !isCompleted;
        }
        console.log(updatedTask);

        try {
            const response = await fetch(`http://localhost:5295/api/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask)
            });
            if (response.ok) {
                console.log("task successfully updated");

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
        fetchTasks();
    };

    return (
        <ListGroup>
            {
                tasks && tasks.map((task) => (
                    <ListGroup.Item key={task.id}>
                        <Form className="d-flex align-items-center">
                            <Form.Check
                                type="checkbox"
                                id={`task-${task.id}`}
                                label={task.name}
                                checked={task.isCompleted}
                                onChange={() => handleTask(task.id, task.isCompleted)}
                            />
                            <i className="bi bi-pencil-square ms-auto me-2"></i>
                            <i className="bi bi-trash3-fill me-2"></i>
                        </Form>
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    )
};

export default TaskList;