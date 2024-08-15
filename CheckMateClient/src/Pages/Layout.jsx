import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Footer from "../Components/Footer";
import Card from "react-bootstrap/Card";
import { useContext, useState } from "react";
import { DateContext } from "../Contexts/DateContext";
import Button from "react-bootstrap/esm/Button";
import CurrentTaskDisplayer from "../Components/CurrentTaskDisplayer";
import { SettingsContext } from "../Contexts/SettingsContext";


const Layout = ({ children, handleMonthChange }) => {
  const { currentDate, selectedMonth, setIsToday, setSelectedMonth, setSelectedYear, setSelectedDay, getMonthName, selectedYear, getMonthNumberFromName } = useContext(DateContext);
  const {monthNames, labels} = useContext(SettingsContext);

  const [dropdownSelectedMonth, setDropdownSelectedMonth] = useState(currentDate.getMonth());

  const handleTodaysTaskClick = () => {
    setIsToday(true);
    children.setDailyViewShow(true);
  };

  const handleNewTodoClick = () => {
    setIsToday(true);
    children.setAddTaskShow(true);
  }

  const handleYearLeftClick = () => {
    const year = Number(selectedYear) - 1;
    setSelectedYear(year);
    handleMonthChange(selectedMonth, year);
  };

  const handleYearRightClick = () => {
    const year = Number(selectedYear) + 1;
    setSelectedYear(year);
    handleMonthChange(selectedMonth, year);
  };

  const setBackToday = () => {
    setSelectedYear(currentDate.getFullYear());
    handleMonthChange(currentDate.getMonth());
    setSelectedMonth(currentDate.getMonth());
    setSelectedDay(currentDate.getDate());
  };

  const handleDropdown = (eventKey) => {
    setDropdownSelectedMonth(parseInt(eventKey, 10));
    //console.log('eventKey => ', eventKey);
    handleMonthChange(Number(eventKey), selectedYear);
  };


  return (
    <Container fluid className="d-flex flex-column" style={{ height: "100vh" }}>
      <Nav className="bg-success bg-opacity-75 d-flex justify-content-between align-items-center">
        <Card className="ms-5 mt-2 mb-2 bg-secondary bg-opacity-50 text-warning d-flex align-items-center shadow-lg">
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
                  <span className="text-warning">{monthNames[dropdownSelectedMonth]}</span>
                  
              </span>}
              id="month-dropdown"
              onSelect={(eventKey) => handleDropdown(eventKey)}
              className="month-dropdown"
            >
              {monthNames.map((month, index) => (
                <NavDropdown.Item className="bg-success bg-opacity-50" key={index} eventKey={index}>{month}</NavDropdown.Item>
              ))}
            </NavDropdown>

        </Card>
        <div className="d-flex align-items-center justify-content-center">
          <Button variant="outline-dark" className="ms-auto me-4 bg-warning text-primary shadow-lg" onClick={handleNewTodoClick}>{labels.newTodoButton}</Button>
          <Button variant="outline-dark" className="me-5 bg-secondary bg-opacity-75 text-warning shadow-lg" onClick={handleTodaysTaskClick}>{labels.todaysTasks}</Button>
        </div>
      </Nav>
      <CurrentTaskDisplayer />
      {children.component}
      <Footer setStartDay={children.setStartDay} />
    </Container >
  );
};

export default Layout;