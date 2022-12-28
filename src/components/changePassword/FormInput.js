import React, { useEffect, useState } from "react";
import "./FormInput.css";

const FormInput = React.memo(function ({
  name,
  type,
  valid,
  pattern,
  errorMessage,
  onEmail,
  setPassword,
  setConfirmPassword,
  setValid,
}) {
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setInvalid(valid);
  }, [valid]);

  const onChange = (e) => {
    if (type === "email") onEmail(false);
    if (name === "Confirm Password")
      setValid((prev) => {
        return { ...prev, confirmPassword: false };
      });
    setInvalid(false);
  };

  const onBlur = (e) => {
    if (!new RegExp(e.target.pattern).test(e.target.value)) {
      setInvalid(true);
    }
    if (new RegExp(e.target.pattern).test(e.target.value)) {
      setInvalid(false);
    }
    if (name === "Confirm Password") setConfirmPassword(e.target.value);
    if (name === "New Password") setPassword(e.target.value);
  };

  return (
    <div className="form-div">
      <label className="label" htmlFor={name}>
        {name}
      </label>
      <input
        onBlur={onBlur}
        onChange={onChange}
        className={invalid ? "input invalid" : "input"}
        type={type}
        name={name}
        id={name}
        pattern={pattern}
        required
      />
      {errorMessage && invalid ? (
        <span className="span">{errorMessage}</span>
      ) : (
        <span className="span" />
      )}
    </div>
  );
});

export default FormInput;
