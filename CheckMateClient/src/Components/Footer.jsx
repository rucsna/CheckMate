import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import FormCheck from "react-bootstrap/FormCheck";
import {FlagIcon} from "react-flag-kit";
import { useContext, useState } from "react";
import { SettingsContext } from "../Contexts/SettingsContext";


const languageOptions = {
    GB: "English",
    DE: "Deutsch",
    HU: "magyar",
    KR: "한국인"
};


const Footer = () => {
    const {weekStart, setWeekStart, language, setLanguage, labels} = useContext(SettingsContext);

    const [show, setShow] = useState(false);

    const handleWeekStartChange = () => {
        setWeekStart(prevStart => prevStart === "M" ? "S" : "M");
    };


    return (
        <footer className="bg-success bg-opacity-75">
            <i className="bi bi-gear ms-5" onClick={() => setShow(true)}> {labels.settings}</i>

            <Offcanvas show={show} onHide={() => setShow(false)} className="bg-secondary bg-opacity-75 text-warning">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{labels.settings}</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <ListGroup >
                        <ListGroup.Item className="bg-warning bg-opacity-50">
                            <FormCheck 
                            type="switch" 
                            id="week-start-switch" 
                            label={weekStart === "M" ? `${labels.weekStartM}` : `${labels.weekStartS}`}
                            checked={weekStart !== "M"}
                            onChange={handleWeekStartChange}></FormCheck>
                        </ListGroup.Item>

                        <ListGroup.Item className="bg-warning bg-opacity-50">{labels.chooseLanguage}
                            {Object.entries(languageOptions).map(([code, label]) => (
                                <FormCheck
                                key={code}
                                type="radio"
                                id={code}
                                name="language-group"
                                label={<span>{label}<FlagIcon code={code} size={14} style={{ marginLeft: '5px' }}></FlagIcon></span>}
                                checked={language === code}
                                onChange={() => setLanguage(code)}
                            />
                            ))}    
                        </ListGroup.Item>

                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>

        </footer >
    )
};

export default Footer;