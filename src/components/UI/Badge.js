import React from "react";

const Badge = ({
  label,
  count,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}) => {
  const text = count != null ? count : label;
  if (text == null || text === "") return null;

  const classes = [
    "ui-badge",
    `ui-badge--${variant}`,
    `ui-badge--${size}`,
    onClick ? "ui-badge--clickable" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Tag = onClick ? "button" : "span";

  return (
    <Tag type={onClick ? "button" : undefined} className={classes} onClick={onClick}>
      {text}
    </Tag>
  );
};

export default Badge;
