import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FormInput from "./FormInput";
import Message from "../UI/Message";
import Data from "../Data/Data";

import "./LoginForm.css";

const LoginForm = () => {
  const formRef = useRef();
  const users = useSelector((state) => state.form.users);
  const [successfulMessage, setSuccessfulMessage] = useState(false);
  const [invalid, setInvalid] = useState({
    Username: false,
    Password: false,
  });

  useEffect(() => {
    if (successfulMessage) {
      formRef.current?.reset();
    }
  }, [successfulMessage]);

  const submitHandler = function (e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (users.filter((e) => e.Username === data.Username) < 1) {
      setInvalid((prev) => {
        return { ...prev, Username: true };
      });
      return;
    }
    if (users.filter((e) => e.Password === data.Password) < 1) {
      setInvalid((prev) => {
        return { ...prev, Password: true };
      });
      return;
    }
    setSuccessfulMessage(true);
  };

  const onClick = () => {
    setSuccessfulMessage(false);
  };

  return (
    <>
      {successfulMessage && (
        <Message message="You have successfully logged in!" onClick={onClick} />
      )}
      <form ref={formRef} className="form" onSubmit={submitHandler}>
        {Data.login.input.map((element) => {
          return (
            <FormInput
              key={element.name}
              type={element.type}
              name={element.name}
              valid={invalid[element.name]}
              errorMessage={element.errorMessage}
              focus={element.focus}
              onValid={setInvalid}
            />
          );
        })}
        <Link className="changepassword-link" to="/changepassword">
          Forgot password?
        </Link>
        <button className="button">Sign In</button>
      </form>
    </>
  );
};

export default LoginForm;
