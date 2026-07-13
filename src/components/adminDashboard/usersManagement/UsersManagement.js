import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAPI, patchDataAPI } from "../../../utils/fetchData";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import InputField from "../../UI/InputField";
import Button from "../../UI/Button";
import Badge from "../../UI/Badge";
import Avatar from "../../Avatar";

const UsersManagement = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setUsers([]);
      return;
    }
    try {
      setLoading(true);
      const res = await getDataAPI(
        `search?username=${encodeURIComponent(search.trim())}`,
        auth.token
      );
      setUsers(res.data.users || []);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response?.data?.msg || err.message },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBanToggle = async (user) => {
    const isBanned = user.status === "banned";
    const path = isBanned
      ? `unban_user/${user._id}`
      : `ban_user/${user._id}`;
    try {
      const res = await patchDataAPI(path, null, auth.token);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.msg },
      });
      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id
            ? { ...u, status: isBanned ? "active" : "banned" }
            : u
        )
      );
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response?.data?.msg || err.message },
      });
    }
  };

  return (
    <>
      <header className="admin-page-header">
        <h1>Users Management</h1>
        <p>Search accounts and ban or restore access.</p>
      </header>

      <div className="admin-panel admin-panel--wide">
        <h2 className="admin-panel__title">Find users</h2>
        <p className="admin-panel__sub">
          Search by username, then ban or unban as needed.
        </p>

        <form className="admin-user-search" onSubmit={handleSearch}>
          <InputField
            name="search"
            placeholder="Search username…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button type="submit" loading={loading}>
            Search
          </Button>
        </form>

        <div className="admin-user-list">
          {users.length === 0 ? (
            <div className="admin-empty">
              <p>Search to load users.</p>
            </div>
          ) : (
            users.map((user) => (
              <div className="admin-user-row" key={user._id}>
                <Avatar src={user.avatar} size="big-avatar" />
                <div className="admin-user-row__meta">
                  <div className="admin-user-row__name">{user.username}</div>
                  <div className="admin-user-row__sub">
                    {user.fullname || "—"}
                  </div>
                </div>
                {user.status === "banned" && (
                  <Badge label="Banned" variant="danger" size="sm" />
                )}
                <div className="admin-user-row__actions">
                  <Button
                    size="sm"
                    variant={user.status === "banned" ? "primary" : "danger"}
                    design="solid"
                    onClick={() => handleBanToggle(user)}
                  >
                    {user.status === "banned" ? "Unban" : "Ban"}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default UsersManagement;
