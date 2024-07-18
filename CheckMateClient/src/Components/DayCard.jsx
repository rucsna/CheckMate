import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import PropTypes from "prop-types";
import { useEffect, useContext, useState } from "react";
import { StateContext } from "../StateContext";

const DayCard = ({ title, setModalShow }) => {
  const {tasks} = useContext(StateContext);

  const [finishedCounter, setFinishedCounter] = useState(1);
  const [unfinishedCounter, setUnfinishedCounter] = useState(3);

  useEffect(() => {
    const dailyTasks = tasks.filter(task => task.date === title)
  }, [])
  

  return (
    <Card className="day-card bg-light">
      <Card.Body onClick={() => setModalShow(true)}>
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