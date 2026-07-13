/**
 * Convenience helpers for toast notifications.
 * Existing GLOBALTYPES.ALERT dispatches still work (error/success keys).
 */
export {
  showToast,
  dismissToast,
  dismissAllToasts,
  createToast,
} from "../redux/actions/alertAction";
