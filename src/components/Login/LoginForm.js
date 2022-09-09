import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FormInput from "./FormInput";
import Message from "../UI/Message";

import "./LoginForm.css";

const LoginForm = () => {
    const users = useSelector((state) => state.form.users);
    const [successfulMessage, setSuccessfulMessage] = useState(false);
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [invalid, setInvalid] = useState({
        Username: false,
        Password: false,
    });

    const formRef = useRef();

    useEffect(() => {
        if (successfulMessage) {
            formRef.current?.reset();
        };
        if (!users.filter(e => e.Username === Username) < 1) {
            setInvalid({
                Username: false,
                Password: false,
            })
        };
    }, [successfulMessage, Username, users]);

    useEffect(() => {
        if (Password) {
            setInvalid(prev => {
                return { ...prev, Password: false }
            })
        };
    }, [Password]);


    const submitHandler = function (e) {
        e.preventDefault();
        if (users.filter(e => e.Username === Username) < 1) {
            setInvalid(prev => {
                return { ...prev, Username: true, }
            });
            return;
        };
        if (users.filter(e => e.Password === Password) < 1) {
            setInvalid(prev => {
                return { ...prev, Password: true }
            });
            return;
        };
        setSuccessfulMessage(true)
    }

    const onChange = (e) => {
        if (e.target.name === "Username") {
            setUsername(e.target.value);
        };
        if (e.target.name === "Password") {
            setPassword(e.target.value);
        };
    };

    const onClick = () => {
        setSuccessfulMessage(false);
    };

    return (
        <>
            {successfulMessage && <Message message="You have successfully logged in!" onClick={onClick} />}
            <form ref={formRef} className="form" onSubmit={submitHandler}>
                <FormInput
                    onChange={onChange}
                    type="text"
                    name="Username"
                    invalid={invalid["Username"]}
                    value={Username}
                    errorMessage="could not find user"
                    focus={true} />
                <FormInput
                    onChange={onChange}
                    type="password"
                    name="Password"
                    invalid={invalid["Password"]}
                    errorMessage="Wrong Password" />
                <Link className="changepassword-link" to="/changepassword">Forgot password?</Link>
                <button className="button">Sign In</button>
            </form>
        </>
    )
};

export default LoginForm;