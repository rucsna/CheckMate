import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

const TaskList = ({tasks}) => {
    // const [tasksByDate, setTasksByDate] = useState([
    //     { id: 0, name: "feed the cat", completed: false, date: "2024.07.27" },
    //     { id: 2, name: "lunch", completed: true, date: "2024.07.27" },
    // ]);
    
    console.log(tasks);
    const handleTask = (id) => {
        // update task by id!
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
                                disabled={task.isCompleted}
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