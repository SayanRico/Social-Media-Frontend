import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../UI/Loader";

const SHOW_DELAY_MS = 280;
const MIN_VISIBLE_MS = 480;

const Loading = () => {
  const { loading, loadingMessage } = useSelector((state) => state.alert);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const shownAtRef = useRef(0);

  useEffect(() => {
    if (!loading) return undefined;

    const delayTimer = setTimeout(() => {
      shownAtRef.current = Date.now();
      setVisible(true);
      setExiting(false);
    }, SHOW_DELAY_MS);

    return () => clearTimeout(delayTimer);
  }, [loading]);

  useEffect(() => {
    if (loading || !visible) return undefined;

    const elapsed = Date.now() - shownAtRef.current;
    const remain = Math.max(0, MIN_VISIBLE_MS - elapsed);
    setExiting(true);

    const hideTimer = setTimeout(() => {
      setVisible(false);
      setExiting(false);
    }, remain);

    return () => clearTimeout(hideTimer);
  }, [loading, visible]);

  if (!visible && !exiting) return null;

  return (
    <div
      className={`fm-loading-overlay ${exiting ? "is-exiting" : ""}`}
      role="alert"
      aria-busy="true"
      aria-live="assertive"
    >
      <div className="fm-loading-overlay__card">
        <span className="fm-loading-overlay__brand">Face Meet</span>
        <Loader
          size="lg"
          variant="ring"
          label={loadingMessage || "Please wait…"}
        />
      </div>
    </div>
  );
};

export default Loading;
