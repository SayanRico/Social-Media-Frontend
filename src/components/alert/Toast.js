import React, { useEffect, useState, useCallback, useRef } from "react";

const ICONS = {
  success: "check_circle",
  error: "error_outline",
  warning: "warning_amber",
  info: "info_outline",
};

const Toast = ({ toast, onDismiss }) => {
  const { id, type, title, message, duration = 4000 } = toast;
  const [exiting, setExiting] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const remainingRef = useRef(duration);
  const startedRef = useRef(Date.now());

  const dismiss = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => onDismiss(id), 220);
  }, [exiting, id, onDismiss]);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = useCallback(
    (ms) => {
      clearTimer();
      timerRef.current = setTimeout(dismiss, ms);
    },
    [dismiss]
  );

  useEffect(() => {
    startedRef.current = Date.now();
    remainingRef.current = duration;
    startTimer(duration);
    return clearTimer;
  }, [duration, startTimer]);

  const handlePause = () => {
    if (paused) return;
    setPaused(true);
    const elapsed = Date.now() - startedRef.current;
    remainingRef.current = Math.max(0, remainingRef.current - elapsed);
    clearTimer();
  };

  const handleResume = () => {
    if (!paused) return;
    setPaused(false);
    startedRef.current = Date.now();
    startTimer(remainingRef.current);
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`fm-toast fm-toast--${type} ${exiting ? "is-exiting" : ""} ${
        paused ? "is-paused" : ""
      }`}
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onFocus={handlePause}
      onBlur={handleResume}
    >
      <div className="fm-toast__icon" aria-hidden>
        <span className="material-icons">{ICONS[type] || ICONS.info}</span>
      </div>

      <div className="fm-toast__content">
        <span className="fm-toast__title">{title}</span>
        <p className="fm-toast__message">{message}</p>
      </div>

      <button
        type="button"
        className="fm-toast__close"
        onClick={dismiss}
        aria-label="Dismiss notification"
      >
        &times;
      </button>

      <div
        className="fm-toast__progress"
        style={{ animationDuration: `${duration}ms` }}
        aria-hidden
      />
    </div>
  );
};

export default Toast;
