import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddUser } from "../../store/index";
import FormInput from "../Login/FormInput";
import Message from "../UI/Message";

import "./signupForm.css";

const Signupform = function () {
    const users = useSelector((state) => state.form.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [successfulMessage, setSuccessfulMessage] = useState(false);
    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [invalid, setInvalid] = useState({
        Username: false,
        Email: false,
        Password: false,
        confirmPassword: false,
        existsUsername: false,
        existsEmail: false
    });

    useEffect(() => {
        if (Username) {
            setInvalid(prev => {
                return {
                    ...prev,
                    existsUsername: false,
                    Username: false,
                }
            })
        }
    }, [Username])

    useEffect(() => {
        if (Email) {
            setInvalid(prev => {
                return {
                    ...prev,
                    existsEmail: false,
                    Email: false,
                }
            })
        }

    }, [Email]);

    useEffect(() => {
        if (Password) {
            setInvalid(prev => {
                return {
                    ...prev,
                    Password: false,
                    confirmPassword: false,
                }
            })
        }
    }, [Password]);

    useEffect(() => {
        if (confirmPassword) {
            setInvalid(prev => {
                return { ...prev, confirmPassword: false, }
            })
        }
    }, [confirmPassword]);

    const InvalidHandler = (e) => {
        setInvalid(prev => {
            return { ...prev, [e.target.name]: true }
        });
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        dispatch(AddUser({
            id: Math.random(),
            Username: Username,
            Email: Email,
            Password: Password,
        }));
        setSuccessfulMessage(true);
    };

    const onChange = (e) => {
        if (e.target.name === "Username") {
            setUsername(e.target.value)
        };
        if (e.target.name === "Email") {
            setEmail(e.target.value)
        };
        if (e.target.name === "Password") {
            setPassword(e.target.value)
        };
        if (e.target.name === "confirmPassword") {
            setConfirmPassword(e.target.value)
        };
    };

    const onBlur = (e) => {
        if (users.filter(e => e.Username === Username).length >= 1) {
            setInvalid(prev => {
                return { ...prev, existsUsername: true }
            })
        };
        if (users.filter(e => e.Email === Email).length >= 1) {
            setInvalid(prev => {
                return { ...prev, existsEmail: true }
            })
        };
        if (!new RegExp(e.target.pattern).test(e.target.value)) {
            setInvalid(prev => {
                return { ...prev, [e.target.name]: true }
            })
        };
        if (new RegExp(e.target.pattern).test(e.target.value)) {
            setInvalid(prev => {
                return { ...prev, [e.target.name]: false }
            })
        };
    };

    const onClick = () => {
        navigate("/login", { replace: true });
    };

    return (
        <>
            {successfulMessage && <Message message="You have successfully signed up!" onClick={onClick} />}
            <form className="signup-form" onInvalid={InvalidHandler} onSubmit={handlerSubmit}>
                <FormInput
                    onBlur={onBlur}
                    onChange={onChange}
                    type="text"
                    name="Username"
                    pattern="^[A-Za-z0-9]{3,16}$"
                    value={Username}
                    invalid={invalid.Username ? invalid["Username"] : invalid.existsUsername}
                    errorMessage={invalid.Username ? "Username must have at least 3 characters" : "Username already exists"} />
                <FormInput
                    onBlur={onBlur}
                    onChange={onChange}
                    type="email"
                    name="Email"
                    pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
                    value={Email}
                    invalid={invalid.Email ? invalid["Email"] : invalid.existsEmail}
                    errorMessage={invalid.Email ? "" : "Email already exists"} />
                <FormInput
                    onBlur={onBlur}
                    onChange={onChange}
                    type="password"
                    name="Password"
                    pattern="[A-Za-z0-9]{5,16}$"
                    value={Password}
                    invalid={invalid["Password"]}
                    errorMessage="Password must have at least 5 characters" />
                <FormInput
                    onBlur={onBlur}
                    onChange={onChange}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    errorMessage="Confirm password does not match"
                    pattern={`^[${Password}]{${Password.length}}$`}
                    value={confirmPassword}
                    invalid={invalid["confirmPassword"]} />
                <button disabled={invalid.existsUsername || invalid.existsEmail} className="signup-button">Sign In</button>
            </form>
        </>
    )
};

export default Signupform;