import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAnalyticsOverview } from "../../../redux/actions/platformAction";

const AnalyticsDashboard = () => {
  const { auth, platform } = useSelector((state) => state);
  const dispatch = useDispatch();
  const a = platform.analytics;

  useEffect(() => {
    dispatch(getAnalyticsOverview(auth.token));
  }, [dispatch, auth.token]);

  if (!a) return null;

  const metrics = [
    { label: "DAU", value: a.dau },
    { label: "WAU", value: a.wau },
    { label: "MAU", value: a.mau },
    { label: "Stickiness", value: `${a.stickiness}%` },
    { label: "Registrations today", value: a.registrations_today },
    { label: "Posts today", value: a.posts_today },
    { label: "Comments today", value: a.comments_today },
    { label: "Open reports", value: a.reports_open },
    { label: "Banned users", value: a.banned_users },
    { label: "Engagement rate", value: a.engagement_rate },
  ];

  return (
    <div className="admin-analytics-strip">
      {metrics.map((m) => (
        <div className="admin-analytics-tile" key={m.label}>
          <span>{m.label}</span>
          <strong>{m.value}</strong>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsDashboard;
