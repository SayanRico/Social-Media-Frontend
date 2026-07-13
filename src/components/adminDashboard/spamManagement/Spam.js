import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentList from "../ContentList";
import { getSpamPosts } from "../../../redux/actions/adminAction";

const Spam = () => {
  const { auth, admin } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpamPosts(auth.token));
  }, [dispatch, auth.token]);

  return (
    <>
      <header className="admin-page-header">
        <h1>Spam Management</h1>
        <p>
          Posts reported by 2+ users. Review and remove abusive content.
        </p>
      </header>

      <div className="admin-panel admin-panel--wide">
        <h2 className="admin-panel__title">Reported posts</h2>
        <p className="admin-panel__sub">
          Showing {admin.spam_posts?.length || 0} flagged item
          {(admin.spam_posts?.length || 0) === 1 ? "" : "s"}
        </p>
        <ContentList content={admin.spam_posts || []} />
      </div>
    </>
  );
};

export default Spam;
