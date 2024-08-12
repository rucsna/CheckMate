import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import FormCheck from "react-bootstrap/FormCheck";
import { useContext, useState } from "react";
import { SettingsContext } from "../Contexts/SettingsContext";

const Footer = () => {
    const {weekStart, setWeekStart, language, setLanguage, labels} = useContext(SettingsContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleWeekStartChange = () => {
        setWeekStart(prevStart => prevStart === "M" ? "S" : "M");
    };


    return (
        <footer className="bg-success bg-opacity-75">
            <i className="bi bi-gear ms-5" onClick={handleShow}> {labels.settings}</i>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{labels.settings}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup>
                        <ListGroup.Item>
                            <FormCheck 
                            type="switch" 
                            id="week-start-switch" 
                            label={weekStart === "M" ? `${labels.weekStartM}` : `${labels.weekStartS}`}
                            checked={weekStart === "M" ? false : true} 
                            onChange={handleWeekStartChange}></FormCheck>
                        </ListGroup.Item>
                        <ListGroup.Item>{labels.chooseLanguage}
                            <FormCheck
                                type="radio"
                                id="normal"
                                name="language-group"
                                label="English"
                                checked={language === "eng" ? true : false}
                                onChange={() => setLanguage("eng")}
                            />
                            <FormCheck
                                type="radio"
                                id="normal"
                                name="language-group"
                                label="Deutsch"
                                checked={language === "ger" ? true : false}
                                onChange={() => setLanguage("ger")}
                            />
                            <FormCheck
                                type="radio"
                                id="normal"
                                name="language-group"
                                label="magyar"
                                checked={language === "hun" ? true : false}
                                onChange={() =>setLanguage("hun")}
                            />
                            <FormCheck
                                type="radio"
                                id="normal"
                                name="language-group"
                                label="한국인"
                                checked={language === "kor" ? true : false}
                                onChange={() => setLanguage("kor")}
                            />
                        </ListGroup.Item>
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>

        </footer >
    )
};

export default Footer;