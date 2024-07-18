import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Footer from "../Components/Footer";

const Layout = ({ children }) => {
  const months = ['January', 'February', 'March', 'April'];

  return (
    <Container fluid>
      <Nav className="bg-info flex-column">
        <Nav.Link href="#home"><h1>2024</h1></Nav.Link>
        <NavDropdown title='June' id="month-dropdown">
          {months.map((month, index) => (
            <NavDropdown.Item className="bg-info" key={index}>{month}</NavDropdown.Item>
          ))}
        </NavDropdown>
      </Nav>
      {children}
      <Footer />
    </Container>
  );
};

export default Layout;