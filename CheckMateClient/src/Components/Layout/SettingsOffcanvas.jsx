import { useContext, useState } from "react";
import { SettingsContext } from "../../Contexts/SettingsContext";
import { Offcanvas, ListGroup, FormCheck, Button } from "react-bootstrap";
import { FlagIcon } from "react-flag-kit";


const languageOptions = {
    GB: "English",
    DE: "Deutsch",
    HU: "magyar",
    KR: "한국인"
};


const SettingsOffcanvas = () => {
    const { weekStart, setWeekStart, language, setLanguage, labels } = useContext(SettingsContext);

    const [show, setShow] = useState(false);

    const handleWeekStartChange = () => {
        setWeekStart(prevStart => prevStart === "Monday" ? "Sunday" : "Monday");
    };


    return(
        <div>
        <Button size="lg" className="nav-button me-4" onClick={() => setShow(true)}><i className="bi bi-gear"></i></Button>
        <Offcanvas show={show} onHide={() => setShow(false)} className="offcanvas-background">
                <Offcanvas.Header className="offcanvas-title" closeButton>
                    <Offcanvas.Title>{labels.settings}</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <ListGroup>
                        <ListGroup.Item className="offcanvas-list">{labels.weekStartLabel}
                            {[labels.Monday, labels.Sunday].map((label, index) => (
                            <FormCheck
                                className="offcanvas-switch"
                                key={index}
                                type="radio"
                                id="week-start-switch"
                                label={label}
                                checked={labels[label] === weekStart}
                                onChange={handleWeekStartChange}>

                            </FormCheck>))}
                        </ListGroup.Item>

                        <ListGroup.Item className="offcanvas-list">{labels.chooseLanguage}
                            {Object.entries(languageOptions).map(([code, label]) => (
                                <FormCheck
                                    className="offcanvas-switch"
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
            </div>
    )
}

export default SettingsOffcanvas;