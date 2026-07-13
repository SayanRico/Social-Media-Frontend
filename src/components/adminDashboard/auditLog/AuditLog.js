import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuditLogs } from "../../../redux/actions/platformAction";

const AuditLog = () => {
  const { auth, platform } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuditLogs(auth.token));
  }, [dispatch, auth.token]);

  return (
    <>
      <header className="admin-page-header">
        <h1>Audit Trail</h1>
        <p>Immutable log of privileged admin and moderation actions.</p>
      </header>

      <div className="admin-panel admin-panel--wide">
        <div className="admin-table-wrap">
          {platform.auditLogs.length === 0 ? (
            <div className="admin-empty"><p>No audit events yet.</p></div>
          ) : (
            platform.auditLogs.map((log) => (
              <div className="admin-audit-row" key={log._id}>
                <div className="admin-audit-row__action">{log.action}</div>
                <div className="admin-user-row__sub">
                  {log.actorId?.username || log.actorId?.email || "system"} ·{" "}
                  {log.resourceType} · {new Date(log.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AuditLog;
