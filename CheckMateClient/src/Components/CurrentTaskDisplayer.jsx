import Carousel from 'react-bootstrap/Carousel';
import Alert from 'react-bootstrap/Alert';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import { useState, useEffect } from 'react';

const CurrentTaskDisplayer = () => {
  const [tasksByDate, setTasksByDate] = useState([
    { id: 0, name: "feed the cat", completed: false, date: "2024.07.27" },
    { id: 2, name: "lunch", completed: false, date: "2024.07.27" },
  ]);
  const [incompleteTasks, setIncompleteTasks] = useState(tasksByDate.filter(task => !task.completed));

  useEffect(() => {
    // fetch tasks by today!
  }, [])


  return (
    <>
      {incompleteTasks.length > 0 && (
        <Carousel id="taskDisplayer" className="mt-2 mb-2" indicators={false} interval={8000}>
          {incompleteTasks.map(task => (
            <Carousel.Item key={task.id}>
              <Alert className="carousel-item-content">{task.name}</Alert>
            </Carousel.Item>
          )
          )}
        </Carousel>)}
    </>
  );
}

export default CurrentTaskDisplayer;