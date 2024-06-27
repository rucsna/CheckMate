import Card from "react-bootstrap/Card";

const DayCard = ({title, info}) => {
    return(
        <Card>
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <Card.Title>Statistics about daily tasks</Card.Title>
          <Card.Text>
            {info}
          </Card.Text>
        </Card.Body>
      </Card>
    )


}

export default DayCard;