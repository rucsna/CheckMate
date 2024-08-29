import { useState, useEffect, useContext } from 'react';
import { DateContext } from '../Contexts/DateContext';
import { TaskContext } from '../Contexts/TaskContext';
import {Carousel, Alert, Button} from 'react-bootstrap';


const CurrentTaskDisplayer = () => {
  const { currentDate, formatDate } = useContext(DateContext);
  const { tasks } = useContext(TaskContext);

  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [showCarousel, setShowCarousel] = useState(true);


  useEffect(() => {
    const date = currentDate.toISOString().slice(0, 10);
    const filteredTasks = tasks.filter(task => {
      const taskDate = formatDate(new Date(task.date));
      return taskDate === date;
    }).filter(task => !task.isCompleted);

    setIncompleteTasks(filteredTasks);
  }, [currentDate, tasks, formatDate]);


  return (
    <div>
      {showCarousel &&
        incompleteTasks.length > 0 && (
          <div className='position-relative'>
            <Button variant='link' className="position-absolute top-0 end-0 mt-1" onClick={() => setShowCarousel(false)}><i className="bi bi-x-circle-fill"></i></Button>
            <Carousel id="taskDisplayer" className="mt-2 mb-2" indicators={false} interval={8000}>
              {incompleteTasks.map(task => (
                <Carousel.Item key={task.id}>
                  <Alert variant='success' className="carousel-item-content">{task.name}</Alert>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        )}
    </div>
  );
}

export default CurrentTaskDisplayer;