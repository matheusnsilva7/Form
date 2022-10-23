import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./FormInput.css";

const FormInput = React.memo(function ({
  name,
  type,
  placeholder,
  pattern,
  errorMessage,
  errorExistsMessage,
}) {
  const users = useSelector((state) => state.form.users);
  const [value, setValue] = useState("");
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setInvalid(false);
  }, [value]);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onBlur = (e) => {
    if (
      name === "Username" &&
      users.filter((e) => e.Username === value).length >= 1
    ) {
      setInvalid({ exists: true });
      return;
    }
    if (
      name === "Email" &&
      users.filter((e) => e.Email === value).length >= 1
    ) {
      setInvalid({ exists: true });
      return;
    }
    if (!new RegExp(e.target.pattern).test(e.target.value)) {
      setInvalid({ valid: true });
    }
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
        placeholder={name}
        name={name}
        id={name}
        pattern={pattern}
        required
      />
      {errorMessage && invalid.valid ? (
        <span className="span">{errorMessage}</span>
      ) : (
        <span className="span" />
      )}
      {errorExistsMessage && invalid.exists ? (
        <span className="span">{errorExistsMessage}</span>
      ) : (
        <span className="span" />
      )}
    </div>
  );
});

export default FormInput;
