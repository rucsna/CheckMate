import ListGroup from "react-bootstrap/ListGroup";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

const TaskList = ({tasks, setTasks}) => {
    const handleTask = (id) => {
        console.log('id', id);
        const changedTasks = tasks.map(task => {
            if(task.id === id){
                console.log(task.id);
                return {...task, completed: !task.completed};  
            };
            return task;   
        });
        
        setTasks(changedTasks);
    };

    return(
        <ListGroup>
            {
                tasks.map((task) => (
                    <ListGroup.Item key={task.id}>
                    <Form>
                        <Form.Check 
                            type="checkbox" 
                            id={`task-${task.id}`} 
                            label={task.name}
                            checked={task.completed}
                            disabled={task.completed}
                            onChange={() => handleTask(task.id)}
                            />
                   </Form>
                   </ListGroup.Item>
                ))
            }
      </ListGroup> 
    )
};

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired
};

export default TaskList;