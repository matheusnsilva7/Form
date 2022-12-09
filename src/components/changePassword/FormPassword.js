import React, { useState, useEffect } from "react";
import Data from "../Data/Data";
import FormInput from "./FormInput";

const FormPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invalid, setInvalid] = useState({
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    if (password !== confirmPassword && confirmPassword.length !== 0) {
      setInvalid((prev) => {
        return { ...prev, confirmPassword: true };
      });
    }
  }, [confirmPassword, password]);

  return (
    <>
      {Data.changePassword.input.map((element) => {
        return (
          <FormInput
            key={element.name}
            type={element.type}
            name={element.name}
            pattern={element.pattern}
            errorMessage={element.errorMessage}
            valid={invalid[element.name]}
            setValid={setInvalid}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
          />
        );
      })}
    </>
  );
};

export default FormPassword;
