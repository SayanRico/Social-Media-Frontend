import React from "react";

/**
 * Face Meet loader — ring or dots.
 * @param {string} size - sm | md | lg | xl
 * @param {string} variant - ring | dots
 * @param {string} label - optional text below spinner
 * @param {string} className
 */
const Loader = ({
  size = "md",
  variant = "ring",
  label,
  className = "",
  id,
}) => {
  return (
    <div
      className={`fm-loader fm-loader--${size} ${className}`.trim()}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label || "Loading"}
      id={id}
    >
      {variant === "dots" ? (
        <div className="fm-loader__dots" aria-hidden>
          <span />
          <span />
          <span />
        </div>
      ) : (
        <div className="fm-loader__ring" aria-hidden />
      )}
      {label && <p className="fm-loader__label">{label}</p>}
    </div>
  );
};

export default Loader;
