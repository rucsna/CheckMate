import { useState, useEffect, useContext } from 'react';
import { TaskContext } from '../Contexts/TaskContext';
import {Carousel, Alert, Button} from 'react-bootstrap';
import { filterDailyTasks } from '../library/taskUtils';
import { formatDate } from '../library/dateUtils';
import { CURRENT_DATE } from '../library/constants';


const CurrentTaskDisplayer = () => {
  const { tasks } = useContext(TaskContext);

  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [showCarousel, setShowCarousel] = useState(true);


  useEffect(() => {
    const date = formatDate(CURRENT_DATE);
    const filteredTasks = filterDailyTasks(tasks, date, formatDate).filter(task => !task.isCompleted);
    setIncompleteTasks(filteredTasks);
  }, [CURRENT_DATE, tasks, formatDate]);


  return (
    <div>
      {showCarousel &&
        incompleteTasks.length > 0 && (
          <div className='position-relative'>
            <Button variant="link" className="position-absolute top-0 end-0 mt-1 me-3" onClick={() => setShowCarousel(false)}><i className="bi bi-x-lg"></i></Button>
            <Carousel id="taskDisplayer" className="mt-3 mb-2" indicators={false} interval={8000}>
              {incompleteTasks.map(task => (
                <Carousel.Item key={task.id}>
                  <Alert className="carousel-item-content">{task.name}</Alert>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        )}
    </div>
  );
}

export default CurrentTaskDisplayer;