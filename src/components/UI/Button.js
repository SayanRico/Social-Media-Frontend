import React from "react";
import useSafeTheme from "../../hooks/useSafeTheme";

const Button = ({
  children,
  size = "md",
  variant = "primary",
  design = "solid",
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
  onClick,
  type = "button",
  title,
  ...props
}) => {
  useSafeTheme();

  const classes = [
    "ui-btn",
    `ui-btn--${size}`,
    `ui-btn--${variant}`,
    `ui-btn--${design}`,
    fullWidth ? "ui-btn--full" : "",
    loading ? "ui-btn--loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      title={title}
      {...props}
    >
      {loading && <span className="ui-btn__spinner" aria-hidden />}
      <span className="ui-btn__label">{children}</span>
    </button>
  );
};

export default Button;
