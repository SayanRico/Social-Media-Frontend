import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSystemHealth } from "../../../redux/actions/platformAction";
import Badge from "../../UI/Badge";

const SystemHealth = () => {
  const { auth, platform } = useSelector((state) => state);
  const dispatch = useDispatch();
  const h = platform.systemHealth;

  useEffect(() => {
    dispatch(getSystemHealth(auth.token));
    const t = setInterval(() => dispatch(getSystemHealth(auth.token)), 30000);
    return () => clearInterval(t);
  }, [dispatch, auth.token]);

  if (!h) {
    return <div className="admin-empty"><p>Loading health…</p></div>;
  }

  const tiles = [
    { label: "API", value: h.api },
    { label: "MongoDB", value: h.mongo },
    { label: "Redis", value: h.redis },
    { label: "Socket", value: h.socket },
  ];

  return (
    <>
      <header className="admin-page-header">
        <h1>System Health</h1>
        <p>Infrastructure status and runtime metrics.</p>
      </header>

      <div className="admin-stats-grid">
        {tiles.map((t) => (
          <div className="admin-stat-card" key={t.label}>
            <span>{t.label}</span>
            <Badge
              label={t.value}
              variant={t.value === "up" ? "success" : "warning"}
              size="sm"
            />
          </div>
        ))}
      </div>

      <div className="admin-panel">
        <p>Uptime: {h.uptime}s · Memory: {h.memoryMb} MB</p>
        <p className="admin-user-row__sub">Last check: {h.timestamp}</p>
      </div>
    </>
  );
};

export default SystemHealth;
