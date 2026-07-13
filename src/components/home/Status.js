import React from "react";
import Avatar from "../Avatar";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Status = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="status my-3 d-flex align-items-center">
      <div className="outer-shadow big-avatar-cover">
        <Avatar src={auth.user.avatar} size="big-avatar" />
      </div>
      <button
        type="button"
        onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
        className="btn-1 statusBtn flex-fill"
        style={{ marginLeft: "12px" }}
      >
        <span>{auth.user.username}, what&apos;s on your mind?</span>
      </button>
    </div>
  );
};

export default Status;
