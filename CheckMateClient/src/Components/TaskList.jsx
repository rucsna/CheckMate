import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

const TaskList = () => {
    const [tasksByDate, setTasksByDate] = useState([
        { id: 0, name: "feed the cat", completed: false, date: "2024.07.27" },
        { id: 2, name: "lunch", completed: true, date: "2024.07.27" },
    ]);

    useEffect(() => {
      // get tasks by date!
    }, [])
    

    const handleTask = (id) => {
        // update task by id!
    };

    return (
        <ListGroup>
            {
                tasksByDate.map((task) => (
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