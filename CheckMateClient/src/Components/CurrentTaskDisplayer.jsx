import Carousel from 'react-bootstrap/Carousel';
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect, useContext } from 'react';
import { DateContext } from '../Contexts/DateContext';
import Button from 'react-bootstrap/Button';
import { TaskContext } from '../Contexts/TaskContext';

const CurrentTaskDisplayer = () => {
  const { currentDate } = useContext(DateContext);
  const {fetchTasks} = useContext(TaskContext);

  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [showCarousel, setShowCarousel] = useState(true);


  useEffect(() => {
    const date = currentDate.toISOString().slice(0, 10);
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:5295/api/todos/${date}`);
        if (!response.ok) {
          throw new Error("Problem with network response");
        }
        const taskData = await response.json();
        if (taskData) {
          //console.log(taskData);
          setIncompleteTasks(taskData.filter(task => !task.isCompleted));
        } else {
          // setErrorMessage("Your tasks couldn't be loaded, please contact the site manager");
          // setShowToast(true);
        }
      } catch (error) {
        // setErrorMessage("An unexpected error occured, we are already working on the solution. Please, check back later");
        // setShowToast(true);
        // console.error(error);
      };
    };
    fetchTasks();
  }, [fetchTasks]);

  //console.log(showCarousel);
  return (
    <>
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
      )
    }
    </>
  );
}

export default CurrentTaskDisplayer;