import { GLOBALTYPES } from "./globalTypes";
import {
  getDataAPI,
  postDataAPI,
  putDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from "../../utils/fetchData";

export const PLATFORM_TYPES = {
  SET_REPORTS: "SET_REPORTS",
  SET_AUDIT_LOGS: "SET_AUDIT_LOGS",
  SET_ADMIN_USERS: "SET_ADMIN_USERS",
  SET_USER_360: "SET_USER_360",
  SET_APPEALS: "SET_APPEALS",
  SET_ANNOUNCEMENTS: "SET_ANNOUNCEMENTS",
  SET_FEATURE_FLAGS: "SET_FEATURE_FLAGS",
  SET_FIREBASE_CONFIG: "SET_FIREBASE_CONFIG",
  SET_SYSTEM_HEALTH: "SET_SYSTEM_HEALTH",
  SET_ANALYTICS: "SET_ANALYTICS",
};

export const getReports = (token, filter = {}) => async (dispatch) => {
  try {
    const params = new URLSearchParams(filter).toString();
    const res = await getDataAPI(`admin/reports?${params}`, token);
    dispatch({ type: PLATFORM_TYPES.SET_REPORTS, payload: res.data.reports });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response?.data?.msg || err.message },
    });
  }
};

export const updateReport = ({ token, id, body }) => async (dispatch) => {
  try {
    await patchDataAPI(`admin/reports/${id}`, body, token);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: "Report updated." },
    });
    dispatch(getReports(token));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response?.data?.msg },
    });
  }
};

export const getAuditLogs = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI("admin/audit", token);
    dispatch({ type: PLATFORM_TYPES.SET_AUDIT_LOGS, payload: res.data.logs });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response?.data?.msg },
    });
  }
};

export const adminSearchUsers = (token, { q, status, page }) => async (dispatch) => {
  try {
    const params = new URLSearchParams({ q: q || "", status: status || "", page: page || 1 });
    const res = await getDataAPI(`admin/users/search?${params}`, token);
    dispatch({ type: PLATFORM_TYPES.SET_ADMIN_USERS, payload: res.data.users });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response?.data?.msg },
    });
  }
};

export const getUser360 = (token, id) => async (dispatch) => {
  try {
    const res = await getDataAPI(`admin/users/${id}/360`, token);
    dispatch({ type: PLATFORM_TYPES.SET_USER_360, payload: res.data });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response?.data?.msg },
    });
  }
};

export const suspendUser = (token, id, hours) => async (dispatch) => {
  try {
    await patchDataAPI(`admin/users/${id}/suspend`, { durationHours: hours }, token);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: "User suspended." } });
    dispatch(getUser360(token, id));
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response?.data?.msg } });
  }
};

export const toggleShadowBan = (token, id) => async (dispatch) => {
  try {
    await patchDataAPI(`admin/users/${id}/shadow-ban`, null, token);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: "Shadow ban toggled." } });
    dispatch(getUser360(token, id));
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response?.data?.msg } });
  }
};

export const addModeratorNote = (token, id, text) => async (dispatch) => {
  try {
    await postDataAPI(`admin/users/${id}/notes`, { text }, token);
    dispatch(getUser360(token, id));
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response?.data?.msg } });
  }
};

export const getAppeals = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI("admin/appeals", token);
    dispatch({ type: PLATFORM_TYPES.SET_APPEALS, payload: res.data.appeals });
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response?.data?.msg } });
  }
};

export const resolveAppeal = (token, id, status, reviewNote) => async (dispatch) => {
  try {
    await patchDataAPI(`admin/appeals/${id}`, { status, reviewNote }, token);
    dispatch(getAppeals(token));
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response?.data?.msg } });
  }
};

export const getAnnouncements = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI("admin/announcements", token);
    dispatch({ type: PLATFORM_TYPES.SET_ANNOUNCEMENTS, payload: res.data.announcements });
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response?.data?.msg } });
  }
};

export const createAnnouncement = (token, body) => async (dispatch) => {
  try {
    await postDataAPI("admin/announcements", body, token);
    dispatch(getAnnouncements(token));
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response?.data?.msg } });
  }
};

export const deleteAnnouncement = (token, id) => async (dispatch) => {
  try {
    await deleteDataAPI(`admin/announcements/${id}`, token);
    dispatch(getAnnouncements(token));
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response?.data?.msg } });
  }
};

export const getFeatureFlags = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI("admin/flags", token);
    dispatch({ type: PLATFORM_TYPES.SET_FEATURE_FLAGS, payload: res.data.flags });
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response?.data?.msg } });
  }
};

export const upsertFeatureFlag = (token, body) => async (dispatch) => {
  try {
    await postDataAPI("admin/flags", body, token);
    dispatch(getFeatureFlags(token));
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response?.data?.msg } });
  }
};

export const getSystemHealth = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI("admin/system-health", token);
    dispatch({ type: PLATFORM_TYPES.SET_SYSTEM_HEALTH, payload: res.data });
  } catch (err) {
    /* silent */
  }
};

export const getAnalyticsOverview = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI("admin/analytics/overview", token);
    dispatch({ type: PLATFORM_TYPES.SET_ANALYTICS, payload: res.data });
  } catch (err) {
    /* silent on first load */
  }
};

export const submitReport = (token, body) => async (dispatch) => {
  try {
    await postDataAPI("reports", body, token);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: "Report submitted." } });
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response?.data?.msg } });
  }
};

export const globalSearch = (token, q) => async (dispatch) => {
  const res = await getDataAPI(`search/global?q=${encodeURIComponent(q)}`, token);
  return res.data;
};

export const getFirebaseConfig = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI("admin/integrations/firebase", token);
    dispatch({
      type: PLATFORM_TYPES.SET_FIREBASE_CONFIG,
      payload: res.data.config,
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response?.data?.msg || err.message },
    });
  }
};

export const saveFirebaseConfig = (token, body) => async (dispatch) => {
  try {
    const res = await putDataAPI("admin/integrations/firebase", body, token);
    dispatch({
      type: PLATFORM_TYPES.SET_FIREBASE_CONFIG,
      payload: res.data.config,
    });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.msg || "Firebase configuration saved." },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response?.data?.msg || err.message },
    });
  }
};
