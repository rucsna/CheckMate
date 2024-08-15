import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import PropTypes from "prop-types";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useEffect, useContext, useState } from "react";
import { DateContext } from "../Contexts/DateContext";
import Tooltip from "react-bootstrap/Tooltip";
import { TaskContext } from "../Contexts/TaskContext";


const DayCard = ({ currentDay, setModalShow }) => {
  const { setSelectedDay, setIsToday, currentDate, selectedYear, selectedMonth } = useContext(DateContext);
  const {tasks} = useContext(TaskContext);

  const [currentDateAsString, setCurrentDateAsString] = useState("");
  const [selectedDateAsString, setSelectedDateAsString] = useState("");

  const [finishedCounter, setFinishedCounter] = useState(0);
  const [unfinishedCounter, setUnfinishedCounter] = useState(0);
  const [dailyTasks, setDailyTasks] = useState([]);
  //console.log(selectedMonth);


  useEffect(() => {
    const currentDateString = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`
    setCurrentDateAsString(currentDateString);
    const selectedDateString = `${selectedYear}-${selectedMonth}-${currentDay}`;
    setSelectedDateAsString(selectedDateString);

    const filteredTasks = tasks.filter(task => {
      const taskDate = new Date(task.date);
      //console.log(taskDate);
      const taskDateAsString = `${taskDate.getFullYear()}-${taskDate.getMonth()}-${taskDate.getDate()}`;
      //console.log('TDS', selectedDateAsString, taskDateAsString);
      return taskDateAsString == selectedDateAsString;
    });
    
    setDailyTasks(filteredTasks);


    setFinishedCounter(filteredTasks.filter(task => task.isCompleted === true).length);
    setUnfinishedCounter(filteredTasks.filter(task => task.isCompleted === false).length);
  }, [tasks, selectedYear, selectedMonth, currentDay]);

  //console.log('current', currentDateAsString);
  //console.log('selected', selectedDateAsString);

  const handleClick = () => {
    setSelectedDay(currentDay);
    setIsToday(false);
    setModalShow(true);
  };

  const renderTooltip = (props, finished) => {
    const names = dailyTasks
      .filter(task => task.isCompleted === finished)
      .map(task => task.name);

    return (
      <Tooltip id="tooltip" className="task-tooltip" {...props}>
        {names.map((name, index) => (
            <p key={index}>{name}</p>
        ))}
      </Tooltip>)
  };

  const finishedTasksTooltip = (props) => renderTooltip(props, true);
  const unfinishedTasksTooltip = (props) => renderTooltip(props, false);

  return (
    <Card border="success" className={`day-card ${currentDateAsString === selectedDateAsString ? "bg-secondary" : "bg-warning-subtle"} text-center shadow`}>
      <Card.Body onClick={handleClick}>
        <Card.Title>
        <h1 className={`${currentDateAsString === selectedDateAsString ? "text-warning" : "text-dark"}`}>{currentDay}</h1>
        </Card.Title>
        <div className="d-flex">
          {finishedCounter > 0 &&
            <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={finishedTasksTooltip}>
              <Badge bg="success" className="text-primary bg-opacity-50">
                {finishedCounter}
                <i className="bi bi-check2 text-primary"></i>
              </Badge>
            </OverlayTrigger>}
          {unfinishedCounter > 0 &&
            <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={unfinishedTasksTooltip}>
              <Badge bg="danger" className="bg-opacity-75 text-primary">{unfinishedCounter} <i className="bi bi-x-lg"></i></Badge>
            </OverlayTrigger>}
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