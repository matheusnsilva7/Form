import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePassword } from "../../store/index";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import Card from "../UI/Card";
import Message from "../UI/Message";

import "./changePassword.css";
import FormPassword from "./FormPassword";

const ChangePassword = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.form.users);
  const [successfulMessage, setSuccessfulMessage] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (data.Email) setEmail(data.Email);
    if (users.filter((e) => e.Email === data.Email).length < 1)setEmailValid(true);
    if (users.filter((e) => e.Email === data.Email).length !== 0)setCheckEmail(true);
    if (checkEmail && data.newPassword === data.confirmPassword) {
      dispatch(
        changePassword({
          Email: email,
          Password: data.newPassword,
        })
      );
      setSuccessfulMessage(true);
    }
  };

  const onClick = () => {
    navigate("/login", { replace: true });
  };

  return (
    <>
      {successfulMessage && (
        <Message
          message="You have successfully change your Password!"
          onClick={onClick}
        />
      )}
      <Card>
        <Link to="/login" className="back">
          &larr;
        </Link>
        <h3 className="change-password">Change Password</h3>
        <form className="form" onSubmit={submitHandler}>
          {!checkEmail && (
            <FormInput
              type="email"
              name="Email"
              valid={emailValid}
              errorMessage="Email not found!"
              onEmail={setEmailValid}
            />
          )}
          {checkEmail && <h3 className="email-title">{email}</h3>}
          {checkEmail && <FormPassword />}
          <button className="signup-button">
            {checkEmail ? "Change Password" : "Check Email"}
          </button>
        </form>
      </Card>
    </>
  );
};

export default ChangePassword;
