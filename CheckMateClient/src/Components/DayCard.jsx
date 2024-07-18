import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import PropTypes from "prop-types";

const DayCard = ({ title, setModalShow }) => {
  return (
    <Card className="bg-light">
      <Card.Title onClick={() => setModalShow(true)}>
        <h1>{title}</h1>
      </Card.Title>

      <Card.Body>
        <Card.Text>
          <Badge pill bg="success">3 <i className="bi bi-check2"></i></Badge>
          <Badge pill bg="danger">2 <i className="bi bi-x-lg"></i></Badge>
        </Card.Text>
      </Card.Body>
    </Card>
  )


};

DayCard.propTypes = {
  title: PropTypes.number.isRequired,
  setModalShow: PropTypes.func.isRequired,
};

export default DayCard;