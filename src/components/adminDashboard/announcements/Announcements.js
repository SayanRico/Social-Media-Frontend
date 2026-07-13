import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
} from "../../../redux/actions/platformAction";
import InputField from "../../UI/InputField";
import Button from "../../UI/Button";

const Announcements = () => {
  const { auth, platform } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ title: "", body: "", type: "info" });

  useEffect(() => {
    dispatch(getAnnouncements(auth.token));
  }, [dispatch, auth.token]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(createAnnouncement(auth.token, form));
    setForm({ title: "", body: "", type: "info" });
  };

  return (
    <>
      <header className="admin-page-header">
        <h1>Announcements</h1>
        <p>Platform-wide banners and notices.</p>
      </header>

      <div className="admin-panel">
        <form onSubmit={submit} className="admin-form-stack">
          <InputField
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            className="admin-textarea"
            placeholder="Message body"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
          <Button type="submit">Publish</Button>
        </form>

        <div className="admin-table-wrap">
          {platform.announcements.map((a) => (
            <div className="admin-report-row" key={a._id}>
              <div>
                <strong>{a.title}</strong>
                <p>{a.body}</p>
              </div>
              <Button
                size="sm"
                variant="danger"
                onClick={() => dispatch(deleteAnnouncement(auth.token, a._id))}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Announcements;
