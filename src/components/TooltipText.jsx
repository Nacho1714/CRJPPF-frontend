import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function TooltipText({text, msg, direction, color}) {
    return (
        <OverlayTrigger
            key={direction}
            placement={direction}
            overlay={
                <Tooltip id={`tooltip-${direction}`} >
                    {msg}
                </Tooltip>
            }
        >

            <span className={color}>{text}</span>

        </OverlayTrigger>
    )
}

export default TooltipText;