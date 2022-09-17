import React from "react";

const FormRow = ({ type, name, value, handleChange, labelText, pattern, placeholder }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        pattern={pattern && "[a-zA-Z]*"}
        onChange={handleChange}
        className="form-input"
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormRow;
