import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTotalUsers,
  getTotalPosts,
  getTotalComments,
  getTotalLikes,
  getTotalActiveUsers,
  getTotalSpamPosts,
} from "../../../redux/actions/adminAction";
import AnalyticsDashboard from "../analytics/AnalyticsDashboard";

const STATS = [
  {
    key: "total_users",
    label: "Total Users",
    icon: "fa-users",
    tone: "users",
  },
  {
    key: "total_posts",
    label: "Total Posts",
    icon: "fa-camera",
    tone: "posts",
  },
  {
    key: "total_comments",
    label: "Total Comments",
    icon: "fa-comments",
    tone: "comments",
  },
  {
    key: "total_likes",
    label: "Total Likes",
    icon: "fa-thumbs-up",
    tone: "likes",
  },
  {
    key: "total_spam_posts",
    label: "Reported Posts",
    icon: "fa-ban",
    tone: "spam",
  },
  {
    key: "total_active_users",
    label: "Active Users",
    icon: "fa-check-circle",
    tone: "active",
  },
];

const Main = () => {
  const { auth, admin, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalUsers(auth.token));
    dispatch(getTotalPosts(auth.token));
    dispatch(getTotalComments(auth.token));
    dispatch(getTotalLikes(auth.token));
    dispatch(getTotalSpamPosts(auth.token));
    dispatch(getTotalActiveUsers({ auth, socket }));
  }, [dispatch, auth.token, socket, auth]);

  return (
    <>
      <header className="admin-page-header">
        <h1>Hello, {auth.user.username}</h1>
        <p>Welcome to your admin dashboard — live platform overview.</p>
      </header>

      <div className="admin-stats">
        {STATS.map((stat) => (
          <div className="admin-stat" key={stat.key}>
            <div className={`admin-stat__icon admin-stat__icon--${stat.tone}`}>
              <i className={`fa ${stat.icon}`} aria-hidden />
            </div>
            <div className="admin-stat__meta">
              <span className="admin-stat__label">{stat.label}</span>
              <span className="admin-stat__value">
                {admin[stat.key] ?? 0}
              </span>
            </div>
          </div>
        ))}
      </div>

      <AnalyticsDashboard />
    </>
  );
};

export default Main;
