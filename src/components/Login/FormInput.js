import React, { useState, useEffect } from "react";
import "./FormInput.css";

const FormInput = function ({
  name,
  type,
  valid,
  pattern,
  errorMessage,
  onValid,
}) {
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setInvalid(valid);
  }, [valid]);

  const onChange = (e) => {
    onValid({ Username: false, Password: false });
  };

  return (
    <div className="form-div">
      <label className="label" htmlFor={name}>
        {name}
      </label>
      <input
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
};

export default FormInput;
