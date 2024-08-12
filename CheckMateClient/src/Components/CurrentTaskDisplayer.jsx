import Carousel from 'react-bootstrap/Carousel';
import Alert from 'react-bootstrap/Alert';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import { useState, useEffect, useContext } from 'react';
import { DateContext } from '../Contexts/DateContext';

const CurrentTaskDisplayer = () => {
  const {currentDate} = useContext(DateContext);
  // const [tasksByDate, setTasksByDate] = useState([
  //   { id: 0, name: "feed the cat", completed: false, date: "2024.07.27" },
  //   { id: 2, name: "lunch", completed: false, date: "2024.07.27" },
  // ]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);

  useEffect(() => {
    const date = currentDate.toISOString().slice(0, 10);
    const fetchTasks = async () => {
      try {
          const response = await fetch(`http://localhost:5295/api/todos/${date}`);
          if(!response.ok){
              throw new Error("Problem with network response");
          }
          const taskData = await response.json();
          if(taskData){
              console.log(taskData);
              setIncompleteTasks(taskData.filter(task => !task.isCompleted));
          } else{
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