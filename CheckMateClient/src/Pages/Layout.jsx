import { useContext, useState } from "react";
import { DateContext } from "../Contexts/DateContext";
import { SettingsContext } from "../Contexts/SettingsContext";
import { Container, Nav, NavDropdown, Card, Button } from "react-bootstrap";
import Footer from "../Components/Footer";
import CurrentTaskDisplayer from "../Components/CurrentTaskDisplayer";
import PropTypes from "prop-types";


const Layout = ({ children, handleMonthChange }) => {
  const { currentDate, selectedMonth, setIsToday, setSelectedMonth, setSelectedYear, setSelectedDay, selectedYear } = useContext(DateContext);
  const { monthNames, labels } = useContext(SettingsContext);

  const [dropdownSelectedMonth, setDropdownSelectedMonth] = useState(currentDate.getMonth());
  const [isLeftDisabled, setIsLeftDisabled] = useState(false);
  const [isRightDisabled, setIsRightDisabled] = useState(false);


  const handleTodaysTaskClick = () => {
    setIsToday(true);
    children.setDailyViewShow(true);
  };

  const handleNewTodoClick = () => {
    setIsToday(true);
    children.setAddTaskShow(true);
  }

  const handleYearChange = (step) => {
    const newYear = Number(selectedYear) + step;
    const minYear = currentDate.getFullYear() - 100;
    const maxYear = currentDate.getFullYear() + 100;

    setIsLeftDisabled(newYear <= minYear);
    setIsRightDisabled(newYear >= maxYear);

    selectedYear(newYear);
    handleMonthChange(selectedMonth, newYear);
  }

  const handleYearLeftClick = () => {
    handleYearChange(-1);
  };

  const handleYearRightClick = () => {
    handleYearChange(1);
  };

  const setBackToday = () => {
    setSelectedYear(currentDate.getFullYear());
    handleMonthChange(currentDate.getMonth());
    setSelectedMonth(currentDate.getMonth());
    setSelectedDay(currentDate.getDate());
  };

  const handleDropdown = (eventKey) => {
    setDropdownSelectedMonth(Number(eventKey));
    handleMonthChange(Number(eventKey), selectedYear);
  };


  return (
    <Container fluid className="d-flex flex-column" style={{ height: "100vh" }}>
      <Nav className="bg-success bg-opacity-75 d-flex justify-content-between align-items-center">

        <Card className="ms-5 mt-2 mb-2 bg-secondary bg-opacity-50 text-warning d-flex align-items-center shadow-lg">
          <Card.Text className="mt-2" as="h1">
            <span>
              <Button variant="link" onClick={handleYearLeftClick} disabled={isLeftDisabled}><i className="bi bi-caret-left-fill"></i></Button>
              {selectedYear}
              <Button variant="link" onClick={handleYearRightClick} disabled={isRightDisabled}><i className="bi bi-caret-right-fill"></i></Button>
            </span>
          </Card.Text>

          <NavDropdown
            title={<span className="text-warning">{monthNames[dropdownSelectedMonth]}</span>}
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

        {/* <Card className="me-5 bg-warning text-secondary d-flex align-items-center shadow-lg">
          <Card.Body>TODAY</Card.Body>
        </Card> */}
        
      </Nav>
      <CurrentTaskDisplayer />
      {children.component}
      <Footer setStartDay={children.setStartDay} />
    </Container >
  );
};

Layout.propTypes = {
  children: PropTypes.any,
  handleMonthChange: PropTypes.func.isRequired
};

export default Layout;