import { postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
import { startLoading, stopLoading } from "./alertAction";
import valid from "../../utils/valid";

export const TYPES = {
  AUTH: "AUTH",
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch(startLoading("Signing in…"));
    const res = await postDataAPI("login", data);

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: { token: res.data.access_token, user: res.data.user },
    });

    dispatch({
      type: GLOBALTYPES.USER_TYPE,
      payload: res.data.user.role,
    });

    localStorage.setItem("firstLogin", true);
    dispatch(stopLoading());
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch(stopLoading());
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const changePassword = ({oldPassword, newPassword, cnfNewPassword, auth}) => async (dispatch) => {

  if(!oldPassword || oldPassword.length === 0){
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: "Please enter your old  password." },
    });
  }
  if(!newPassword || newPassword.length === 0){
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: "Please enter your new  password." },
    });
  }
  if(!cnfNewPassword || cnfNewPassword.length === 0){
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: "Please confirm your new  password." },
    });
  }
  if(newPassword !==cnfNewPassword){
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: "Your password does not match" },
    });
  }
  
  try {
    dispatch(startLoading("Updating password…"));

    const res = await postDataAPI('changePassword', {oldPassword, newPassword}, auth.token );

    dispatch(stopLoading());
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch(stopLoading());
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const adminLogin = (data) => async (dispatch) => {
  try {
    dispatch(startLoading("Signing in to admin…"));
    const res = await postDataAPI("admin_login", data);

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: { token: res.data.access_token, user: res.data.user },
    });

    dispatch({
      type: GLOBALTYPES.USER_TYPE,
      payload: res.data.user.role,
    });

    localStorage.setItem("firstLogin", true);
    dispatch(stopLoading());
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch(stopLoading());
    const msg = err.response?.data?.msg;
    if (err.response?.data?.requires2FA) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Enter your 2FA code from authenticator app." },
      });
    } else {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: msg || err.message },
      });
    }
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    dispatch(startLoading("Restoring session…"));
    try {
      const res = await postDataAPI("refresh_token");
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: { token: res.data.access_token, user: res.data.user },
      });

      dispatch({
        type: GLOBALTYPES.USER_TYPE,
        payload: res.data.user.role,
      });

      dispatch(stopLoading());
    } catch (err) {
      dispatch(stopLoading());
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  }
};

export const register = (data) => async (dispatch) => {
  const check = valid(data);
  if (check.errLength > 0) {
    return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });
  }

  try {
    dispatch(startLoading("Creating your account…"));

    const res = await postDataAPI("register", data);

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: { token: res.data.access_token, user: res.data.user },
    });

    dispatch({
      type: GLOBALTYPES.USER_TYPE,
      payload: res.data.user.role,
    });

    localStorage.setItem("firstLogin", true);
    dispatch(stopLoading());
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch(stopLoading());
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const registerAdmin = (data) => async (dispatch, getState) => {
  const check = valid(data);
  if (check.errLength > 0) {
    return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });
  }

  try {
    dispatch(startLoading("Creating admin account…"));

    const token = getState().auth.token;
    const res = await postDataAPI("register_admin", data, token);

    dispatch(stopLoading());
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch(stopLoading());
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response?.data?.msg || err.message },
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("firstLogin");

    await postDataAPI("logout");
    window.location.href = "/";
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};
