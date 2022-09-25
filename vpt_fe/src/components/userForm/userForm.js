import './userForm.css'

const UserForm = ({userEmail = "", emailOnChange = () => {}, userPassword = "", passwordOnchange = () => {}, onClick = () => {}, text = "", }) => {

    return (
        <form id="userForm-container">
            <div id="userForm-inner">
                <div className="userForm-field-container">
                    <label htmlFor="user-email">email</label>
                    <input type="email" id="user-email" value={userEmail} onChange={emailOnChange} autoComplete="true"/>
                </div>
                <div className="userForm-field-container">
                    <label htmlFor="user-password">password</label>
                    <input type="password" id="user-password" value={userPassword} onChange={passwordOnchange} autoComplete="true"/>
                </div>
                <div id="userForm-button-container">
                    <button onClick={onClick}>{text}</button>
                </div>
            </div>
        </form>
    )
}

export default UserForm;