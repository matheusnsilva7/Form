import React from "react";
import "./FormInput.css";

const FormInput = React.memo(function ({ name, type, placeholder, onBlur, invalid, pattern, errorMessage, onChange }) {
    return (
        <div className="form-div">
            <label className="label" htmlFor={name}>{placeholder ? placeholder : name}</label>
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
            {errorMessage && invalid ? <span className="span">{errorMessage}</span> : <span className="span" />}
        </div>
    )
});

export default FormInput;