import { useEffect, useContext, useState } from "react";
import { DateContext } from "../../Contexts/DateContext";
import { TaskContext } from "../../Contexts/TaskContext";
import { Badge, Card } from "react-bootstrap";
import TaskOverlay from "./TaskOverlay";
import PropTypes from "prop-types";


const DayCard = ({ currentDay, setModalShow, className, isSaturday, isSunday }) => {
  const { setSelectedDay, setIsToday, currentDate, selectedYear, selectedMonth, formatDate } = useContext(DateContext);
  const { tasks } = useContext(TaskContext);

  const [currentDateAsString, setCurrentDateAsString] = useState("");
  const [selectedDateAsString, setSelectedDateAsString] = useState("");

  const [finishedCounter, setFinishedCounter] = useState(0);
  const [unfinishedCounter, setUnfinishedCounter] = useState(0);
  const [dailyTasks, setDailyTasks] = useState([]);


  useEffect(() => {
    // format current date and selected date into a string for easy comparison (used for highlighting current day)
    const selectedDate = new Date(selectedYear, selectedMonth, currentDay);
    setCurrentDateAsString(formatDate(currentDate));
    setSelectedDateAsString(formatDate(selectedDate));

    // filter the tasks for each day
    const filteredTasks = tasks.filter(task => {
      const taskDate = formatDate(new Date(task.date));
      return taskDate === selectedDateAsString;
    });

    setDailyTasks(filteredTasks);

    // count finished and unfinished tasks for the badges
    setFinishedCounter(filteredTasks.filter(task => task.isCompleted === true).length);
    setUnfinishedCounter(filteredTasks.filter(task => task.isCompleted === false).length);
  }, [tasks, selectedYear, selectedMonth, currentDay, formatDate, currentDate, selectedDateAsString]);


  const handleClick = () => {
    setSelectedDay(currentDay);
    setIsToday(false);
    setModalShow(true);
  };

  const todayClass = currentDateAsString === selectedDateAsString ? "background-today" : "";
  const weekendClass = isSaturday || isSunday ? "background-weekend" : "";
  const isDisabled = className.includes("disabled-card");

  return (
    <Card className={`day-card ${todayClass} ${weekendClass} ${className} text-center`}>
      <Card.Body onClick={handleClick}>
        <Card.Title>
          <h1 className={`${!isDisabled && currentDateAsString === selectedDateAsString ? "text-today" : ""}`}>{currentDay}</h1>
        </Card.Title>

        <div className="d-flex">
          {!isDisabled && (finishedCounter > 0) && (
            <TaskOverlay tasks={dailyTasks} finished={true}>
              <Badge className="finished-badge">
                {finishedCounter}
                <i className="bi bi-check2"></i>
              </Badge>
            </TaskOverlay>)}

          {!isDisabled && (unfinishedCounter > 0) && (
            <TaskOverlay tasks={dailyTasks} finished={false}>
              <Badge className="unfinished-badge">{unfinishedCounter} <i className="bi bi-x-lg"></i></Badge>
            </TaskOverlay>)}
        </div>

      </Card.Body>
    </Card>
  )
};

DayCard.propTypes = {
  currentDay: PropTypes.number.isRequired,
  setModalShow: PropTypes.func,
};

export default DayCard;