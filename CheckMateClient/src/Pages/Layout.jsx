import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Footer from "../Components/Footer";
import NavItem from "react-bootstrap/esm/NavItem";
import { useContext } from "react";
import { StateContext } from "../StateContext";
import Button from "react-bootstrap/esm/Button";
import CurrentTaskDisplayer from "../Components/CurrentTaskDisplayer";


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const Layout = ({ children, handleMonthChange }) => {
  const { currentDate, selectedMonth, setIsToday } = useContext(StateContext);


  const handleClick = () => {
    setIsToday(true);
    children.setDailyViewShow(true);
  };


  return (
    <Container fluid className="d-flex flex-column" style={{ height: "100vh" }}>
      <Nav className="bg-info flex-column">
        <div className="d-flex align-items-center">
          <NavItem className="ms-5 mt-2"><h1>{currentDate.getFullYear()}</h1></NavItem>
          <Button variant="warning" className="ms-auto me-4 mt-4 text-primary shadow" onClick={() => children.setAddTaskShow(true)}>New todo</Button>
          <Button className="me-5 mt-4 shadow" onClick={handleClick}>Today</Button>
        </div>
        <NavDropdown className="ms-5" title={selectedMonth} id="month-dropdown" onSelect={handleMonthChange}>
          {months.map((month, index) => (
            <NavDropdown.Item className="bg-info" key={index} eventKey={index}>{month}</NavDropdown.Item>
          ))}
        </NavDropdown>
      </Nav>
      <CurrentTaskDisplayer />
      <div className="flex-grow">
      {children.component}
      </div>
      <Footer setStartDay={children.setStartDay}/>
    </Container>
  );
};

export default Layout;