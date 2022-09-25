const ModalDenied = ({isModalDeniedDisplayed = "none", text = ""}) => {
    
    return (
        <div className="modal" id="modal-denied" style={{display: isModalDeniedDisplayed}}>
            <p>{text}</p>
        </div>
    )
}

export default ModalDenied;