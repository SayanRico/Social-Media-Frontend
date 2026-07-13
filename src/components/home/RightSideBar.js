import React from "react";
import { useSelector, useDispatch } from "react-redux";
import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";
import LoaderInline from "../alert/LoaderInline";
import { getSuggestions } from "../../redux/actions/suggestionsAction";
import IconButton from "../UI/IconButton";

const RightSideBar = () => {
  const { auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <aside className="sidebar-panel my-4">
      <div className="sidebar-panel__card">
        <UserCard user={auth.user} />
      </div>

      <div className="sidebar-panel__head">
        <h5>Suggestions</h5>
        {!suggestions.loading && (
          <IconButton
            title="Refresh suggestions"
            icon={<i className="fas fa-redo" />}
            onClick={() => dispatch(getSuggestions(auth.token))}
          />
        )}
      </div>

      {suggestions.loading ? (
        <LoaderInline label="Finding suggestions…" compact />
      ) : (
        <div className="suggestions">
          {suggestions.users.map((user) => (
            <div key={user._id} className="sidebar-panel__card mb-2">
              <UserCard user={user}>
                <FollowBtn user={user} />
              </UserCard>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default RightSideBar;
