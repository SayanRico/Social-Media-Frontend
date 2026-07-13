import React from "react";

/**
 * Face Meet brand mark + wordmark.
 * size: "sm" | "md" | "lg" | "hero"
 * markOnly: show icon without text
 */
const Logo = ({ size = "md", markOnly = false, className = "" }) => {
  const dims = {
    sm: 28,
    md: 36,
    lg: 56,
    hero: 88,
  };
  const px = dims[size] || dims.md;

  return (
    <span className={`fm-logo fm-logo--${size} ${className}`}>
      <span className="fm-logo__mark" style={{ width: px, height: px }}>
        <svg
          viewBox="0 0 64 64"
          width={px}
          height={px}
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id="fmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="55%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#fmGrad)" />
          {/* Two connected faces / community nodes */}
          <circle cx="24" cy="26" r="9" fill="#fff" opacity="0.95" />
          <circle cx="40" cy="26" r="9" fill="#fff" opacity="0.85" />
          <path
            d="M14 46c3.5-8 10-12 18-12s14.5 4 18 12"
            fill="none"
            stroke="#fff"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.9"
          />
          <circle cx="32" cy="34" r="3.5" fill="#fff" />
        </svg>
      </span>
      {!markOnly && (
        <span className="fm-logo__word">
          Face<span>Meet</span>
        </span>
      )}
    </span>
  );
};

export default Logo;
