import React from "react";
import Loader from "../UI/Loader";

/**
 * Centered section loader for feeds, profiles, discover, etc.
 */
const LoaderInline = ({
  label = "Loading…",
  size = "md",
  variant = "ring",
  compact = false,
  className = "",
}) => {
  return (
    <div
      className={`fm-loader-inline ${compact ? "fm-loader-inline--compact" : ""} ${className}`.trim()}
    >
      <Loader size={size} variant={variant} label={label} />
    </div>
  );
};

export default LoaderInline;
