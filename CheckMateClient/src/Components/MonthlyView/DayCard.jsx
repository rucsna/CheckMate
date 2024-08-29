import { useEffect, useContext, useState } from "react";
import { DateContext } from "../../Contexts/DateContext";
import { TaskContext } from "../../Contexts/TaskContext";
import { Badge, Card } from "react-bootstrap";
import TaskOverlay from "./TaskOverlay";
import PropTypes from "prop-types";


const DayCard = ({ currentDay, setModalShow }) => {
  const { setSelectedDay, setIsToday, currentDate, selectedYear, selectedMonth, formatDate } = useContext(DateContext);
  const { tasks } = useContext(TaskContext);

  const [currentDateAsString, setCurrentDateAsString] = useState("");
  const [selectedDateAsString, setSelectedDateAsString] = useState("");

  const [finishedCounter, setFinishedCounter] = useState(0);
  const [unfinishedCounter, setUnfinishedCounter] = useState(0);
  const [dailyTasks, setDailyTasks] = useState([]);


  useEffect(() => {
    const selectedDate = new Date(selectedYear, selectedMonth, currentDay);
    setCurrentDateAsString(formatDate(currentDate));
    setSelectedDateAsString(formatDate(selectedDate));

    const filteredTasks = tasks.filter(task => {
      const taskDate = formatDate(new Date(task.date));
      return taskDate === selectedDateAsString;
    });

    setDailyTasks(filteredTasks);

    setFinishedCounter(filteredTasks.filter(task => task.isCompleted === true).length);
    setUnfinishedCounter(filteredTasks.filter(task => task.isCompleted === false).length);
  }, [tasks, selectedYear, selectedMonth, currentDay, formatDate, currentDate, selectedDateAsString]);


  const handleClick = () => {
    setSelectedDay(currentDay);
    setIsToday(false);
    setModalShow(true);
  };


  return (
    <Card border="success" className={`day-card ${currentDateAsString === selectedDateAsString ? "bg-secondary" : "bg-warning-subtle"} text-center shadow`}>
      <Card.Body onClick={handleClick}>
        <Card.Title>
          <h1 className={`${currentDateAsString === selectedDateAsString ? "text-warning" : "text-dark"}`}>{currentDay}</h1>
        </Card.Title>
        <div className="d-flex">
          {finishedCounter > 0 &&
            <TaskOverlay tasks={dailyTasks} finished={true}>
              <Badge bg="success" className="text-primary bg-opacity-50">
                {finishedCounter}
                <i className="bi bi-check2 text-primary"></i>
              </Badge>
            </TaskOverlay>}
          {unfinishedCounter > 0 &&
            <TaskOverlay tasks={dailyTasks} finished={false}>
              <Badge bg="danger" className="bg-opacity-75 text-primary">{unfinishedCounter} <i className="bi bi-x-lg"></i></Badge>
            </TaskOverlay>}
        </div>
      </Card.Body>
    </Card>
  )
};

DayCard.propTypes = {
  currentDay: PropTypes.number.isRequired,
  setModalShow: PropTypes.func.isRequired,
};

export default DayCard;