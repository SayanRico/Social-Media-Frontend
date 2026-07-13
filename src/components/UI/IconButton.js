import React from "react";

/**
 * Lightweight icon button — reference IconButton without Tailwind / iconUtils.
 * Pass icon as a React node (e.g. <i className="fas fa-image" />).
 */
const IconButton = ({
  icon,
  onClick,
  disabled,
  title,
  variant = "ghost",
  size = "md",
  className = "",
  type = "button",
}) => {
  const classes = [
    "ui-icon-btn",
    `ui-icon-btn--${variant}`,
    `ui-icon-btn--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
    >
      {icon}
    </button>
  );
};

export default IconButton;
