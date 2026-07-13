import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getFirebaseConfig,
  saveFirebaseConfig,
} from "../../../redux/actions/platformAction";
import InputField from "../../UI/InputField";
import Button from "../../UI/Button";
import Badge from "../../UI/Badge";

const emptyForm = {
  enabled: false,
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
  vapidKey: "",
  clientEmail: "",
  privateKey: "",
};

const FirebaseSettings = () => {
  const { auth, platform } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(getFirebaseConfig(auth.token));
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (platform.firebaseConfig) {
      setForm({
        ...emptyForm,
        ...platform.firebaseConfig,
        privateKey: "",
      });
    }
  }, [platform.firebaseConfig]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await dispatch(saveFirebaseConfig(auth.token, form));
    setSaving(false);
    setForm((prev) => ({ ...prev, privateKey: "" }));
  };

  return (
    <>
      <header className="admin-page-header">
        <h1>Firebase Settings</h1>
        <p>
          Push notification credentials are stored in the database and loaded
          dynamically at runtime.
        </p>
      </header>

      <div className="admin-panel">
        <div className="admin-report-row" style={{ marginBottom: "1rem" }}>
          <div>
            <strong>Push status</strong>
            <p>Web + server FCM configuration</p>
          </div>
          <Badge
            label={form.enabled ? "ENABLED" : "DISABLED"}
            variant={form.enabled ? "success" : "default"}
            size="sm"
          />
        </div>

        <form onSubmit={submit} className="admin-form-stack">
          <label>
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
            />{" "}
            Enable Firebase push notifications
          </label>

          <h3>Web client config (public)</h3>
          {[
            ["apiKey", "API Key"],
            ["authDomain", "Auth Domain"],
            ["projectId", "Project ID"],
            ["storageBucket", "Storage Bucket"],
            ["messagingSenderId", "Messaging Sender ID"],
            ["appId", "App ID"],
            ["measurementId", "Measurement ID"],
            ["vapidKey", "Web Push VAPID Key"],
          ].map(([name, label]) => (
            <InputField
              key={name}
              name={name}
              label={label}
              value={form[name]}
              onChange={(e) => setForm({ ...form, [name]: e.target.value })}
            />
          ))}

          <h3>Server credentials (private)</h3>
          <InputField
            name="clientEmail"
            label="Service account client email"
            value={form.clientEmail}
            onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
          />
          <label className="ui-field">
            <span className="ui-field__label">Service account private key</span>
            <textarea
              className="ui-field__input"
              rows={5}
              placeholder={
                form.hasPrivateKey
                  ? "Private key is saved. Paste a new key only to replace it."
                  : "Paste -----BEGIN PRIVATE KEY----- ..."
              }
              value={form.privateKey}
              onChange={(e) => setForm({ ...form, privateKey: e.target.value })}
            />
          </label>

          <Button type="submit" loading={saving}>
            Save Firebase configuration
          </Button>
        </form>
      </div>
    </>
  );
};

export default FirebaseSettings;
