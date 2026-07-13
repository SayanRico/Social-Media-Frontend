import { GLOBALTYPES } from "../actions/globalTypes";
import { createToast } from "../actions/alertAction";

const MAX_TOASTS = 5;

const initialState = {
  loading: false,
  loadingCount: 0,
  loadingMessage: "",
  toasts: [],
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.TOAST_DISMISS:
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload),
      };

    case GLOBALTYPES.LOADING_START: {
      const message = action.payload?.message || state.loadingMessage || "Please wait…";
      const count = state.loadingCount + 1;
      return {
        ...state,
        loadingCount: count,
        loading: true,
        loadingMessage: message,
      };
    }

    case GLOBALTYPES.LOADING_STOP: {
      const count = Math.max(0, state.loadingCount - 1);
      return {
        ...state,
        loadingCount: count,
        loading: count > 0,
        loadingMessage: count > 0 ? state.loadingMessage : "",
      };
    }

    case GLOBALTYPES.ALERT: {
      const p = action.payload;

      if (!p || typeof p !== "object") {
        return { ...state, loading: false, loadingCount: 0, loadingMessage: "" };
      }

      if (p.dismissAll) {
        return { ...state, toasts: [] };
      }

      if (p.dismissId) {
        return {
          ...state,
          toasts: state.toasts.filter((t) => t.id !== p.dismissId),
        };
      }

      let next = { ...state };

      if (p.loading === true) {
        next.loadingCount = state.loadingCount + 1;
        next.loading = true;
        if (p.loadingMessage) next.loadingMessage = p.loadingMessage;
        else if (!state.loadingMessage) next.loadingMessage = "Please wait…";
      } else if (p.loading === false) {
        const count = Math.max(0, state.loadingCount - 1);
        next.loadingCount = count;
        next.loading = count > 0;
        if (count === 0) next.loadingMessage = "";
      } else if (Object.keys(p).length === 0) {
        next.loading = false;
        next.loadingCount = 0;
        next.loadingMessage = "";
      }

      if (p.loadingMessage && p.loading !== false) {
        next.loadingMessage = p.loadingMessage;
      }

      const additions = [];

      if (p.error) {
        additions.push(createToast({ type: "error", message: p.error, title: p.title }));
      }
      if (p.success) {
        additions.push(createToast({ type: "success", message: p.success, title: p.title }));
      }
      if (p.warning) {
        additions.push(createToast({ type: "warning", message: p.warning, title: p.title }));
      }
      if (p.info) {
        additions.push(createToast({ type: "info", message: p.info, title: p.title }));
      }
      if (p.toast) {
        additions.push(
          typeof p.toast.id === "string" ? p.toast : createToast(p.toast)
        );
      }

      if (additions.length > 0) {
        next.toasts = [...state.toasts, ...additions].slice(-MAX_TOASTS);
      }

      if (
        next.loading &&
        p.loading !== true &&
        (p.error || p.success || p.warning || p.info)
      ) {
        const count = Math.max(0, next.loadingCount - 1);
        next.loadingCount = count;
        next.loading = count > 0;
        if (count === 0) next.loadingMessage = "";
      }

      return next;
    }

    default:
      return state;
  }
};

export default alertReducer;
