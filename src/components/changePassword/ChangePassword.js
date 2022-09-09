import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePassword } from "../../store/index";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../Login/FormInput";
import Card from "../UI/Card";
import Message from "../UI/Message";

import "./changePassword.css";

const ChangePassword = function () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.form.users);
    const [successfulMessage, setSuccessfulMessage] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);
    const [Email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [invalid, setInvalid] = useState({
        Email: false,
        newPassword: false,
        confirmPassword: false,
    });

    useEffect(() => {
        if (users.filter(e => e.Email === Email) < 1) {
            setInvalid(prev => {
                return { ...prev, Email: false }
            });
        };
    }, [Email, users]);

    useEffect(() => {
        if (!new RegExp("[A-Za-z0-9]{5,16}$").test(newPassword)) {
            setInvalid(prev => {
                return {
                    ...prev,
                    newPassword: false,
                    confirmPassword: false,
                }
            });
        };
    }, [newPassword]);

    useEffect(() => {
        if (!new RegExp(`^[${newPassword}]{${newPassword.length}}$`).test(confirmPassword)) {
            setInvalid(prev => {
                return { ...prev, confirmPassword: false, }
            });
        };

    }, [confirmPassword, newPassword]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (users.filter(e => e.Email === Email) < 1) {
            setInvalid(prev => {
                return { ...prev, Email: true }
            });
            return;
        };
        setCheckEmail(true);
        if (checkEmail) {
            dispatch(changePassword({
                Email: Email,
                Password: newPassword
            }));
            setSuccessfulMessage(true);
        };

    };

    const onChange = (e) => {
        if (e.target.name === "Email") {
            setEmail(e.target.value);
        };
        if (e.target.name === "newPassword") {
            setNewPassword(e.target.value);
        };
        if (e.target.name === "confirmPassword") {
            setConfirmPassword(e.target.value);
        };
    };

    const onBlur = (e) => {
        if (users.filter(e => e.Email === Email) < 1) {
            setInvalid(prev => {
                return { ...prev, Email: true }
            });
        };
        if (!new RegExp(e.target.pattern).test(e.target.value)) {
            setInvalid(prev => {
                return { ...prev, [e.target.name]: true }
            });
        };
        if (new RegExp(e.target.pattern).test(e.target.value)) {
            setInvalid(prev => {
                return { ...prev, [e.target.name]: false }
            });
        };
    };

    const onClick = () => {
        navigate("/login", { replace: true });
    };

    return (
        <>
            {successfulMessage && <Message message="You have successfully change your Password!" onClick={onClick} />}
            <Card>
                <Link to="/login" className="back">&larr;</Link>
                <h3 className="change-password">Change Password</h3>
                <form className="form" onSubmit={submitHandler}>
                    {checkEmail && <h3 className="email-title">{Email}</h3>}
                    {!checkEmail && <FormInput
                        onBlur={onBlur}
                        onChange={onChange}
                        type="email"
                        name="Email"
                        invalid={invalid["Email"]}
                        errorMessage="Email not found!" />}
                    {checkEmail && <FormInput
                        onBlur={onBlur}
                        onChange={onChange}
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        pattern="[A-Za-z0-9]{5,16}$"
                        invalid={invalid["newPassword"]}
                        errorMessage="Password must have at least 5 characters" />}
                    {checkEmail && <FormInput
                        onBlur={onBlur}
                        onChange={onChange}
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        pattern={`^[${newPassword}]{${newPassword.length}}$`}
                        invalid={invalid["confirmPassword"]}
                        errorMessage="Confirm password does not match" />}
                    <button className="signup-button">{checkEmail ? "Change Password" : "Check Email"}</button>
                </form>
            </Card>
        </>
    )
};

export default ChangePassword;