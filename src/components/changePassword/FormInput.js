import React, { useEffect, useState } from "react";
import "./FormInput.css";

const FormInput = React.memo(function ({
  name,
  type,
  placeholder,
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
    if (name === "confirmPassword")
      setValid((prev) => {
        return { ...prev, confirmPassword: false };
      });
  };

  const onBlur = (e) => {
    if (!new RegExp(e.target.pattern).test(e.target.value)) {
      setInvalid(true);
    }
    if (new RegExp(e.target.pattern).test(e.target.value)) {
      setInvalid(false);
    }
    if (name === "confirmPassword") setConfirmPassword(e.target.value);
    if (name === "newPassword") setPassword(e.target.value);
  };

  return (
    <div className="form-div">
      <label className="label" htmlFor={name}>
        {placeholder ? placeholder : name}
      </label>
      <input
        onBlur={onBlur}
        onChange={onChange}
        className={invalid ? "input invalid" : "input"}
        type={type}
        placeholder={placeholder ? placeholder : name}
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
