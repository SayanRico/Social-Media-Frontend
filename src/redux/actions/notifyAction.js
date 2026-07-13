import { GLOBALTYPES } from './globalTypes';
import { deleteDataAPI, getDataAPI, patchDataAPI } from '../../utils/fetchData';

export const NOTIFY_TYPES = {
  GET_NOTIFIES: "GET_NOTIFIES",
  CREATE_NOTIFY: "CREATE_NOTIFY",
  REMOVE_NOTIFY: "REMOVE_NOTIFY",
  UPDATE_NOTIFY: "UPDATE_NOTIFY",
  UPDATE_SOUND: "UPDATE_SOUND",
  DELETE_ALL_NOTIFICATIONS: "DELETE_ALL_NOTIFICATIONS",
};

/** @deprecated Server dispatches notifications — kept for legacy callers */
export const createNotify = () => async () => {};

export const removeNotify = () => async () => {};

export const getNotifies = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI('notifies', token);
    
    dispatch({type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies});
    
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const isReadNotify = ({msg, auth}) => async (dispatch) => {

  dispatch({type: NOTIFY_TYPES.UPDATE_NOTIFY, payload: {...msg, isRead: true} });

  try {
    await patchDataAPI(`isReadNotify/${msg._id}`,null, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const deleteAllNotifies = (token) => async (dispatch) => {
  dispatch({ type: NOTIFY_TYPES.DELETE_ALL_NOTIFICATIONS, payload: [] });

  try {
    await deleteDataAPI(`deleteAllNotify`, token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};
