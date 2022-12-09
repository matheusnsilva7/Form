import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./FormInput.css";

const FormInput = React.memo(function ({
  name,
  type,
  pattern,
  errorMessage,
  errorExistsMessage,
  setFormValid,
}) {
  const users = useSelector((state) => state.form.users);
  const [value, setValue] = useState("");
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setInvalid(false);
  }, [value]);

  const onChange = (e) => setValue(e.target.value);
  const onBlur = (e) => {
    if (name === "Username" && users.filter((e) => e.Username === value).length >= 1) {
      setInvalid({ exists: true });
      setFormValid((prev) => {return { ...prev, Username: false }});
      return;
    }
    if (name === "Email" && users.filter((e) => e.Email === value).length >= 1) {
      setInvalid({ exists: true });
      setFormValid((prev) => {return { ...prev, Email: false }});
      return;
    }
    if (!new RegExp(e.target.pattern).test(e.target.value))setInvalid({ valid: true });
    if (name === "Email" && users.filter((e) => e.Email === value).length === 0)
      setFormValid((prev) => {return { ...prev, Email: true }});
    if (name === "Username" && users.filter((e) => e.Username === value).length === 0)
      setFormValid((prev) => {return { ...prev, Username: true };});
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
