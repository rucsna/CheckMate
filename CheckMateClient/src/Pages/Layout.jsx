import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Footer from "../Components/Footer";
import NavItem from "react-bootstrap/esm/NavItem";
import { useContext } from "react";
import { StateContext } from "../StateContext";
import Button from "react-bootstrap/esm/Button";

const Layout = ({ children, handleMonthChange, selectedMonth }) => {
  const { currentDate } = useContext(StateContext);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <Container fluid className="d-flex flex-column" style={{ height: "100vh" }}>
      <Nav className="bg-info flex-column">
        <div className="d-flex align-items-center">
          <NavItem className="ms-5 mt-4"><h1>2024</h1></NavItem>
          <Button className="ms-auto me-5 mt-4" onClick={() => children.setDailyViewShow(true)}>Today</Button>
        </div>
        <NavDropdown className="ms-5" title={selectedMonth} id="month-dropdown" onSelect={handleMonthChange}>
          {months.map((month, index) => (
            <NavDropdown.Item className="bg-info" key={index} eventKey={index}>{month}</NavDropdown.Item>
          ))}
        </NavDropdown>
      </Nav>
      {children.component}
      <Footer />
    </Container>
  );
};

export default Layout;