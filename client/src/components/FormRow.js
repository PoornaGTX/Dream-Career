import React from "react";

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  inputPattern,
  placeHolderText,
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
        pattern={inputPattern && "[a-zA-Z]*"}
        placeholder={placeHolderText}
        onChange={handleChange}
        className="form-input"
        readOnly={isReadOnly}
      />
    </div>
  );
};

export default FormRow;
