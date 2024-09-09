import {OverlayTrigger, Tooltip} from "react-bootstrap";
import PropTypes from "prop-types";


const TaskOverlay = ({ children, tasks, finished }) => {
    const names = tasks
        .filter(task => task.isCompleted === finished)
        .map(task => task.name);

    const renderTooltip = (props) => (
        <Tooltip id="tooltip" className="task-tooltip" {...props}>
            {names.map((name, index) => (
                <p key={index}>{name}</p>
            ))}
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}>
            {children}
        </OverlayTrigger>
    )
};

TaskOverlay.propTypes = {
    children: PropTypes.any.isRequired,
    tasks: PropTypes.array,
    finished: PropTypes.bool
};

export default TaskOverlay;