import React from 'react';
import { Link } from "react-router-dom";

import "./squareLink.css";

const SquareLink = ({to = "/", text = "", children}) => {
    
    return (
        <div className="square-link-container">
            <div><Link to={to} className='square-link-link'>{children}</Link></div>
            <div>{text}</div>
        </div>
    )
}

export default SquareLink;