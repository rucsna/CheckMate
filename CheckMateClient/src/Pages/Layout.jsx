import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const Layout = ({children}) => {
    const months = ['January', 'February', 'March', 'April'];

    return (
        <div>
    <Navbar expand="lg" bg="info">
      <Container fluid>
        <Nav className="me-auto">
            <Navbar.Brand href="#home">2024</Navbar.Brand>
            <NavDropdown title='June' id="month-dropdown">
            {months.map((month, index) => (
              <NavDropdown.Item key={index}>{month}</NavDropdown.Item>
            ))}
            </NavDropdown> 
        </Nav>
      </Container>
    </Navbar>
    {children}
    </div>
  );
}

export default Layout;