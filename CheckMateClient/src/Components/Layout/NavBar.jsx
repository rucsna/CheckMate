import { useState, useContext } from "react";
import { DateContext } from "../../Contexts/DateContext";
import { SettingsContext } from "../../Contexts/SettingsContext";
import { TaskContext } from "../../Contexts/TaskContext";
import { Nav, NavDropdown, Card, Button } from "react-bootstrap";
import SettingsOffcanvas from "./SettingsOffcanvas";


const NavBar = ({setAddTaskShow}) => {
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
        setSelectedYear(currentDate.getFullYear());
        handleMonthChange(currentDate.getMonth());
        setSelectedMonth(currentDate.getMonth());
        setDropdownSelectedMonth(currentDate.getMonth());
        setSelectedDay(currentDate.getDate());
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
                <Button className="nav-button ms-4" onClick={setBackToday}>TODAY</Button>
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
                        <NavDropdown.Item className="month-dropdown-item" key={index} eventKey={index}>{month}</NavDropdown.Item>
                    ))}
                </NavDropdown>
                </div>
            </Card>

            <div className="right-section d-flex align-items-center">
                <Button className="nav-button ms-auto me-2" onClick={handleNewTodoClick}><i className="bi bi-plus"></i></Button>
                <SettingsOffcanvas />
            </div>
        </Nav>
    )
}

export default NavBar;