import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import FormCheck from "react-bootstrap/FormCheck";
import { useContext, useState } from "react";
import { StateContext } from "../StateContext";

const Footer = () => {
    const {weekStart, setWeekStart} = useContext(StateContext);

    const [show, setShow] = useState(false);
    const [sillyLabel, setSillyLabel] = useState("Choose me!!!");

    console.log('week start', weekStart);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleWeekStartChange = () => {
        setWeekStart(prevStart => prevStart === "M" ? "S" : "M");
    };

    return (
        <footer className="bg-info">
            <i className="bi bi-gear" onClick={handleShow}> Settings</i>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup>
                        <ListGroup.Item>
                            <FormCheck 
                            type="switch" 
                            id="week-start-switch" 
                            label={weekStart === "M" ? "Week starts with Monday" : "Week starts with Sunday"}
                            checked={weekStart === "M" ? false : true} 
                            onChange={handleWeekStartChange}></FormCheck>
                        </ListGroup.Item>
                        <ListGroup.Item>Choose mode
                            <FormCheck
                                type="radio"
                                id="normal"
                                name="mode-group"
                                label="Normal mode"
                            />
                            <FormCheck
                                type="radio"
                                id="normal"
                                name="mode-group"
                                label="Strict mode"
                            />
                            <FormCheck
                                type="radio"
                                id="normal"
                                name="mode-group"
                                label="Silly mode"
                            />
                        </ListGroup.Item>
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>

        </footer >
    )
};

export default Footer;