import React from "react";
import { imageShow, videoShow } from "../../utils/mediaShow";

const formatTime = (ts) => {
  if (!ts) return "";
  const date = new Date(ts);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const ChatMessage = ({
  text,
  media,
  isSent,
  timestamp,
  senderUsername,
  avatar,
  theme,
  isPending = false,
}) => {
  return (
    <div className={`chat-msg ${isSent ? "chat-msg--sent" : "chat-msg--recv"}`}>
      {!isSent && avatar && (
        <img
          src={avatar}
          alt={senderUsername || ""}
          className="chat-msg__avatar"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      )}

      <div className="chat-msg__col">
        <div className="chat-msg__meta">
          {!isSent && senderUsername && (
            <span className="chat-msg__name">{senderUsername}</span>
          )}
          <span className="chat-msg__time">{formatTime(timestamp)}</span>
        </div>

        {text && <div className="chat-msg__bubble">{text}</div>}

        {media &&
          media.map((item, index) => (
            <div key={index} className="chat-msg__media">
              {item.url && item.url.match(/video/i)
                ? videoShow(item.url, theme)
                : imageShow(item.url, theme)}
            </div>
          ))}

        {isSent && (
          <div className="chat-msg__status">
            {isPending ? "Sending…" : "Delivered"}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ChatMessage);
