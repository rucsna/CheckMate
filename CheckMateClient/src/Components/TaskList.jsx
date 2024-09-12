import { useContext, useState, useEffect } from "react";
import { TaskContext } from "../Contexts/TaskContext";
import { DateContext } from "../Contexts/DateContext";
import { ListGroup, Form, Button, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";


import DraggableTask from "./DraggableTask";
import { useDrop } from "react-dnd";
const apiUrl = import.meta.env.VITE_API_URL;

const TaskList = ({ todaysTasks, setTodaysTasks, todaysDate }) => {
    console.log('tasks', todaysTasks);
    const { formatDate } = useContext(DateContext);
    const { fetchTasks, fetchTasksByDate } = useContext(TaskContext);

    const [taskId, setTaskId] = useState(0);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedDate, setUpdatedDate] = useState(null);
    
    
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "listGroupItem",
        drop: (item) => addTaskToCompleted(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addTaskToCompleted = async (id) => {
        
    };

    const handleUpdateClick = (id, updatedDate, updatedName) => {
        const taskDate = new Date(updatedDate);

        setUpdatedName(updatedName);
        setUpdatedDate(formatDate(taskDate));
        setTaskId(id);
    }

    const handleUpdateTask = async (event, id, isCompleted, name, date) => {
        event.preventDefault();

        const updatedTask = todaysTasks.find(t => t.id === id);
        if (updatedTask) {
            updatedTask.isCompleted = isCompleted;
            updatedTask.name = name;
            updatedTask.date = date;
        }

        try {
            const response = await fetch(`${apiUrl}/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask)
            });

            if (response.ok) {
                const updatedResponse = await fetch(`${apiUrl}/todos/${id}`);
                if (updatedResponse.ok) {
                    const taskData = await updatedResponse.json();
                    setTodaysTasks(prevTasks => prevTasks.map(task => task.id === id ? taskData : task));
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


    return (

        <div className="task-lists-container">

            <div className="task-list">
                <h3>Incomplete tasks</h3>
                <ListGroup key="incomplete-tasks" className="task-list-group mb-4">
                    {todaysTasks.filter(task => !task.isCompleted).map(task => (
                        taskId !== task.id ? (
                            <DraggableTask
                                key={task.id}
                                id={task.id}
                                name={task.name}
                                isCompleted={task.isCompleted}
                                labelClassName={"task-incomplete"}
                                date={task.date}
                                handleUpdateClick={handleUpdateClick}
                                handleUpdateTask={handleUpdateTask}
                                todaysDate={todaysDate}
                            />
                        ) : (
                            <ListGroup.Item key={task.id}>
                                <Form onSubmit={(e) => handleUpdateTask(e, task.id, task.isCompleted, updatedName, updatedDate)} className="task-update-form-control d-flex align-items-center justify-content-center ms-3 mt-2 me-3">
                                    <InputGroup className="mb-3">
                                        <Form.Control className="task-update-form-control"
                                            type="text"
                                            value={updatedName}
                                            onChange={(e) => setUpdatedName(e.target.value)} />
                                        <Form.Control className="task-update-form-control"
                                            type="date"
                                            value={date}
                                            onChange={(e) => setUpdatedDate(e.target.value)} />
                                        <Button variant="link" type="submit"><i className="bi bi-floppy"></i></Button>
                                        <Button variant="link" onClick={() => setTaskId(-1)} aria-label="close"><i className="bi bi-x-lg"></i></Button>
                                    </InputGroup>
                                </Form>
                            </ListGroup.Item>))
                    )}
                </ListGroup>
            </div>

            <div className="task-list" ref={drop}>
                <h3>Completed tasks</h3>
                <ListGroup className="task-list-group">
                    {todaysTasks.filter(task => task.isCompleted).map((task) => (
                        <DraggableTask
                            key={task.id}
                            id={task.id}
                            name={task.name}
                            isCompleted={task.isCompleted}
                            labelClassName={"task-complete"}
                            date={task.date}
                            handleUpdateClick={handleUpdateClick}
                            handleUpdateTask={handleUpdateTask}
                            todaysDate={todaysDate}
                        />
                    ))}
                </ListGroup>
            </div>
        </div>
    );
};

TaskList.propTypes = {
    todaysTasks: PropTypes.array,
    setTodaysTasks: PropTypes.func.isRequired,
    todaysDate: PropTypes.string.isRequired
};

export default TaskList;