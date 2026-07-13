import React from "react";
import Avatar from "../Avatar";
import { deleteSpamPost } from "../../redux/actions/adminAction";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Button from "../UI/Button";

const ContentList = ({ content }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeletePost = (post) => {
    dispatch(deleteSpamPost({ post, auth, socket }));
  };

  if (!content || content.length === 0) {
    return (
      <div className="admin-empty">
        <div>
          <i className="fa fa-shield" />
        </div>
        <h3>Nothing to review</h3>
        <p>No posts currently meet the spam report threshold.</p>
      </div>
    );
  }

  return (
    <div className="admin-spam-list">
      {content.map((post) => (
        <div className="admin-spam-item" key={post._id}>
          <div className="admin-spam-item__reports">
            {post.reports?.length || 0}
            <small>reports</small>
          </div>

          <Avatar size="big-avatar" src={post.user?.avatar} />

          <div className="admin-spam-item__info">
            <div className="admin-spam-item__name">
              {post.user?.username || "Unknown"}
            </div>
            <div className="admin-spam-item__email">
              {post.user?.email || "—"}
            </div>
            <div className="admin-spam-item__time">
              {moment(post.createdAt).fromNow()}
            </div>
            {post.content && (
              <p className="admin-spam-item__content">{post.content}</p>
            )}
          </div>

          <Button
            size="sm"
            variant="danger"
            design="solid"
            onClick={() => handleDeletePost(post)}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ContentList;
