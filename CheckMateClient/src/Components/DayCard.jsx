import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import PropTypes from "prop-types";
import { useEffect, useContext, useState } from "react";
import { StateContext } from "../StateContext";

const DayCard = ({ title, setModalShow }) => {
  const {tasks, setSelectedDay, setIsToday, currentDate, getMonthName, selectedYear, selectedMonth, selectedDay} = useContext(StateContext);

  const [finishedCounter, setFinishedCounter] = useState(1);
  const [unfinishedCounter, setUnfinishedCounter] = useState(3);

  const curr = `${currentDate.getFullYear()}.${getMonthName(currentDate.getMonth())}.${currentDate.getDate()}`;
  const selected = `${selectedYear}.${selectedMonth}.${title}`;

  useEffect(() => {
    const dailyTasks = tasks.filter(task => task.date === title)
  }, [])
  
  const handleClick = () => {
    setSelectedDay(title);
    setIsToday(false);
    setModalShow(true);
  };

  return (
    <Card className={`day-card ${curr === selected ? "bg-warning" : "bg-warning-subtle"} shadow`}>
      <Card.Body onClick={handleClick}>
        <h1>{title}</h1>
        {finishedCounter > 0 ?      
          <Badge pill bg="success">{finishedCounter} <i className="bi bi-check2"></i></Badge> : null}
        {unfinishedCounter > 0 ?  
          <Badge pill bg="danger">{unfinishedCounter} <i className="bi bi-x-lg"></i></Badge> : null}
      </Card.Body>
    </Card>
  )


};

DayCard.propTypes = {
  title: PropTypes.number.isRequired,
  setModalShow: PropTypes.func.isRequired,
};

export default DayCard;