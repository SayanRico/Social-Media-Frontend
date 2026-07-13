import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  adminSearchUsers,
  getUser360,
  suspendUser,
  toggleShadowBan,
  addModeratorNote,
} from "../../../redux/actions/platformAction";
import { patchDataAPI } from "../../../utils/fetchData";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import InputField from "../../UI/InputField";
import Button from "../../UI/Button";
import Badge from "../../UI/Badge";
import Avatar from "../../Avatar";

const User360 = () => {
  const { auth, platform } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [q, setQ] = useState("");
  const [note, setNote] = useState("");
  const u360 = platform.user360;

  const search = (e) => {
    e.preventDefault();
    dispatch(adminSearchUsers(auth.token, { q }));
  };

  const load360 = (id) => dispatch(getUser360(auth.token, id));

  const banToggle = async (user) => {
    const path = user.status === "banned" ? `unban_user/${user._id}` : `ban_user/${user._id}`;
    try {
      await patchDataAPI(path, null, auth.token);
      load360(user._id);
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response?.data?.msg } });
    }
  };

  return (
    <>
      <header className="admin-page-header">
        <h1>User 360°</h1>
        <p>Full account view: stats, strikes, sessions, moderator notes.</p>
      </header>

      <div className="admin-panel admin-panel--wide">
        <form className="admin-user-search" onSubmit={search}>
          <InputField
            name="q"
            placeholder="Search username, email, name…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Button type="submit">Search</Button>
        </form>

        <div className="admin-user-list">
          {platform.adminUsers.map((user) => (
            <div className="admin-user-row" key={user._id}>
              <Avatar src={user.avatar} size="big-avatar" />
              <div className="admin-user-row__meta">
                <div className="admin-user-row__name">{user.username}</div>
                <div className="admin-user-row__sub">{user.email}</div>
              </div>
              {user.status === "banned" && <Badge label="Banned" variant="danger" size="sm" />}
              {user.shadowBanned && <Badge label="Shadow" variant="warning" size="sm" />}
              <Button size="sm" onClick={() => load360(user._id)}>
                Open 360
              </Button>
            </div>
          ))}
        </div>

        {u360?.user && (
          <div className="admin-360-panel">
            <h3>{u360.user.username}</h3>
            <p>Posts: {u360.stats.posts} · Strikes: {u360.stats.strikeCount} · Reports against: {u360.stats.reportsReceived}</p>
            <div className="admin-user-row__actions">
              <Button size="sm" variant="danger" onClick={() => banToggle(u360.user)}>
                {u360.user.status === "banned" ? "Unban" : "Ban"}
              </Button>
              <Button size="sm" onClick={() => dispatch(suspendUser(auth.token, u360.user._id, 24))}>
                Suspend 24h
              </Button>
              <Button size="sm" variant="secondary" onClick={() => dispatch(toggleShadowBan(auth.token, u360.user._id))}>
                Toggle shadow ban
              </Button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(addModeratorNote(auth.token, u360.user._id, note));
                setNote("");
              }}
              className="admin-note-form"
            >
              <InputField
                name="note"
                placeholder="Moderator note…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button type="submit" size="sm">Add note</Button>
            </form>
            {u360.user.moderatorNotes?.length > 0 && (
              <ul className="admin-notes-list">
                {u360.user.moderatorNotes.map((n, i) => (
                  <li key={i}>{n.text}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default User360;
