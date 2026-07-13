import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { patchDataAPI } from "../utils/fetchData";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import Button from "./UI/Button";

const NotificationPreferences = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const prefs = auth.user?.notificationPreferences || {};
  const [local, setLocal] = useState({ ...prefs });
  const [saving, setSaving] = useState(false);

  const keys = [
    ["push", "Browser push notifications (Firebase)"],
    ["likes", "Likes"],
    ["comments", "Comments"],
    ["follows", "Follows"],
    ["messages", "Messages"],
    ["mentions", "Mentions"],
    ["announcements", "Announcements"],
    ["emailDigest", "Weekly email digest"],
  ];

  const save = async () => {
    try {
      setSaving(true);
      await patchDataAPI("notification-preferences", local, auth.token);
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: { ...auth.user, notificationPreferences: local },
        },
      });
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: "Notification preferences saved." },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response?.data?.msg },
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-panel notification-prefs">
      <h2>Notification preferences</h2>
      <p className="text-muted" style={{ marginBottom: "1rem" }}>
        Control which in-app alerts you receive. Changes apply immediately.
      </p>
      {keys.map(([key, label]) => (
        <label key={key} className="admin-pref-row">
          <input
            type="checkbox"
            checked={Boolean(local[key])}
            onChange={(e) => setLocal({ ...local, [key]: e.target.checked })}
          />
          {label}
        </label>
      ))}
      <Button onClick={save} loading={saving}>
        Save preferences
      </Button>
    </div>
  );
};

export default NotificationPreferences;
