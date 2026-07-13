import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReports, updateReport } from "../../../redux/actions/platformAction";
import Button from "../../UI/Button";
import Badge from "../../UI/Badge";

const STATUS_OPTIONS = [
  "submitted",
  "triaged",
  "under_review",
  "action_taken",
  "dismissed",
  "closed",
];

const ReportsManagement = () => {
  const { auth, platform } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({ status: "", priority: "" });

  useEffect(() => {
    dispatch(getReports(auth.token, filter));
  }, [dispatch, auth.token, filter]);

  const handleStatus = (report, status) => {
    dispatch(
      updateReport({
        token: auth.token,
        id: report._id,
        body: { status, assignee: auth.user._id },
      })
    );
  };

  return (
    <>
      <header className="admin-page-header">
        <h1>Reports Queue</h1>
        <p>Structured moderation workflow with priority and assignment.</p>
      </header>

      <div className="admin-panel admin-panel--wide">
        <div className="admin-filter-row">
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="">All statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
          >
            <option value="">All priorities</option>
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
        </div>

        <div className="admin-table-wrap">
          {platform.reports.length === 0 ? (
            <div className="admin-empty"><p>No reports in queue.</p></div>
          ) : (
            platform.reports.map((r) => (
              <div className="admin-report-row" key={r._id}>
                <div>
                  <Badge
                    label={r.priority}
                    variant={r.priority === "P0" ? "danger" : "default"}
                    size="sm"
                  />
                  <strong>{r.entityType}</strong> · {r.reason}
                  <div className="admin-user-row__sub">
                    by {r.reporter?.username} · {r.status}
                  </div>
                  {r.description && <p className="admin-report-desc">{r.description}</p>}
                </div>
                <div className="admin-user-row__actions">
                  <Button size="sm" onClick={() => handleStatus(r, "under_review")}>
                    Review
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => handleStatus(r, "dismissed")}>
                    Dismiss
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleStatus(r, "action_taken")}>
                    Action taken
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

export default ReportsManagement;
