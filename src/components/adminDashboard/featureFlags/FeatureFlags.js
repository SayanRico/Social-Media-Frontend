import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFeatureFlags, upsertFeatureFlag } from "../../../redux/actions/platformAction";
import InputField from "../../UI/InputField";
import Button from "../../UI/Button";
import Badge from "../../UI/Badge";

const FeatureFlags = () => {
  const { auth, platform } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ key: "", description: "", enabled: false });

  useEffect(() => {
    dispatch(getFeatureFlags(auth.token));
  }, [dispatch, auth.token]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(upsertFeatureFlag(auth.token, form));
    setForm({ key: "", description: "", enabled: false });
  };

  return (
    <>
      <header className="admin-page-header">
        <h1>Feature Flags</h1>
        <p>Toggle platform features without redeploying.</p>
      </header>

      <div className="admin-panel">
        <form onSubmit={submit} className="admin-form-stack">
          <InputField
            name="key"
            placeholder="flag_key"
            value={form.key}
            onChange={(e) => setForm({ ...form, key: e.target.value })}
          />
          <InputField
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <label>
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
            />{" "}
            Enabled
          </label>
          <Button type="submit">Save flag</Button>
        </form>

        <div className="admin-table-wrap">
          {platform.featureFlags.map((f) => (
            <div className="admin-report-row" key={f._id}>
              <div>
                <strong>{f.key}</strong>
                <p>{f.description}</p>
              </div>
              <Badge
                label={f.enabled ? "ON" : "OFF"}
                variant={f.enabled ? "success" : "default"}
                size="sm"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeatureFlags;
