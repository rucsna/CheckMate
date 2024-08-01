import Carousel from 'react-bootstrap/Carousel';
import Alert from 'react-bootstrap/Alert';

function CurrentTaskDisplayer() {
    return (
        <Carousel id="taskDisplayer" className="mt-2" indicators={false} interval={8000}>
          <Carousel.Item>
          <Alert className="carousel-item-content">Task1</Alert>
          </Carousel.Item>
          <Carousel.Item>
          <Alert className=" carousel-item-content">Task2</Alert>
          </Carousel.Item>
          <Carousel.Item>
          <Alert className=" carousel-item-content">Task3</Alert>
          </Carousel.Item>
      </Carousel>
    );
}

export default CurrentTaskDisplayer;