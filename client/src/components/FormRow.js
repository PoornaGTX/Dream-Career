import React from "react";

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  inputPattern,
  pcText,
  isReadOnly,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        pattern={inputPattern && "[a-zA-Z]*"}
        className="form-input"
        placeholder={pcText}
        readOnly={isReadOnly}
      />
    </div>
  );
};

export default FormRow;
