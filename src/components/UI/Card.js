import React from "react";

const Card = ({
  title,
  subtitle,
  children,
  onClick,
  className = "",
  variant = "default",
  interactive,
}) => {
  const classes = [
    "ui-card",
    `ui-card--${variant}`,
    interactive || onClick ? "ui-card--interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      type={onClick ? "button" : undefined}
      className={classes}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <div className="ui-card__header">
          {title && <h3 className="ui-card__title">{title}</h3>}
          {subtitle && <p className="ui-card__subtitle">{subtitle}</p>}
        </div>
      )}
      {children && <div className="ui-card__body">{children}</div>}
    </Tag>
  );
};

export default Card;
