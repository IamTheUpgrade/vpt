import { useState } from "react";

import ModalAccess from "../../components/modals/modalAccess";
import ModalDenied from "../../components/modals/modalDenied";
import UserForm from "../../components/userForm/userForm";


const SignUpPage = ({setUser = () => {}}) => {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [isModalDeniedDisplayed, setIsModalDeniedDisplayed] = useState("none")
    const [isModalAccessDisplayed, setIsModalAccessDisplayed] = useState("none")

    const emailOnChange = e => setUserEmail(e.target.value);

    const passwordOnchange = e => setUserPassword(e.target.value)

    const addUserOnClick = e => {
        e.preventDefault()
        fetch("http://localhost:8081/user", {
            method: 'POST',
            body: JSON.stringify({
                email: userEmail,
                password: userPassword,
                userList: [],
            }),
            mode: 'cors',
            headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(responseJSON => {
            if (responseJSON) {
                setUser(responseJSON);
                setIsModalAccessDisplayed("block");
            }
            else {
                setIsModalDeniedDisplayed("block");
                setTimeout(() => setIsModalDeniedDisplayed("none"), 2000)
            }
        })
    }

    return (
        <div>
            <div className='container-title'>
                    <span className="material-symbols-outlined logo">bar_chart</span>
                    <h1 className='title'>VIDEOGAMES PRICE TRACKER</h1>
            </div>
            <UserForm text="Sign Up" userEmail={userEmail} emailOnChange={emailOnChange} userPassword={userPassword} passwordOnchange={passwordOnchange} onClick={addUserOnClick}/>
            <ModalAccess isModalAccessDisplayed={isModalAccessDisplayed} text={"welcome"}/>
            <ModalDenied isModalDeniedDisplayed={isModalDeniedDisplayed} text={"email already exists"}/>
        </div>
    )
}

export default SignUpPage;