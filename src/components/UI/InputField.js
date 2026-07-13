import React from "react";

const InputField = ({
  label,
  error,
  required,
  type = "text",
  placeholder,
  value,
  onChange,
  onClear,
  disabled,
  className = "",
  helperText,
  name,
  id,
  clearable,
  as,
  rows = 3,
  suffix,
  ...props
}) => {
  const inputId = id || name || label;

  return (
    <div className={`ui-field ${error ? "ui-field--error" : ""} ${className}`}>
      {label && (
        <label className="ui-field__label" htmlFor={inputId}>
          {label}
          {required && <span className="ui-field__req">*</span>}
        </label>
      )}
      <div className="ui-field__control">
        {as === "textarea" ? (
          <textarea
            id={inputId}
            name={name}
            className="ui-field__input ui-field__textarea"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            rows={rows}
            {...props}
          />
        ) : (
          <input
            id={inputId}
            name={name}
            type={type}
            className="ui-field__input"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...props}
          />
        )}
        {suffix && <div className="ui-field__suffix">{suffix}</div>}
        {clearable && value && onClear && (
          <button
            type="button"
            className="ui-field__clear"
            onClick={onClear}
            aria-label="Clear"
          >
            ×
          </button>
        )}
      </div>
      {(error || helperText) && (
        <p className={`ui-field__hint ${error ? "ui-field__hint--error" : ""}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;
