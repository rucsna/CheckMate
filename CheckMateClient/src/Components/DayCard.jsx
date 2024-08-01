import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import PropTypes from "prop-types";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useEffect, useContext, useState } from "react";
import { DateContext } from "../Contexts/DateContext";
import Tooltip from "react-bootstrap/Tooltip";
import { TaskContext } from "../Contexts/TaskContext";


const DayCard = ({ title, setModalShow }) => {
  const { setSelectedDay, setIsToday, currentDate, getMonthName, selectedYear, selectedMonth } = useContext(DateContext);
  const {tasks} = useContext(TaskContext);

  const [finishedCounter, setFinishedCounter] = useState(0);
  const [unfinishedCounter, setUnfinishedCounter] = useState(0);
  const [dailyTasks, setDailyTasks] = useState(tasks.filter(task => Number(task.date.slice(-2)) === title));

  const curr = `${currentDate.getFullYear()}.${getMonthName(currentDate.getMonth())}.${currentDate.getDate()}`;
  const selected = `${selectedYear}.${selectedMonth}.${title}`;

  useEffect(() => {
    setFinishedCounter(dailyTasks.filter(task => task.completed === true).length);
    setUnfinishedCounter(dailyTasks.filter(task => task.completed === false).length);
  }, [tasks, setDailyTasks, dailyTasks, title]);

  const handleClick = () => {
    setSelectedDay(title);
    setIsToday(false);
    setModalShow(true);
  };

  const renderTooltip = (props, finished) => {
    const names = dailyTasks
      .filter(task => task.completed === finished)
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
    <Card className={`day-card ${curr === selected ? "bg-dark" : "bg-warning-subtle"} shadow`}>
      <Card.Body onClick={handleClick}>
        <h1 className={`${curr === selected ? "text-warning" : "text-dark"}`}>{title}</h1>
        <div className="d-flex">
          {finishedCounter > 0 &&
            <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={finishedTasksTooltip}>
              <Badge bg={`${curr === selected ? "warning-subtle" : "primary"}`} className="text-primary bg-opacity-25">
                {finishedCounter}
                <i className="bi bi-check2 text-primary"></i>
              </Badge>
            </OverlayTrigger>}
          {unfinishedCounter > 0 &&
            <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={unfinishedTasksTooltip}>
              <Badge bg="success" className="text-primary bg-opacity-50">{unfinishedCounter} <i className="bi bi-x-lg"></i></Badge>
            </OverlayTrigger>}
        </div>
      </Card.Body>
    </Card>
  )


};

DayCard.propTypes = {
  title: PropTypes.number.isRequired,
  setModalShow: PropTypes.func.isRequired,
};

export default DayCard;