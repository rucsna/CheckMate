import { useState, useContext } from "react";
import { DateContext } from "../../Contexts/DateContext";
import { SettingsContext } from "../../Contexts/SettingsContext";
import { TaskContext } from "../../Contexts/TaskContext";
import { Nav, NavDropdown, Card, Button } from "react-bootstrap";
import SettingsOffcanvas from "./SettingsOffcanvas";
import PropTypes from "prop-types";


const NavBar = ({ setAddTaskShow }) => {
    const { currentDate, selectedMonth, setIsToday, setSelectedMonth, setSelectedYear, setSelectedDay, selectedYear, handleMonthChange } = useContext(DateContext);
    const { monthNames, labels } = useContext(SettingsContext);
    const { setDailyViewShow } = useContext(TaskContext);

    const [dropdownSelectedMonth, setDropdownSelectedMonth] = useState(currentDate.getMonth());
    const [isLeftDisabled, setIsLeftDisabled] = useState(false);
    const [isRightDisabled, setIsRightDisabled] = useState(false);


    const handleNewTodoClick = () => {
        setIsToday(true);
        setAddTaskShow(true);
    };

    const handleYearChange = (step) => {
        const newYear = Number(selectedYear) + step;
        const minYear = currentDate.getFullYear() - 100;
        const maxYear = currentDate.getFullYear() + 100;

        setIsLeftDisabled(newYear <= minYear);
        setIsRightDisabled(newYear >= maxYear);

        setSelectedYear(newYear);
        handleMonthChange(selectedMonth, newYear);
    }

    const handleYearLeftClick = () => {
        handleYearChange(-1);
    };

    const handleYearRightClick = () => {
        handleYearChange(1);
    };
    

    const setBackToday = () => {
        // sets back the selected date states to current date
        setSelectedYear(currentDate.getFullYear());
        setSelectedMonth(currentDate.getMonth());
        setSelectedDay(currentDate.getDate());

        // sets back the dropdown to show the current month
        setDropdownSelectedMonth(currentDate.getMonth());
        handleMonthChange(currentDate.getMonth());

        // shows daily view
        setIsToday(true);
        setDailyViewShow(true);
    };

    const handleDropdown = (eventKey) => {
        setDropdownSelectedMonth(Number(eventKey));
        handleMonthChange(Number(eventKey), selectedYear);
    };

    return (
        <Nav className="navigation-bar d-flex justify-content-between align-items-center">
            <div className="left-section">
                <Button size="lg" className="nav-button ms-4" onClick={setBackToday}>{labels.today}</Button>
            </div>

            <Card className="navigation-card mt-3 mb-3 d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center">
                    <Card.Text className="mt-2 me-3" as="h1">
                        <span>
                            <Button variant="link" onClick={handleYearLeftClick} disabled={isLeftDisabled}><i className="bi bi-caret-left-fill"></i></Button>
                            {selectedYear}
                            <Button variant="link" onClick={handleYearRightClick} disabled={isRightDisabled}><i className="bi bi-caret-right-fill"></i></Button>
                        </span>
                    </Card.Text>

                    <NavDropdown
                        title={<span className="dropdown-title">{monthNames[dropdownSelectedMonth]}</span>}
                        id="month-dropdown"
                        onSelect={(eventKey) => handleDropdown(eventKey)}
                        className="month-dropdown fs-4"
                    >
                        {monthNames.map((month, index) => (
                            <NavDropdown.Item
                                key={index}
                                eventKey={index}
                                active={monthNames[dropdownSelectedMonth] === month ? true : false}>
                                {month}
                            </NavDropdown.Item>
                        ))}
                    </NavDropdown>
                </div>
            </Card>

            <div className="right-section d-flex align-items-center">
                <Button size="lg" className="nav-button ms-auto me-2" onClick={handleNewTodoClick}><strong><i className="bi bi-plus-lg"></i></strong></Button>
                <SettingsOffcanvas />
            </div>
        </Nav>
    );
};

NavBar.propTypes = {setAddTaskShow: PropTypes.func.isRequired};

export default NavBar;