import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./Toast";
import { dismissToast, dismissAllToasts } from "../../redux/actions/alertAction";

const ToastContainer = () => {
  const { toasts } = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  if (!toasts?.length) return null;

  return (
    <div className="fm-toast-viewport" aria-label="Notifications">
      {toasts.length > 1 && (
        <div className="fm-toast-viewport__header">
          <button
            type="button"
            className="fm-toast-dismiss-all"
            onClick={() => dispatch(dismissAllToasts())}
          >
            Dismiss all ({toasts.length})
          </button>
        </div>
      )}

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onDismiss={(id) => dispatch(dismissToast(id))}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
