import { Link } from "react-router-dom";
import Card from "../UI/Card";
import LoginForm from "./LoginForm";

import "./Login.css";

const Login = function () {
    return (
        <Card>
            <h3 className="title">Hello</h3>
            <h5 className="subtitle">Sign in to your account</h5>
            <LoginForm />
            <p className="create">don't have an account yet? <Link className="create-link" to="/signup">Create</Link></p>
        </Card>
    )
};

export default Login;