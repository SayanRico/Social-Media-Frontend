import React from "react";
import Badge from "../UI/Badge";

const ChatContactItem = ({ contact, isActive, onClick, preview }) => {
  if (!contact) return null;

  return (
    <button
      type="button"
      className={`chat-contact ${isActive ? "chat-contact--active" : ""}`}
      onClick={onClick}
    >
      <div className="chat-contact__avatar-wrap">
        <img
          src={contact.avatar}
          alt={contact.username}
          className="chat-contact__avatar"
        />
        {contact.online && <span className="chat-contact__dot" />}
      </div>

      <div className="chat-contact__body">
        <div className="chat-contact__row">
          <span className="chat-contact__name">{contact.username}</span>
          {contact.unread_count > 0 && (
            <Badge count={contact.unread_count} variant="primary" size="sm" />
          )}
        </div>
        {(preview || contact.last_message || contact.fullname) && (
          <p className="chat-contact__preview">
            {preview || contact.last_message || contact.fullname}
          </p>
        )}
      </div>
    </button>
  );
};

export default ChatContactItem;
