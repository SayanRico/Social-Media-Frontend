import React from "react";
import LeftSide from "../../components/message/LeftSide";

const Message = () => {
  return (
    <div className="message d-flex">
      <div
        className="col-md-4 px-0"
        style={{ borderRight: "1px solid var(--border)" }}
      >
        <LeftSide />
      </div>

      <div className="col-md-8 px-0">
        <div className="message-empty">
          <div className="message-empty__icon">
            <i className="far fa-comments" />
          </div>
          <h4>Your messages</h4>
          <p>Select a conversation or search for someone to start chatting.</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
