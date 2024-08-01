import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { StateContext } from "../StateContext";

const TaskList = () => {
    const { tasks, setTasks } = useContext(StateContext);

    const handleTask = (id) => {
        console.log('id', id);
        const changedTasks = tasks.map(task => {
            if (task.id === id) {
                console.log(task.id);
                return { ...task, completed: !task.completed };
            };
            return task;
        });

        setTasks(changedTasks);
    };

    return (
        <ListGroup>
            {
                tasks.map((task) => (
                    <ListGroup.Item key={task.id}>
                        <Form className="d-flex align-items-center">
                            <Form.Check
                                type="checkbox"
                                id={`task-${task.id}`}
                                label={task.name}
                                checked={task.completed}
                                disabled={task.completed}
                                onChange={() => handleTask(task.id)}
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