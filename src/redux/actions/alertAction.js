import { GLOBALTYPES } from "./globalTypes";

let toastCounter = 0;

const DEFAULT_TITLES = {
  success: "Success",
  error: "Something went wrong",
  warning: "Warning",
  info: "Notice",
};

const DEFAULT_DURATIONS = {
  success: 4000,
  error: 6500,
  warning: 5500,
  info: 4500,
};

export const createToast = ({ type, message, title, duration, id }) => ({
  id: id || `toast-${Date.now()}-${++toastCounter}`,
  type,
  title: title || DEFAULT_TITLES[type] || "Notice",
  message: typeof message === "string" ? message : String(message ?? ""),
  duration: duration ?? DEFAULT_DURATIONS[type] ?? 4500,
  createdAt: Date.now(),
});

/** Show a toast without clearing loading state */
export const showToast =
  ({ type = "info", message, title, duration }) =>
  (dispatch) => {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        toast: createToast({ type, message, title, duration }),
      },
    });
  };

export const dismissToast = (id) => ({
  type: GLOBALTYPES.TOAST_DISMISS,
  payload: id,
});

export const dismissAllToasts = () => ({
  type: GLOBALTYPES.ALERT,
  payload: { dismissAll: true },
});

/** Reference-counted global loader — safe for parallel requests */
export const startLoading =
  (message = "Please wait…") =>
  (dispatch) => {
    dispatch({
      type: GLOBALTYPES.LOADING_START,
      payload: { message },
    });
  };

export const stopLoading = () => (dispatch) => {
  dispatch({ type: GLOBALTYPES.LOADING_STOP });
};

export { DEFAULT_DURATIONS, DEFAULT_TITLES };
