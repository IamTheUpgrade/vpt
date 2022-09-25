import { Link } from 'react-router-dom';

import './modals.css'

const ModalAccess = ({isModalAccessDisplayed = "none", text = ""}) => {

    return (
        <div className="modal" id="modal-access" style={{display: isModalAccessDisplayed}}>
            <div>
                <p>{text}</p>
                <Link to="/">enter</Link>
            </div>
        </div>
    )
}

export default ModalAccess;