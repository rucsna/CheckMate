import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Footer from "../Components/Footer";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { DateContext } from "../Contexts/DateContext";
import Button from "react-bootstrap/esm/Button";
import CurrentTaskDisplayer from "../Components/CurrentTaskDisplayer";


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const Layout = ({ children, handleMonthChange }) => {
  const { currentDate, selectedMonth, setIsToday, setSelectedMonth, setSelectedYear, setSelectedDay, getMonthName, selectedYear, getMonthNumberFromName } = useContext(DateContext);


  const handleTodaysTaskClick = () => {
    setIsToday(true);
    children.setDailyViewShow(true);
  };

  const handleYearLeftClick = () => {
    const year = Number(selectedYear) - 1;
    setSelectedYear(year);
    handleMonthChange(getMonthNumberFromName(selectedMonth) - 1, year);
  };

  const handleYearRightClick = () => {
    const year = Number(selectedYear) + 1;
    setSelectedYear(year);
    handleMonthChange(getMonthNumberFromName(selectedMonth) - 1, year);
  };

  const setBackToday = () => {
    setSelectedYear(currentDate.getFullYear());
    handleMonthChange(currentDate.getMonth());
    setSelectedMonth(getMonthName(currentDate.getMonth()));
    setSelectedDay(currentDate.getDate());
  };


  return (
    <Container fluid className="d-flex flex-column" style={{ height: "100vh" }}>
      <Nav className="bg-success bg-opacity-75 d-flex justify-content-between align-items-center">
        <Card className="ms-5 mt-2 mb-2 bg-secondary bg-opacity-50 text-warning d-flex align-items-center shadow">
          <Card.Header className="mt-2" as="h1">
            <span>
              <Button variant="link" onClick={handleYearLeftClick}><i className="bi bi-caret-left-fill"></i></Button>
              {selectedYear}
              <Button variant="link" onClick={handleYearRightClick}><i className="bi bi-caret-right-fill"></i></Button>
            </span>
            </Card.Header>
          
            <NavDropdown
              title={
                <span className="d-flex align-items-center">
                  <i className="bi bi-caret-down month-dropdown-toggle-icon"></i>
                  <span className="text-warning">{selectedMonth}</span>
                  
              </span>}
              id="month-dropdown"
              onSelect={(eventKey) => handleMonthChange(eventKey, selectedYear)}
              className="month-dropdown"
            >
              {months.map((month, index) => (
                <NavDropdown.Item className="bg-success bg-opacity-50" key={index} eventKey={index}>{month}</NavDropdown.Item>
              ))}
            </NavDropdown>

        </Card>
        <div className="d-flex align-items-center justify-content-center">
          <Button variant="outline-dark" className="ms-auto me-4 bg-warning text-primary shadow" onClick={() => children.setAddTaskShow(true)}>New todo</Button>
          <Button variant="outline-dark" className="me-5 bg-secondary bg-opacity-75 text-warning shadow" onClick={handleTodaysTaskClick}>Today's tasks</Button>
        </div>
      </Nav>
      <CurrentTaskDisplayer />
      {children.component}
      <Footer setStartDay={children.setStartDay} />
    </Container >
  );
};

export default Layout;