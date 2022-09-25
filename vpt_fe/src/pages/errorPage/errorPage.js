import { Link } from "react-router-dom";

const ErrorPage = () => {

    return (
        <div style={{textAlign: "center", padding: "200px 10%"}}>
            <p>Sorry the page you are looking for does not exist</p>
            <Link to="/">HomePage</Link>
        </div>
    )
}

export default ErrorPage;