import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddUser } from "../../store/index";
import FormInput from "./FormInput";
import Message from "../UI/Message";
import Data from "../Data/Data";

import "./signupForm.css";

const Signupform = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [successfulMessage, setSuccessfulMessage] = useState(false);
  const [formValid, setFormValid] = useState({
    Username: true,
    Email:true,
  })

  const handlerSubmit = (e) => {
    e.preventDefault();
    if(!formValid.Username || !formValid.Email)return
    const data = Object.fromEntries(new FormData(e.target));
    dispatch(
      AddUser({
        id: Math.random(),
        Username: data.Username,
        Email: data.Email,
        Password: data.Password,
      })
    );
    setSuccessfulMessage(true);
  };

  const onClick = () => {
    navigate("/login", { replace: true });
  };

  return (
    <>
      {successfulMessage && (
        <Message message="You have successfully signed up!" onClick={onClick} />
      )}
      <form className="signup-form" onSubmit={handlerSubmit}>
        {Data.signup.input.map((element) => {
          return (
            <FormInput
              key={element.name}
              type={element.type}
              name={element.name}
              pattern={element.pattern}
              errorMessage={element.errorMessage}
              errorExistsMessage={element.errorExistsMessage}
              setFormValid={setFormValid}
            />
          );
        })}
        <button className="signup-button">Sign In</button>
      </form>
    </>
  );
};

export default Signupform;
