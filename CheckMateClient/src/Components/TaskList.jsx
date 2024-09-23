import { useContext, useState, useEffect } from "react";
import { TaskContext } from "../Contexts/TaskContext";
import { DateContext } from "../Contexts/DateContext";
import { ListGroup, Form, Button } from "react-bootstrap";
import { CURRENT_DATE } from "../library/constants";


import DraggableTask from "./DraggableTask";
import { useDrop } from "react-dnd";
import { filterDailyTasks, updateTask } from "../library/taskUtils";
import { formatDate } from "../library/dateUtils";


const TaskList = () => {
    const { selectedDay, selectedMonth, selectedYear, isToday } = useContext(DateContext);
    const { tasks, setTasks } = useContext(TaskContext);

    const [todaysTasks, setTodaysTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [incompletedTasks, setIncompletedTasks] = useState([]);
    const [todaysDate, setTodaysDate] = useState(formatDate(CURRENT_DATE));
    const [taskId, setTaskId] = useState(0);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedDate, setUpdatedDate] = useState(null);


    useEffect(() => {
        const newTodaysDate = isToday ? formatDate(CURRENT_DATE) : formatDate(new Date(selectedYear, selectedMonth, selectedDay));
        setTodaysDate(newTodaysDate);

        const filteredTasks = filterDailyTasks(tasks, newTodaysDate, formatDate);
        setTodaysTasks(filteredTasks);
    }, [selectedDay, selectedMonth, selectedYear, CURRENT_DATE, isToday]);

    useEffect(() => {
        setCompletedTasks(todaysTasks.filter(task => task.isCompleted));
        setIncompletedTasks(todaysTasks.filter(task => !task.isCompleted));
    }, [todaysTasks, tasks]);


    // drop zone for completed tasks
    const [{ isOverCompleted }, dropCompleted] = useDrop(() => ({
        accept: "listGroupItem",
        drop: (item) => addTaskToCompleted(item.id),
        collect: (monitor) => ({
            isOverCompleted: !!monitor.isOver(),
        }),
    }));

    const addTaskToCompleted = (id) => {
        setIncompletedTasks(prev => {
            const droppedTask = prev.find(task => task.id === id);
            if (!droppedTask) return prev;

            droppedTask.isCompleted = true;
            const updatedTasks = prev.filter(task => task.id !== id);
            updateTask(droppedTask, setTasks);

            return updatedTasks;
        });
    };

    // drop zone to incomplete tasks
    const [{ isOverIncomplete }, dropIncomplete] = useDrop(() => ({
        accept: "listGroupItem",
        drop: (item) => addTaskToIncomplete(item.id),
        collect: (monitor) => ({
            isOverIncomplete: !!monitor.isOver(),
        }),
    }));

    const addTaskToIncomplete = (id) => {
        setCompletedTasks(prev => {
            const droppedTask = prev.find(task => task.id === id);
            if (!droppedTask) return prev;
            droppedTask.isCompleted = false;

            const updatedTasks = prev.filter(task => task.id !== id);
            updateTask(droppedTask, setTasks);

            return updatedTasks;
        });
    };


    const handleUpdateClick = (id, updatedDate, updatedName) => {
        const taskDate = new Date(updatedDate);

        setUpdatedName(updatedName);
        setUpdatedDate(formatDate(taskDate));
        setTaskId(id);
    };


    const handleUpdateTask = async (event, id, isCompleted, name, date) => {
        event.preventDefault();

        const taskToUpdate = todaysTasks.find(t => t.id === id);
        if (taskToUpdate) {
            taskToUpdate.isCompleted = isCompleted;
            taskToUpdate.name = name;
            taskToUpdate.date = date;
        }

        await updateTask(taskToUpdate, setTasks);
        setTaskId(-1);
    };


    return (

        <div className="task-lists-container">

            <div className="task-list" ref={dropIncomplete}>
                <h3>Incomplete tasks</h3>
                <ListGroup key="incomplete-tasks" className="task-list-incomplete mb-4">
                    {incompletedTasks.map(task => (
                        taskId !== task.id ? (
                            <DraggableTask
                                key={task.id}
                                id={task.id}
                                name={task.name}
                                isCompleted={task.isCompleted}
                                labelClassName="task-incomplete"
                                date={task.date}
                                handleUpdateClick={handleUpdateClick}
                                handleUpdateTask={handleUpdateTask}
                                todaysDate={todaysDate}
                            />
                        ) : (
                            <ListGroup.Item className="drag-and-drop-item">
                                <Form key={task.id}
                                    onSubmit={(e) => handleUpdateTask(e, task.id, task.isCompleted, updatedName, updatedDate)}
                                    className="d-flex align-items-center justify-content-center">

                                    <Form.Control className="task-update-form-control"
                                        type="text"
                                        value={updatedName}
                                        autoFocus
                                        onChange={(e) => setUpdatedName(e.target.value)} />
                                    <Form.Control className="task-update-form-control"
                                        type="date"
                                        value={updatedDate}
                                        onChange={(e) => setUpdatedDate(e.target.value)} />
                                    <Button className="save-button ms-2" type="submit"><i className="bi bi-floppy"></i></Button>
                                    <Button variant="link" className="close-button" onClick={() => setTaskId(-1)} aria-label="close"><i className="bi bi-x-lg"></i></Button>

                                </Form>
                            </ListGroup.Item>))
                    )}
                </ListGroup>
            </div>

            <div className="task-list" ref={dropCompleted}>
                <h3>Completed tasks</h3>
                <ListGroup className="task-list-complete">
                    {completedTasks.map((task) => (
                        <DraggableTask
                            key={task.id}
                            id={task.id}
                            name={task.name}
                            isCompleted={task.isCompleted}
                            labelClassName="task-complete"
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

export default TaskList;